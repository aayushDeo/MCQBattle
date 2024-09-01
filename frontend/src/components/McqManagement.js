import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const McqManagement = () => {
  const [mcqs, setMcqs] = useState([]);
  const [newMcq, setNewMcq] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    correct: '',
    difficulty: '',
    subject: ''
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get user ID from local storage
  console.log('user id : ',userId);
  
  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/mcq/user/');
        setMcqs(response.data);
      } catch (error) {
        console.error('Failed to fetch MCQs:', error);
      }
    };

    fetchMCQs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMcq({ ...newMcq, [name]: value });
  };

  const handleCreateMcq = async () => {
    try {
      const response = await axios.post('/api/mcq', { ...newMcq, user: userId });
      setMcqs([...mcqs, response.data]);
    } catch (error) {
      console.error('Failed to create MCQ:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove user ID from local storage
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your MCQs</h3>
      <ul>
        {mcqs.map(mcq => (
          <li key={mcq._id}>
            {mcq.question} (Subject: {mcq.subject}, Difficulty: {mcq.difficulty})
          </li>
        ))}
      </ul>

      <h3>Create a New MCQ</h3>
      <input name="question" placeholder="Question" value={newMcq.question} onChange={handleInputChange} />
      <input name="option1" placeholder="Option 1" value={newMcq.option1} onChange={handleInputChange} />
      <input name="option2" placeholder="Option 2" value={newMcq.option2} onChange={handleInputChange} />
      <input name="option3" placeholder="Option 3" value={newMcq.option3} onChange={handleInputChange} />
      <input name="correct" placeholder="Correct Answer" value={newMcq.correct} onChange={handleInputChange} />
      <input name="difficulty" placeholder="Difficulty" value={newMcq.difficulty} onChange={handleInputChange} />
      <input name="subject" placeholder="Subject" value={newMcq.subject} onChange={handleInputChange} />
      <button onClick={handleCreateMcq}>Create MCQ</button>
    </div>
  );
};

export default McqManagement;
