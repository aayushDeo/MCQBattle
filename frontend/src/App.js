import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import McqManagement from './components/McqManagement';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ViewMcq from './components/ViewMcq';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/viewmcqs" element={<ProtectedRoute component={ViewMcq} />} />
        <Route path="/mcqmanagement" element={<ProtectedRoute component={McqManagement} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
