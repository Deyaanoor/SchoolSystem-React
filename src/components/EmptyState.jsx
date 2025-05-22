import React from 'react';

const EmptyState = ({ message = "No Data" }) => {
  return (
    <div className="text-center p-4 text-muted">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
