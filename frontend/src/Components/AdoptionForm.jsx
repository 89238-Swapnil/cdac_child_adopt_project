import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Upload, FileText, User, Home, Briefcase, DollarSign, Heart, Calendar, Shield, CheckCircle } from 'lucide-react';

const AdoptionForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    reasonForAdoption: initialData.reasonForAdoption || '',
    previousChildren: initialData.previousChildren || false,
    maritalStatus: initialData.maritalStatus || '',
    housingType: initialData.housingType || '',
    householdIncome: initialData.householdIncome || '',
    employmentStatus: initialData.employmentStatus || '',
    referencesContact: initialData.referencesContact || '',
    medicalHistory: initialData.medicalHistory || '',
    criminalBackgroundCheck: initialData.criminalBackgroundCheck || false,
    homeStudyCompleted: initialData.homeStudyCompleted || false,
    additionalDocuments: initialData.additionalDocuments || '',
    // Document uploads
    aadharCard: null,
    incomeProof: null,
    addressProof: null,
    medicalCertificate: null,
    characterReference: null,
    marriageCertificate: null,
    birthCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [fieldName]: 'Only JPEG, PNG, JPG, and PDF files are allowed' }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required text fields
    if (!formData.reasonForAdoption.trim()) {
      newErrors.reasonForAdoption = 'Reason for adoption is required';
    }

    if (!formData.housingType) {
      newErrors.housingType = 'Housing type is required';
    }

    if (!formData.householdIncome) {
      newErrors.householdIncome = 'Household income is required';
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Employment status is required';
    }

    if (!formData.referencesContact.trim()) {
      newErrors.referencesContact = 'References contact is required';
    }

    // Required documents
    if (!formData.aadharCard) {
      newErrors.aadharCard = 'Aadhar card is required';
    }

    if (!formData.incomeProof) {
      newErrors.incomeProof = 'Income proof is required';
    }

    if (!formData.addressProof) {
      newErrors.addressProof = 'Address proof is required';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Current form data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, creating FormData...');

    // Create FormData for file uploads
    const submitData = new FormData();
    
    // Add form fields (excluding file fields)
    const textFields = [
      'reasonForAdoption', 'previousChildren', 'maritalStatus', 'housingType', 'householdIncome',
      'employmentStatus', 'referencesContact', 'medicalHistory', 
      'criminalBackgroundCheck', 'homeStudyCompleted', 'additionalDocuments'
    ];
    
    textFields.forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        const value = formData[key].toString();
        submitData.append(key, value);
        console.log(`Added field ${key}:`, value);
      }
    });

    // Add files
    const fileFields = ['aadharCard', 'incomeProof', 'addressProof', 'medicalCertificate', 
                       'characterReference', 'marriageCertificate', 'birthCertificate'];
    
    fileFields.forEach(fieldName => {
      if (formData[fieldName]) {
        submitData.append(fieldName, formData[fieldName]);
        console.log(`Added file ${fieldName}:`, formData[fieldName].name);
      }
    });

    try {
      console.log('Submitting form data to onSubmit function...');
      console.log('FormData contents:');
      for (let [key, value] of submitData.entries()) {
        console.log(`  ${key}:`, value);
      }
      
      await onSubmit(submitData);
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      // Show error to user
      setErrors(prev => ({ ...prev, submit: error.message || 'Failed to submit form' }));
    }
  };

  const FileUploadField = ({ name, label, description, required = false }) => (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id={name}
          name={name}
          type="file"
          onChange={(e) => handleFileUpload(e, name)}
          accept=".jpg,.jpeg,.png,.pdf"
          className="flex-1"
        />
        <Upload className="h-4 w-4 text-gray-400" />
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name]}</p>
      )}
      {formData[name] && (
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>{formData[name].name}</span>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span>Adoption Application Form</span>
        </CardTitle>
        <CardDescription>
          Please fill out this comprehensive form to complete your adoption application. 
          All required documents must be uploaded.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="reasonForAdoption">
                Reason for Adoption <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reasonForAdoption"
                name="reasonForAdoption"
                placeholder="Please explain your reasons for wanting to adopt a child..."
                value={formData.reasonForAdoption}
                onChange={handleChange}
                className="min-h-[100px]"
                required
              />
              {errors.reasonForAdoption && (
                <p className="text-sm text-red-500">{errors.reasonForAdoption}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                 <Label htmlFor="previousChildren">Do you have previous children?</Label>
                 <Select onValueChange={(value) => handleSelectChange('previousChildren', value === 'true')}>
                   <SelectTrigger>
                     <SelectValue placeholder="Select option" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="true">Yes</SelectItem>
                     <SelectItem value="false">No</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

               <div className="space-y-2">
                 <Label htmlFor="maritalStatus">Marital Status</Label>
                 <Select onValueChange={(value) => handleSelectChange('maritalStatus', value)}>
                   <SelectTrigger>
                     <SelectValue placeholder="Select marital status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="SINGLE">Single</SelectItem>
                     <SelectItem value="MARRIED">Married</SelectItem>
                     <SelectItem value="DIVORCED">Divorced</SelectItem>
                     <SelectItem value="WIDOWED">Widowed</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
            </div>
          </div>

          {/* Housing and Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Home className="h-5 w-5 text-primary" />
              <span>Housing & Financial Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="housingType">
                  Housing Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange('housingType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select housing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OWNED">Owned</SelectItem>
                    <SelectItem value="RENTED">Rented</SelectItem>
                    <SelectItem value="LEASED">Leased</SelectItem>
                    <SelectItem value="FAMILY_HOME">Family Home</SelectItem>
                  </SelectContent>
                </Select>
                {errors.housingType && (
                  <p className="text-sm text-red-500">{errors.housingType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="householdIncome">
                  Annual Household Income <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="householdIncome"
                    name="householdIncome"
                    type="number"
                    placeholder="Enter annual income"
                    value={formData.householdIncome}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.householdIncome && (
                  <p className="text-sm text-red-500">{errors.householdIncome}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">
                Employment Status <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange('employmentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMPLOYED">Employed</SelectItem>
                  <SelectItem value="SELF_EMPLOYED">Self Employed</SelectItem>
                  <SelectItem value="BUSINESS_OWNER">Business Owner</SelectItem>
                  <SelectItem value="RETIRED">Retired</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentStatus && (
                <p className="text-sm text-red-500">{errors.employmentStatus}</p>
              )}
            </div>
          </div>

          {/* References and Background */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>References & Background</span>
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="referencesContact">
                References Contact <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="referencesContact"
                name="referencesContact"
                placeholder="Please provide contact information for 2-3 personal references..."
                value={formData.referencesContact}
                onChange={handleChange}
                className="min-h-[80px]"
                required
              />
              {errors.referencesContact && (
                <p className="text-sm text-red-500">{errors.referencesContact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Please describe any relevant medical history..."
                value={formData.medicalHistory}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="criminalBackgroundCheck"
                  name="criminalBackgroundCheck"
                  checked={formData.criminalBackgroundCheck}
                  onChange={handleChange}
                  className="rounded"
                />
                <Label htmlFor="criminalBackgroundCheck">
                  Criminal background check completed
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="homeStudyCompleted"
                  name="homeStudyCompleted"
                  checked={formData.homeStudyCompleted}
                  onChange={handleChange}
                  className="rounded"
                />
                <Label htmlFor="homeStudyCompleted">
                  Home study completed
                </Label>
              </div>
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Required Documents</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadField
                name="aadharCard"
                label="Aadhar Card"
                description="Upload your Aadhar card (front and back)"
                required
              />
              
              <FileUploadField
                name="incomeProof"
                label="Income Proof"
                description="Salary slips, bank statements, or IT returns"
                required
              />
              
              <FileUploadField
                name="addressProof"
                label="Address Proof"
                description="Utility bills, rental agreement, or property documents"
                required
              />
              
              <FileUploadField
                name="medicalCertificate"
                label="Medical Certificate"
                description="Recent medical fitness certificate"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadField
                name="characterReference"
                label="Character Reference"
                description="Character reference letter from employer or community leader"
              />
              
              <FileUploadField
                name="marriageCertificate"
                label="Marriage Certificate"
                description="If applicable, marriage certificate"
              />
              
              <FileUploadField
                name="birthCertificate"
                label="Birth Certificate"
                description="Your birth certificate"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Additional Information</span>
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="additionalDocuments">Additional Documents or Information</Label>
              <Textarea
                id="additionalDocuments"
                name="additionalDocuments"
                placeholder="Any additional documents or information you'd like to provide..."
                value={formData.additionalDocuments}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Submit Error Display */}
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting Application...' : 'Submit Adoption Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdoptionForm;
