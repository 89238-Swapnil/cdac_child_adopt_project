import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Calendar, Heart, FileText, Upload, CheckCircle } from 'lucide-react';

const ChildForm = ({ onSubmit, initialData = {}, loading = false, isEdit = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    healthStatus: '',
    description: '',
    specialNeeds: '',
    isAvailable: true,
    admissionDate: ''
  });

  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        age: initialData.age ? initialData.age.toString() : '',
        gender: initialData.gender || '',
        dateOfBirth: initialData.dateOfBirth || '',
        healthStatus: initialData.healthStatus || '',
        description: initialData.description || '',
        specialNeeds: initialData.specialNeeds || '',
        isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
        admissionDate: initialData.admissionDate || ''
      });
    }
  }, [initialData]);

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be less than 5MB' }));
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, photo: 'Only JPEG, PNG, and JPG files are allowed' }));
        return;
      }

      setPhotoFile(file);
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 0 || age >= 18) {
        newErrors.age = 'Age must be between 0 and 17 years';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Optional validations
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    if (formData.admissionDate) {
      const admissionDate = new Date(formData.admissionDate);
      const today = new Date();
      if (admissionDate > today) {
        newErrors.admissionDate = 'Admission date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        age: parseInt(formData.age),
        isAvailable: Boolean(formData.isAvailable)
      };

      // Add photo if uploaded
      if (photoFile) {
        submitData.photo = photoFile;
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const calculateAgeFromBirthDate = (birthDate) => {
    if (!birthDate) return '';
    
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return (age - 1).toString();
    }
    
    return age.toString();
  };

  const handleBirthDateChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      dateOfBirth: value
    }));

    // Auto-calculate age if birth date is provided
    if (value) {
      const calculatedAge = calculateAgeFromBirthDate(value);
      if (calculatedAge && !formData.age) {
        setFormData(prev => ({ ...prev, age: calculatedAge }));
      }
    }

    if (errors.dateOfBirth) {
      setErrors(prev => ({ ...prev, dateOfBirth: '' }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span>{isEdit ? 'Edit Child' : 'Add New Child'}</span>
        </CardTitle>
        <CardDescription>
          {isEdit 
            ? 'Update the child\'s information below'
            : 'Fill in the details to add a new child to your orphanage'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">
                  Age <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="17"
                  placeholder="Age in years"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isAvailable">Available for Adoption</Label>
                <Select value={formData.isAvailable.toString()} onValueChange={(value) => handleSelectChange('isAvailable', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Important Dates</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleBirthDateChange}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionDate">Admission Date</Label>
                <Input
                  id="admissionDate"
                  name="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={handleChange}
                />
                {errors.admissionDate && (
                  <p className="text-sm text-red-500">{errors.admissionDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Health and Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Health & Background</span>
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="healthStatus">Health Status</Label>
              <Input
                id="healthStatus"
                name="healthStatus"
                placeholder="e.g., Healthy, Needs medication, etc."
                value={formData.healthStatus}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description about the child, personality, interests, etc."
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialNeeds">Special Needs</Label>
              <Textarea
                id="specialNeeds"
                name="specialNeeds"
                placeholder="Any special needs, medical conditions, or requirements"
                value={formData.specialNeeds}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Photo</span>
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="photo">Child's Photo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                Upload a photo of the child (JPEG, PNG, JPG, max 5MB)
              </p>
              {errors.photo && (
                <p className="text-sm text-red-500">{errors.photo}</p>
              )}
              {photoFile && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{photoFile.name}</span>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading 
              ? (isEdit ? 'Updating...' : 'Adding...') 
              : (isEdit ? 'Update Child' : 'Add Child')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChildForm;
