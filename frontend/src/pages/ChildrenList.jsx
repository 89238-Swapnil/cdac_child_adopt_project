import React, { useState, useEffect } from 'react';
import { childrenAPI } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, User, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      console.log('Checking backend health...');
      const response = await fetch('http://localhost:8080/api/children/available');
      console.log('Backend health check response:', response);
      
      if (response.ok) {
        console.log('Backend is accessible, fetching children...');
        fetchChildren();
      } else {
        console.error('Backend returned error status:', response.status);
        setError(`Backend error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setError('Cannot connect to backend server. Please check if the server is running.');
    }
  };

  const fetchChildren = async () => {
    try {
      setLoading(true);
      console.log('Fetching children from API...');
      console.log('API URL:', 'http://localhost:8080/api/children/available');
      
      const data = await childrenAPI.getAllAvailable();
      console.log('API Response:', data);
      
      setChildren(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching children:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setError('Failed to fetch children. Please try again.');
      toast.error('Failed to fetch children');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Children</h1>
        <p className="text-gray-600">Browse children available for adoption.</p>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Children</h1>
        <p className="text-gray-600">Browse children available for adoption.</p>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchChildren} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Children</h1>
        <p className="text-gray-600">Browse children available for adoption.</p>
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No children available for adoption at the moment.</p>
          <p className="text-gray-500">Please check back later or contact orphanages directly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Available Children</h1>
        <p className="text-gray-600">Browse children available for adoption.</p>
        
        {/* Debug section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Information</h3>
          <div className="space-y-2">
            <p><strong>Backend URL:</strong> http://localhost:8080/api/children/available</p>
            <p><strong>Children Count:</strong> {children.length}</p>
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error || 'None'}</p>
            <Button onClick={checkBackendHealth} variant="outline" size="sm">
              Test Backend Connection
            </Button>
            <Button onClick={fetchChildren} variant="outline" size="sm" className="ml-2">
              Fetch Children
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <Card key={child.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {child.firstName} {child.lastName}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    child.gender === 'MALE' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {child.gender === 'MALE' ? 'Boy' : 'Girl'}
                  </span>
                </div>
              </div>
              <CardDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{child.age} years old</span>
                  </div>
                  {child.orphanage && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{child.orphanage.name}</span>
                    </div>
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {child.description && (
                <p className="text-gray-700 text-sm line-clamp-3">
                  {child.description}
                </p>
              )}
              
              {child.healthStatus && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Health: {child.healthStatus}
                  </span>
                </div>
              )}
              
              {child.specialNeeds && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Special Needs:</strong> {child.specialNeeds}
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Link to={`/children/${child.id}`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </Link>
                <Link to={`/orphanage/${child.orphanage?.id}/children`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    View Orphanage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;

