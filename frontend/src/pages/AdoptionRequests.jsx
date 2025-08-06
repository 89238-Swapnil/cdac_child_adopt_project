import React, { useEffect, useState } from 'react';

const AdoptionRequests = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const tips = [
    "💡 Tip: Review each request carefully before approval.",
    "💡 Tip: Keep the child’s preferences in mind.",
    "💡 Tip: Check if all documents are uploaded.",
    "💡 Tip: Use filters to manage large request lists.",
    "💡 Tip: Stay updated with notifications.",
  ];
  const [randomTip, setRandomTip] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    setRandomTip(tip);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Adoption Requests</h1>
        <div className="text-sm text-gray-500">
          🕒 {currentTime.toLocaleString()}
        </div>
      </div>
      <p className="text-gray-600">Manage adoption requests and applications.</p>
      <div className="bg-blue-100 text-blue-800 p-3 rounded shadow-sm">
        {randomTip}
      </div>
    </div>
  );
};

export default AdoptionRequests;
