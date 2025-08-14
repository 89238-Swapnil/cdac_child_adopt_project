import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { childrenAPI } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

const ManageChildren = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    healthStatus: '',
    description: '',
    specialNeeds: ''
  });

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const data = await childrenAPI.getMyChildren(user.id);
      setChildren(data);
    } catch (error) {
      toast.error('Failed to fetch children');
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      healthStatus: '',
      description: '',
      specialNeeds: ''
    });
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    try {
      await childrenAPI.add(user.id, {
        ...formData,
        age: parseInt(formData.age)
      });
      toast.success('Child added successfully');
      setIsAddDialogOpen(false);
      resetForm();
      fetchChildren();
    } catch (error) {
      toast.error('Failed to add child');
      console.error('Error adding child:', error);
    }
  };

  const handleEditChild = async (e) => {
    e.preventDefault();
    try {
      await childrenAPI.update(user.id, editingChild.id, {
        ...formData,
        age: parseInt(formData.age)
      });
      toast.success('Child updated successfully');
      setIsEditDialogOpen(false);
      setEditingChild(null);
      resetForm();
      fetchChildren();
    } catch (error) {
      toast.error('Failed to update child');
      console.error('Error updating child:', error);
    }
  };

  const handleDeleteChild = async (childId) => {
    if (window.confirm('Are you sure you want to delete this child record?')) {
      try {
        await childrenAPI.delete(user.id, childId);
        toast.success('Child deleted successfully');
        fetchChildren();
      } catch (error) {
        toast.error('Failed to delete child');
        console.error('Error deleting child:', error);
      }
    }
  };

  const openEditDialog = (child) => {
    setEditingChild(child);
    setFormData({
      firstName: child.firstName,
      lastName: child.lastName,
      age: child.age.toString(),
      gender: child.gender,
      healthStatus: child.healthStatus || '',
      description: child.description || '',
      specialNeeds: child.specialNeeds || ''
    });
    setIsEditDialogOpen(true);
  };

  const ChildForm = ({ onSubmit, isEdit = false }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="0"
            max="18"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="healthStatus">Health Status</Label>
        <Input
          id="healthStatus"
          name="healthStatus"
          value={formData.healthStatus}
          onChange={handleInputChange}
          placeholder="e.g., Healthy, Needs medication, etc."
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description about the child"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="specialNeeds">Special Needs</Label>
        <Textarea
          id="specialNeeds"
          name="specialNeeds"
          value={formData.specialNeeds}
          onChange={handleInputChange}
          placeholder="Any special needs or requirements"
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        {isEdit ? 'Update Child' : 'Add Child'}
      </Button>
    </form>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
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
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Child
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Child</DialogTitle>
              <DialogDescription>
                Enter the details of the child you want to add to your orphanage.
              </DialogDescription>
            </DialogHeader>
            <ChildForm onSubmit={handleAddChild} />
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Child
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Child</DialogTitle>
                  <DialogDescription>
                    Enter the details of the child you want to add to your orphanage.
                  </DialogDescription>
                </DialogHeader>
                <ChildForm onSubmit={handleAddChild} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{child.firstName} {child.lastName}</span>
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
                <div className="space-y-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Child</DialogTitle>
            <DialogDescription>
              Update the details of the child.
            </DialogDescription>
          </DialogHeader>
          <ChildForm onSubmit={handleEditChild} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageChildren;

