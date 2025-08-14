import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Building2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your adoption journey here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Browse Orphanages</CardTitle>
            </div>
            <CardDescription>
              Explore orphanages and learn about their mission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/orphanages">
              <Button className="w-full">View Orphanages</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Available Children</CardTitle>
            </div>
            <CardDescription>
              Browse children available for adoption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/children">
              <Button className="w-full">View Children</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>My Requests</CardTitle>
            </div>
            <CardDescription>
              Track your adoption requests and applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/my-requests">
              <Button className="w-full">View Requests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to begin your adoption journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Complete Your Profile</h4>
                <p className="text-sm text-gray-600">
                  Make sure your profile information is complete and up-to-date
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Browse Available Children</h4>
                <p className="text-sm text-gray-600">
                  Explore profiles of children available for adoption
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Submit Adoption Request</h4>
                <p className="text-sm text-gray-600">
                  Fill out the adoption form and submit your request
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;

