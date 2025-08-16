import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdoptionRequestsList from '../components/AdoptionRequestsList';

const AdoptionRequests = () => {
  const { user } = useAuth();
const userRole = user?.role || 'parent';

  return (
    <div className="container mx-auto px-4 py-8">
      <AdoptionRequestsList userRole={userRole} />
    </div>
  );
};

export default AdoptionRequests;

