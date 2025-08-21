import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { orphanageAPI } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Phone, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const OrphanageList = () => {
  const { user } = useAuth();
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      setLoading(true);
      const data = await orphanageAPI.getAll();
      setOrphanages(data);
    } catch (error) {
      toast.error('Failed to fetch orphanages');
      console.error('Error fetching orphanages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orphanages</h1>
        <p className="text-gray-600">Browse orphanages and learn about their mission</p>
      </div>

      {orphanages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orphanages found</h3>
            <p className="text-gray-600 text-center">
              There are currently no orphanages registered in the system.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orphanages.map((orphanage) => (
            <Card key={orphanage.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{orphanage.name}</span>
                  <Building2 className="h-5 w-5 text-primary" />
                </CardTitle>
                <CardDescription>
                  {orphanage.description || 'Dedicated to providing care and finding loving homes for children.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-sm text-gray-600">{orphanage.address}</span>
                  </div>
                  
                  {orphanage.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{orphanage.phone}</span>
                    </div>
                  )}
                  
                  {orphanage.capacity && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Capacity: {orphanage.capacity} children</span>
                    </div>
                  )}
                  
                  {orphanage.establishedDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Established: {new Date(orphanage.establishedDate).getFullYear()}
                      </span>
                    </div>
                  )}
                  
                  {orphanage.contactPerson && (
                    <div className="text-sm text-gray-600">
                      <strong>Contact:</strong> {orphanage.contactPerson}
                    </div>
                  )}
                  
                  {orphanage.licenseNumber && (
                    <div className="text-sm text-gray-600">
                      <strong>License:</strong> {orphanage.licenseNumber}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link to={`/orphanage/${orphanage.id}/children`}>
                    <Button className="w-full">
                      View Children
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrphanageList;

