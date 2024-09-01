import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import McqManagement from './components/McqManagement';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mcqmanagement" element={<ProtectedRoute component={McqManagement} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
