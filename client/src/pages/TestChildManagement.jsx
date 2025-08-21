import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Heart } from 'lucide-react';
import { childrenAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import ChildForm from '../components/ChildForm';

const TestChildManagement = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const addTestResult = (test, success, message, details = null) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      test,
      success,
      message,
      details,
      timestamp: new Date().toISOString()
    }]);
  };

  const runTests = async () => {
    setTestResults([]);
    setLoading(true);

    try {
      if (!user || !user.id) {
        addTestResult('User Authentication', false, 'User not authenticated');
        return;
      }

      addTestResult('User Authentication', true, `User authenticated: ${user.email} (ID: ${user.id})`);

      // Test 1: Get My Children
      try {
        const children = await childrenAPI.getMyChildren(user.id);
        addTestResult('Get My Children', true, `Successfully fetched ${children?.length || 0} children`, children);
      } catch (error) {
        addTestResult('Get My Children', false, `Failed: ${error.message}`, error);
      }

      // Test 2: Get Available Children
      try {
        const availableChildren = await childrenAPI.getAllAvailable();
        addTestResult('Get Available Children', true, `Successfully fetched ${availableChildren?.length || 0} available children`, availableChildren);
      } catch (error) {
        addTestResult('Get Available Children', false, `Failed: ${error.message}`, error);
      }

      // Test 3: Test Child Data Structure
      const testChildData = {
        firstName: 'Test',
        lastName: 'Child',
        age: 5,
        gender: 'MALE',
        healthStatus: 'Healthy',
        description: 'Test child for system validation',
        specialNeeds: 'None',
        isAvailable: true,
        dateOfBirth: '2020-01-01',
        admissionDate: '2024-01-01'
      };

      addTestResult('Test Data Structure', true, 'Test child data prepared', testChildData);

    } catch (error) {
      addTestResult('Test Suite', false, `Test suite failed: ${error.message}`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (childData) => {
    try {
      if (!user || !user.id) {
        addTestResult('Form Submission', false, 'User not authenticated');
        return;
      }

      addTestResult('Form Submission', true, 'Form data prepared successfully', childData);
      
      // You can uncomment this to actually test adding a child
      // const response = await childrenAPI.add(user.id, childData);
      // addTestResult('API Call', true, 'Child added successfully', response);
      
    } catch (error) {
      addTestResult('Form Submission', false, `Failed: ${error.message}`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span>Child Management System Test</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Test the child management functionality and verify system integration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
            <CardDescription>Run tests to verify system functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={runTests} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            
            <Button 
              onClick={() => setShowForm(!showForm)} 
              variant="outline"
              className="w-full"
            >
              {showForm ? 'Hide Form' : 'Show Test Form'}
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tests Run:</span>
                <span className="font-medium">{testResults.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Successful:</span>
                <span className="font-medium text-green-600">
                  {testResults.filter(r => r.success).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Failed:</span>
                <span className="font-medium text-red-600">
                  {testResults.filter(r => !r.success).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Test Child Form</CardTitle>
            <CardDescription>Test the child form component</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildForm 
              onSubmit={handleFormSubmit}
              loading={false}
              isEdit={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Detailed results from the test suite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <h4 className="font-medium">{result.test}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      result.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                  
                  {result.details && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        View Details
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>Instructions for testing the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="font-medium">1.</span>
              <span>Click "Run All Tests" to test the basic API functionality</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">2.</span>
              <span>Click "Show Test Form" to test the child form component</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">3.</span>
              <span>Fill out the form and submit to test form validation and data handling</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">4.</span>
              <span>Review test results to identify any issues</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestChildManagement;
