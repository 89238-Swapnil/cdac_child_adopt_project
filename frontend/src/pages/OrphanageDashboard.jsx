import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrphanageDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Orphanage Dashboard</h1>
        <p className="text-gray-600">Manage your orphanage and adoption requests here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Manage Children</CardTitle>
            </div>
            <CardDescription>
              Add, update, and manage children in your care
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/manage-children">
              <Button className="w-full">Manage Children</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Adoption Requests</CardTitle>
            </div>
            <CardDescription>
              Review and process adoption requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/adoption-requests">
              <Button className="w-full">View Requests</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>
              Update your orphanage information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/profile">
              <Button className="w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks for managing your orphanage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Add New Children</h4>
                <p className="text-sm text-gray-600">
                  Register new children who need homes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Review Applications</h4>
                <p className="text-sm text-gray-600">
                  Process pending adoption requests from families
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Update Information</h4>
                <p className="text-sm text-gray-600">
                  Keep children profiles and orphanage details current
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrphanageDashboard;

