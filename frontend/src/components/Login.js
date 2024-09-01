import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.error('1',email);
      // console.error('1',password);
      const response = await axios.post('http://localhost:7777/api/user/login', { email, password });
      // console.error('2');
      localStorage.setItem('token', response.data.token);
      console.error('3', response.data);
      localStorage.setItem('userId', response.data.user.id); // Store user ID
      console.error('4');
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.error('5');
      navigate('/mcqManagement');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
