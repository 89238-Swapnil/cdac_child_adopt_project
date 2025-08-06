import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Complete Your Profile',
    description: 'Make sure your profile information is complete and up-to-date',
  },
  {
    number: 2,
    title: 'Browse Available Children',
    description: 'Explore profiles of children available for adoption',
  },
  {
    number: 3,
    title: 'Submit Adoption Request',
    description: 'Fill out the adoption form and submit your request',
  },
];

const Process = () => {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.number} className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
            {step.number}
          </div>
          <div>
            <h4 className="font-semibold">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Process;
