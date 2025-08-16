import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, User, FileText, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdoptionForm from './AdoptionForm';

const AdoptionRequestModal = ({ child, trigger, onSuccess }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSimpleRequest = async () => {
    try {
      setLoading(true);
      setError('');
      
            // Import adoptionAPI dynamically to avoid circular dependencies
      const { adoptionAPI } = await import('../lib/api');
      
      const response = await adoptionAPI.create(
        user.id,
        child.id,
        'Adoption request submitted'
      );

      setSuccess(true);
      setRequestType(null);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }

      // Close modal after delay
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message || 'Failed to submit adoption request');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      
            // Import adoptionAPI dynamically to avoid circular dependencies
      const { adoptionAPI } = await import('../lib/api');
      
      const response = await adoptionAPI.createWithForm(
        user.id,
        child.id,
        'Adoption request submitted with comprehensive application form',
        formData
      );

      setSuccess(true);
      setRequestType(null);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }

      // Close modal after delay
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message || 'Failed to submit adoption request');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setRequestType(null);
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetState();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <Heart className="h-4 w-4 mr-2" />
            Adopt This Child
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>Adopt {child.name}</span>
          </DialogTitle>
          <DialogDescription>
            Choose how you would like to proceed with your adoption request for {child.name}
          </DialogDescription>
        </DialogHeader>

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

        {!requestType && !success && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Simple Request Option */}
              <div className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                   onClick={() => setRequestType('simple')}>
                <div className="text-center space-y-3">
                  <User className="h-8 w-8 text-gray-600 mx-auto" />
                  <h3 className="font-medium">Quick Request</h3>
                  <p className="text-sm text-gray-600">
                    Submit a basic adoption request. You can complete the detailed form later.
                  </p>
                  <Button variant="outline" className="w-full">
                    Choose Quick Request
                  </Button>
                </div>
              </div>

              {/* Comprehensive Form Option */}
              <div className="p-4 border rounded-lg bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer"
                   onClick={() => setRequestType('form')}>
                <div className="text-center space-y-3">
                  <FileText className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Complete Application</h3>
                  <p className="text-sm text-gray-600">
                    Fill out the comprehensive adoption form with all required documents.
                  </p>
                  <Button className="w-full">
                    Choose Complete Application
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>1. Your adoption request will be submitted to the orphanage</p>
                    <p>2. The orphanage will review your application and documents</p>
                    <p>3. You'll be notified of their decision via email</p>
                    <p>4. If approved, the orphanage will contact you for next steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {requestType === 'simple' && !success && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Quick Adoption Request</h3>
              <p className="text-sm text-gray-600 mb-4">
                You're about to submit a basic adoption request for {child.name}. 
                You can always complete the detailed application form later.
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleSimpleRequest}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setRequestType(null)}
                  disabled={loading}
                >
                  Back to Options
                </Button>
              </div>
            </div>
          </div>
        )}

        {requestType === 'form' && !success && (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Complete Adoption Application</h3>
              <p className="text-sm text-gray-600">
                Please fill out this comprehensive form to apply for adopting {child.name}. 
                All required documents must be uploaded.
              </p>
            </div>
            
            <AdoptionForm 
              onSubmit={handleFormSubmit}
              loading={loading}
            />
            
            <div className="flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setRequestType(null)}
                disabled={loading}
              >
                Back to Options
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionRequestModal;
