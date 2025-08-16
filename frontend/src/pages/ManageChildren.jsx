import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { childrenAPI } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ChildForm from '../components/ChildForm';

const ManageChildren = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      if (!user || !user.id) {
        toast.error('User not authenticated');
        return;
      }
      
      const data = await childrenAPI.getMyChildren(user.id);
      setChildren(data || []);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast.error(error.message || 'Failed to fetch children');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async (childData) => {
    try {
      setSubmitting(true);
      if (!user || !user.id) {
        toast.error('User not authenticated');
        return;
      }

      // Handle photo upload if present
      let finalChildData = { ...childData };
      if (childData.photo) {
        // If photo is a file, you might want to upload it first
        // For now, we'll just remove it from the data
        delete finalChildData.photo;
      }

      const response = await childrenAPI.add(user.id, finalChildData);
      toast.success('Child added successfully');
      setIsAddDialogOpen(false);
      fetchChildren();
    } catch (error) {
      console.error('Error adding child:', error);
      toast.error(error.message || 'Failed to add child');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditChild = async (childData) => {
    try {
      setSubmitting(true);
      if (!user || !user.id) {
        toast.error('User not authenticated');
        return;
      }

      if (!editingChild || !editingChild.id) {
        toast.error('No child selected for editing');
        return;
      }

      // Handle photo upload if present
      let finalChildData = { ...childData };
      if (childData.photo) {
        // If photo is a file, you might want to upload it first
        // For now, we'll just remove it from the data
        delete finalChildData.photo;
      }

      await childrenAPI.update(user.id, editingChild.id, finalChildData);
      toast.success('Child updated successfully');
      setIsEditDialogOpen(false);
      setEditingChild(null);
      fetchChildren();
    } catch (error) {
      console.error('Error updating child:', error);
      toast.error(error.message || 'Failed to update child');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteChild = async (childId) => {
    if (!window.confirm('Are you sure you want to delete this child record? This action cannot be undone.')) {
      return;
    }

    try {
      if (!user || !user.id) {
        toast.error('User not authenticated');
        return;
      }

      await childrenAPI.delete(user.id, childId);
      toast.success('Child deleted successfully');
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
      toast.error(error.message || 'Failed to delete child');
    }
  };

  const openEditDialog = (child) => {
    setEditingChild(child);
    setIsEditDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingChild(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading children...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Children</h1>
          <p className="text-gray-600">Add, update, and manage children in your care</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Child
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Child</DialogTitle>
              <DialogDescription>
                Enter the details of the child you want to add to your orphanage.
              </DialogDescription>
            </DialogHeader>
            <ChildForm 
              onSubmit={handleAddChild}
              loading={submitting}
              isEdit={false}
            />
          </DialogContent>
        </Dialog>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No children registered</h3>
            <p className="text-gray-600 text-center mb-4">
              Start by adding children who need homes to your orphanage.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Child
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{child.firstName} {child.lastName}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(child)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteChild(child.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Age: {child.age} • Gender: {child.gender}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {child.healthStatus && (
                    <div>
                      <strong>Health Status:</strong> {child.healthStatus}
                    </div>
                  )}
                  
                  {child.description && (
                    <div>
                      <strong>Description:</strong> 
                      <p className="text-sm text-gray-600 mt-1">{child.description}</p>
                    </div>
                  )}
                  
                  {child.specialNeeds && (
                    <div>
                      <strong>Special Needs:</strong> 
                      <p className="text-sm text-gray-600 mt-1">{child.specialNeeds}</p>
                    </div>
                  )}
                  
                  {child.dateOfBirth && (
                    <div>
                      <strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}
                    </div>
                  )}
                  
                  {child.admissionDate && (
                    <div>
                      <strong>Admission Date:</strong> {new Date(child.admissionDate).toLocaleDateString()}
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      child.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {child.isAvailable ? 'Available for Adoption' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Child</DialogTitle>
            <DialogDescription>
              Update the details of {editingChild?.firstName} {editingChild?.lastName}.
            </DialogDescription>
          </DialogHeader>
          {editingChild && (
            <ChildForm 
              onSubmit={handleEditChild}
              initialData={editingChild}
              loading={submitting}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageChildren;

