import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, User, Calendar, MapPin, Info } from 'lucide-react';
import AdoptionRequestModal from './AdoptionRequestModal';

const ChildAdoptionSection = ({ child, userRole }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAdoptionSuccess = (response) => {
    // Handle successful adoption request
    console.log('Adoption request submitted:', response);
    // You can add navigation, notifications, or other actions here
  };

  return (
    <div className="space-y-6">
      {/* Child Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>About {child.name}</span>
          </CardTitle>
          <CardDescription>
            Learn more about this child and start your adoption journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Age:</strong> {child.age} years old</p>
                <p><strong>Gender:</strong> {child.gender}</p>
                <p><strong>Date of Birth:</strong> {formatDate(child.dateOfBirth)}</p>
                <p><strong>Special Needs:</strong> {child.specialNeeds || 'None'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Background</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Medical History:</strong> {child.medicalHistory || 'None'}</p>
                <p><strong>Hobbies:</strong> {child.hobbies || 'Not specified'}</p>
                <p><strong>Personality:</strong> {child.personality || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {child.description && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">About {child.name}</h4>
              <p className="text-sm text-gray-600">{child.description}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {child.tags && child.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adoption Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-6 w-6 text-blue-600" />
            <span>Adoption Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Available for Adoption</p>
              <p className="text-blue-600">Yes</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Age Range</p>
              <p className="text-green-600">{child.age} years</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Location</p>
              <p className="text-purple-600">{child.orphanage?.city || 'Not specified'}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Adoption process typically takes 3-6 months</li>
              <li>• Home study and background checks are required</li>
              <li>• Financial stability and suitable housing are essential</li>
              <li>• Commitment to providing a loving, stable environment</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Adoption Action Section */}
      {userRole === 'parent' && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Ready to Adopt {child.name}?</CardTitle>
            <CardDescription>
              Start your adoption journey by submitting an application. You can choose between a quick request or a comprehensive application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdoptionRequestModal 
              child={child}
              onSuccess={handleAdoptionSuccess}
              trigger={
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  <Heart className="h-5 w-5 inline mr-2" />
                  Start Adoption Process
                </button>
              }
            />
          </CardContent>
        </Card>
      )}

      {/* Orphanage Contact Information */}
      {child.orphanage && (
        <Card>
          <CardHeader>
            <CardTitle>Orphanage Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <strong>Name:</strong> {child.orphanage.name}
              </div>
              <div>
                <strong>Address:</strong> {child.orphanage.address}
              </div>
              <div>
                <strong>Phone:</strong> {child.orphanage.phone || 'Not provided'}
              </div>
              <div>
                <strong>Email:</strong> {child.orphanage.email}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChildAdoptionSection;
