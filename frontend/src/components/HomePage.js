import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to MCQ Battle Home Page</h1>
      <p>Please login or register to continue.</p>
      <div>
        <button onClick={goToLogin} style={{ marginRight: '10px' }}>
          Login
        </button>
        <button onClick={goToRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
