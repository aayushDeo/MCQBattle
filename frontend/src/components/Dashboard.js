import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const goToMcqManagement = () => {
    navigate('/mcqmanagement');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. You can manage your MCQs here.</p>
      <button onClick={goToMcqManagement}>
        Go to MCQ Management
      </button>
    </div>
  );
};

export default Dashboard;
