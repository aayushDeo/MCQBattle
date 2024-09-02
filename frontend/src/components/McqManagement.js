import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const McqManagement = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  const questionRef = useRef('');
  const option1Ref = useRef('');
  const option2Ref = useRef('');
  const option3Ref = useRef('');
  const correctRef = useRef('');
  const difficultyRef = useRef('');
  const subjectRef = useRef('');

  const handleCreateMcq = async () => {
    const newMcq = {
      question: questionRef.current.value,
      option1: option1Ref.current.value,
      option2: option2Ref.current.value,
      option3: option3Ref.current.value,
      correct: correctRef.current.value,
      difficulty: difficultyRef.current.value,
      subject: subjectRef.current.value,
      user: userId
    };

    try {
      await axios.post('http://localhost:7777/api/mcq', newMcq);
    } catch (error) {
      console.error('Failed to create MCQ:', error);
    }
  };

  const goToSubmittedMcqs = () => {
    navigate('/viewmcqs');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove user ID from local storage
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <div>
      <h2>Form to Add MCQ</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={goToSubmittedMcqs}>View your submitted MCQs</button>

      <input ref={questionRef} name="question" placeholder="Question" /><br />
      <input ref={option1Ref} name="option1" placeholder="Option 1" /><br />
      <input ref={option2Ref} name="option2" placeholder="Option 2" /><br />
      <input ref={option3Ref} name="option3" placeholder="Option 3" /><br />
      <input ref={correctRef} name="correct" placeholder="Correct Answer" /><br />
      <input ref={difficultyRef} name="difficulty" placeholder="Difficulty" /><br />
      <input ref={subjectRef} name="subject" placeholder="Subject" /><br />
      <button onClick={handleCreateMcq}>Create MCQ</button>
    </div>
  );
};

export default McqManagement;
