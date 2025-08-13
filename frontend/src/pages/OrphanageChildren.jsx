import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { childrenAPI, adoptionAPI } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Heart, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

const OrphanageChildren = () => {
  const { orphanageId } = useParams();
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isAdoptionDialogOpen, setIsAdoptionDialogOpen] = useState(false);
  const [adoptionForm, setAdoptionForm] = useState({
    parentNotes: '',
    reasonForAdoption: '',
    previousChildren: false,
    housingType: '',
    employmentStatus: '',
    referencesContact: '',
    medicalHistory: '',
    criminalBackgroundCheck: false,
    homeStudyCompleted: false,
    additionalDocuments: ''
  });

  useEffect(() => {
    fetchChildren();
  }, [orphanageId]);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const data = await childrenAPI.getByOrphanage(orphanageId);
      setChildren(data);
    } catch (error) {
      toast.error('Failed to fetch children');
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdoptionForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setAdoptionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAdoptionDialog = (child) => {
    setSelectedChild(child);
    setIsAdoptionDialogOpen(true);
  };

  const resetForm = () => {
    setAdoptionForm({
      parentNotes: '',
      reasonForAdoption: '',
      previousChildren: false,
      housingType: '',
      employmentStatus: '',
      referencesContact: '',
      medicalHistory: '',
      criminalBackgroundCheck: false,
      homeStudyCompleted: false,
      additionalDocuments: ''
    });
  };

  const handleSubmitAdoption = async (e) => {
    e.preventDefault();
    try {
      await adoptionAPI.createWithForm(
        user.id,
        selectedChild.id,
        adoptionForm.parentNotes,
        adoptionForm
      );
      toast.success('Adoption request submitted successfully');
      setIsAdoptionDialogOpen(false);
      setSelectedChild(null);
      resetForm();
    } catch (error) {
      toast.error('Failed to submit adoption request');
      console.error('Error submitting adoption request:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Available Children</h1>
        <p className="text-gray-600">Children available for adoption from this orphanage</p>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No children available</h3>
            <p className="text-gray-600 text-center">
              This orphanage currently has no children available for adoption.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{child.firstName} {child.lastName}</span>
                  <User className="h-5 w-5 text-primary" />
                </CardTitle>
                <CardDescription>
                  Age: {child.age} • Gender: {child.gender}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <strong>Health Status:</strong> {child.healthStatus || 'Not specified'}
                  </div>
                  
                  {child.description && (
                    <div>
                      <strong>Description:</strong> {child.description}
                    </div>
                  )}
                  
                  {child.specialNeeds && (
                    <div>
                      <strong>Special Needs:</strong> {child.specialNeeds}
                    </div>
                  )}
                  
                  {child.admissionDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Admitted: {new Date(child.admissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      child.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {child.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
                
                {child.isAvailable && user?.role === 'PARENT' && (
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      className="w-full" 
                      onClick={() => openAdoptionDialog(child)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Request Adoption
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAdoptionDialogOpen} onOpenChange={setIsAdoptionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adoption Request Form</DialogTitle>
            <DialogDescription>
              Please fill out this form to request adoption for {selectedChild?.firstName} {selectedChild?.lastName}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAdoption} className="space-y-6">
            <div>
              <Label htmlFor="parentNotes">Why do you want to adopt this child?</Label>
              <Textarea
                id="parentNotes"
                name="parentNotes"
                value={adoptionForm.parentNotes}
                onChange={handleInputChange}
                placeholder="Please explain your motivation for adoption..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="reasonForAdoption">Reason for Adoption</Label>
              <Textarea
                id="reasonForAdoption"
                name="reasonForAdoption"
                value={adoptionForm.reasonForAdoption}
                onChange={handleInputChange}
                placeholder="Detailed reason for wanting to adopt..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="housingType">Housing Type</Label>
                <Select value={adoptionForm.housingType} onValueChange={(value) => handleSelectChange('housingType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select housing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <Select value={adoptionForm.employmentStatus} onValueChange={(value) => handleSelectChange('employmentStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="referencesContact">References Contact Information</Label>
              <Textarea
                id="referencesContact"
                name="referencesContact"
                value={adoptionForm.referencesContact}
                onChange={handleInputChange}
                placeholder="Please provide contact information for at least 2 references..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                value={adoptionForm.medicalHistory}
                onChange={handleInputChange}
                placeholder="Any relevant medical history or health conditions..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="additionalDocuments">Additional Documents</Label>
              <Textarea
                id="additionalDocuments"
                name="additionalDocuments"
                value={adoptionForm.additionalDocuments}
                onChange={handleInputChange}
                placeholder="List any additional documents you can provide..."
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="previousChildren"
                  checked={adoptionForm.previousChildren}
                  onCheckedChange={(checked) => handleSelectChange('previousChildren', checked)}
                />
                <Label htmlFor="previousChildren">I have previous experience with children</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="criminalBackgroundCheck"
                  checked={adoptionForm.criminalBackgroundCheck}
                  onCheckedChange={(checked) => handleSelectChange('criminalBackgroundCheck', checked)}
                />
                <Label htmlFor="criminalBackgroundCheck">I consent to a criminal background check</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="homeStudyCompleted"
                  checked={adoptionForm.homeStudyCompleted}
                  onCheckedChange={(checked) => handleSelectChange('homeStudyCompleted', checked)}
                />
                <Label htmlFor="homeStudyCompleted">I have completed or am willing to complete a home study</Label>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsAdoptionDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Adoption Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrphanageChildren;

