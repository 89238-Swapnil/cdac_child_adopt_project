import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, User, Calendar, FileText, Eye, CheckCircle, XCircle, Clock, Download, ExternalLink } from 'lucide-react';
import { adoptionAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const AdoptionRequestsList = ({ userRole = 'parent' }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [userRole]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      let response;
      
      if (userRole === 'parent') {
        response = await adoptionAPI.getMyRequests(user.id);
      } else {
        response = await adoptionAPI.getOrphanageRequests(user.id);
      }
      
      setRequests(response || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch adoption requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus, notes = '') => {
    try {
      setUpdatingStatus(true);
      await adoptionAPI.updateStatus(user.id, requestId, newStatus, notes);
      await fetchRequests(); // Refresh the list
      setSelectedRequest(null);
    } catch (err) {
      setError(err.message || 'Failed to update request status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await adoptionAPI.cancel(user.id, requestId);
      await fetchRequests(); // Refresh the list
    } catch (err) {
      setError(err.message || 'Failed to cancel request');
    }
  };

  const fetchAdoptionForm = async (requestId) => {
    try {
      const form = await adoptionAPI.getForm(requestId);
      setSelectedForm(form);
    } catch (err) {
      console.error('Failed to fetch adoption form:', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { variant: 'secondary', icon: Clock, text: 'Pending Review' },
      APPROVED: { variant: 'default', icon: CheckCircle, text: 'Approved' },
      REJECTED: { variant: 'destructive', icon: XCircle, text: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.text}</span>
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RequestCard = ({ request }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Adoption Request #{request.id}</span>
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(request.requestDate)}</span>
              </div>
              {getStatusBadge(request.status)}
            </div>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adoption Request Details</DialogTitle>
                  <DialogDescription>
                    Complete information about this adoption request
                  </DialogDescription>
                </DialogHeader>
                <RequestDetails request={request} onStatusUpdate={handleStatusUpdate} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Child Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {request.child?.name || 'N/A'}</p>
              <p><strong>Age:</strong> {request.child?.age || 'N/A'} years</p>
              <p><strong>Gender:</strong> {request.child?.gender || 'N/A'}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Parent Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {request.parent?.firstName} {request.parent?.lastName}</p>
              <p><strong>Email:</strong> {request.parent?.email}</p>
              <p><strong>Phone:</strong> {request.parent?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        {request.parentNotes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Parent Notes</h4>
            <p className="text-sm text-gray-600">{request.parentNotes}</p>
          </div>
        )}

        {request.orphanageNotes && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Orphanage Notes</h4>
            <p className="text-sm text-gray-600">{request.orphanageNotes}</p>
          </div>
        )}

        {userRole === 'parent' && request.status === 'PENDING' && (
          <div className="mt-4 flex justify-end">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleCancelRequest(request.id)}
            >
              Cancel Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const RequestDetails = ({ request, onStatusUpdate }) => {
    const [notes, setNotes] = useState(request.orphanageNotes || '');
    const [showForm, setShowForm] = useState(false);

    return (
      <div className="space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="form">Adoption Form</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Child Details</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {request.child?.name}</p>
                  <p><strong>Age:</strong> {request.child?.age} years</p>
                  <p><strong>Gender:</strong> {request.child?.gender}</p>
                  <p><strong>Date of Birth:</strong> {request.child?.dateOfBirth ? formatDate(request.child.dateOfBirth) : 'N/A'}</p>
                  <p><strong>Special Needs:</strong> {request.child?.specialNeeds || 'None'}</p>
                  <p><strong>Medical History:</strong> {request.child?.medicalHistory || 'None'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parent Details</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {request.parent?.firstName} {request.parent?.lastName}</p>
                  <p><strong>Email:</strong> {request.parent?.email}</p>
                  <p><strong>Phone:</strong> {request.parent?.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {request.parent?.address || 'N/A'}</p>
                  <p><strong>Occupation:</strong> {request.parent?.occupation || 'N/A'}</p>
                  <p><strong>Annual Income:</strong> {request.parent?.annualIncome ? `₹${request.parent.annualIncome.toLocaleString()}` : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Request Information</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Request Date:</strong> {formatDate(request.requestDate)}</p>
                <p><strong>Status:</strong> {getStatusBadge(request.status)}</p>
                {request.responseDate && (
                  <p><strong>Response Date:</strong> {formatDate(request.responseDate)}</p>
                )}
                {request.parentNotes && (
                  <div>
                    <strong>Parent Notes:</strong>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{request.parentNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {userRole === 'orphanage' && request.status === 'PENDING' && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Update Request Status</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows="3"
                      placeholder="Add any notes about your decision..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => onStatusUpdate(request.id, 'APPROVED', notes)}
                      disabled={updatingStatus}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => onStatusUpdate(request.id, 'REJECTED', notes)}
                      disabled={updatingStatus}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <h3 className="text-lg font-semibold">Uploaded Documents</h3>
            {request.documents ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(JSON.parse(request.documents)).map(([docType, docUrl]) => (
                  <div key={docType} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium capitalize">{docType.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        <p className="text-sm text-gray-500">Document uploaded</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={docUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}
          </TabsContent>

          <TabsContent value="form" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Adoption Application Form</h3>
              {!showForm && (
                <Button onClick={() => fetchAdoptionForm(request.id)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Load Form
                </Button>
              )}
            </div>
            
            {showForm && selectedForm ? (
              <div className="space-y-4">
                <AdoptionFormDisplay form={selectedForm} />
              </div>
            ) : (
              <p className="text-gray-500">Click "Load Form" to view the adoption application form.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const AdoptionFormDisplay = ({ form }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Reason for Adoption:</strong></p>
            <p className="p-2 bg-gray-50 rounded">{form.reasonForAdoption}</p>
            
            <p><strong>Previous Children:</strong> {form.previousChildren ? 'Yes' : 'No'}</p>
            <p><strong>Housing Type:</strong> {form.housingType}</p>
            <p><strong>Employment Status:</strong> {form.employmentStatus}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Financial & Background</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Household Income:</strong> ₹{form.householdIncome?.toLocaleString()}</p>
            <p><strong>Criminal Background Check:</strong> {form.criminalBackgroundCheck ? 'Completed' : 'Not Completed'}</p>
            <p><strong>Home Study:</strong> {form.homeStudyCompleted ? 'Completed' : 'Not Completed'}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">References & Medical</h4>
        <div className="space-y-2 text-sm">
          <p><strong>References Contact:</strong></p>
          <p className="p-2 bg-gray-50 rounded">{form.referencesContact}</p>
          
          {form.medicalHistory && (
            <>
              <p><strong>Medical History:</strong></p>
              <p className="p-2 bg-gray-50 rounded">{form.medicalHistory}</p>
            </>
          )}
        </div>
      </div>

      {form.additionalDocuments && (
        <div className="space-y-4">
          <h4 className="font-semibold">Additional Information</h4>
          <p className="p-2 bg-gray-50 rounded text-sm">{form.additionalDocuments}</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading adoption requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No adoption requests found</h3>
        <p className="text-gray-500">
          {userRole === 'parent' 
            ? "You haven't submitted any adoption requests yet."
            : "No adoption requests have been submitted to your orphanage yet."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Adoption Requests</h2>
          <p className="text-gray-600">
            {userRole === 'parent' 
              ? 'Track your adoption applications'
              : 'Review and manage adoption applications'
            }
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default AdoptionRequestsList;
