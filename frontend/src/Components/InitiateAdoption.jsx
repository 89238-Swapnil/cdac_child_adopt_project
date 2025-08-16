import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { adoptionAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import AdoptionForm from './AdoptionForm';

const InitiateAdoption = ({ child, onSuccess }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmitForm = async (formData) => {
    try {
      setLoading(true);
      setError('');
      
      // Create adoption request with form
      const response = await adoptionAPI.createWithForm(
        user.id,
        child.id,
        'Adoption request submitted with comprehensive application form',
        formData
      );

      setSuccess(true);
      setShowForm(false);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }

      // Reset form after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err) {
      setError(err.message || 'Failed to submit adoption request');
    } finally {
      setLoading(false);
    }
  };

  const handleSimpleRequest = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Create simple adoption request
      const response = await adoptionAPI.create(
        user.id,
        child.id,
        'Adoption request submitted'
      );

      setSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }

      // Reset success message after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err) {
      setError(err.message || 'Failed to submit adoption request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Adoption request submitted successfully! The orphanage will review your application.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>Adopt {child.name}</span>
          </CardTitle>
          <CardDescription>
            Choose how you would like to proceed with your adoption request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Simple Request Option */}
            <div className="p-4 border rounded-lg">
              <div className="text-center space-y-3">
                <User className="h-8 w-8 text-gray-600 mx-auto" />
                <h3 className="font-medium">Quick Request</h3>
                <p className="text-sm text-gray-600">
                  Submit a basic adoption request. You can complete the detailed form later.
                </p>
                <Button 
                  onClick={handleSimpleRequest}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? 'Submitting...' : 'Submit Quick Request'}
                </Button>
              </div>
            </div>

            {/* Comprehensive Form Option */}
            <div className="p-4 border rounded-lg bg-primary/5">
              <div className="text-center space-y-3">
                <FileText className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Complete Application</h3>
                <p className="text-sm text-gray-600">
                  Fill out the comprehensive adoption form with all required documents.
                </p>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      Start Complete Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Adoption Application for {child.name}</DialogTitle>
                      <DialogDescription>
                        Please complete this comprehensive form to apply for adopting {child.name}. 
                        All required documents must be uploaded.
                      </DialogDescription>
                    </DialogHeader>
                    <AdoptionForm 
                      onSubmit={handleSubmitForm}
                      loading={loading}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>1. Your adoption request will be submitted to the orphanage</p>
              <p>2. The orphanage will review your application and documents</p>
              <p>3. You'll be notified of their decision via email</p>
              <p>4. If approved, the orphanage will contact you for next steps</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InitiateAdoption;
