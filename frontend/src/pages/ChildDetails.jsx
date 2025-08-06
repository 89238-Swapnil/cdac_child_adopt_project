import React, { useState, useEffect } from 'react';

const ChildDetails = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Child Details</h1>
      <p className="text-gray-600">View detailed information about a child.</p>

      <div className="text-sm text-gray-500">
        Current Time: {currentDateTime.toLocaleTimeString()}
      </div>
      <div className="text-sm text-gray-500">
        Date: {currentDateTime.toLocaleDateString()}
      </div>
    </div>
  );
};

export default ChildDetails;
