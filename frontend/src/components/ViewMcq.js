// src/components/ViewMcq.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewMcq = () => {
  const [mcqs, setMcqs] = useState([]);
  const [selectedMcq, setSelectedMcq] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedMcqs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7777/api/mcq/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMcqs(response.data);
      } catch (error) {
        console.error('Failed to fetch submitted MCQs:', error);
      }
    };

    fetchSubmittedMcqs();
  }, []);

  const handleCardClick = (mcq) => {
    setSelectedMcq(mcq);
    setShowDetails(true);
  };

  const handleUpdateClick = (mcq) => {
    setUpdateData(mcq);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7777/api/mcq/${updateData._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh the list after update
      const response = await axios.get('http://localhost:7777/api/mcq/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMcqs(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update MCQ:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7777/api/mcq/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh the list after delete
      const response = await axios.get('http://localhost:7777/api/mcq/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMcqs(response.data);
    } catch (error) {
      console.error('Failed to delete MCQ:', error);
    }
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div>
      <h2>Your Submitted MCQs</h2>
      <Button variant="primary" onClick={() => navigate('/mcqmanagement')}>Go Back to Add MCQ Form</Button>

      <div className="d-flex flex-wrap">
        {mcqs.map(mcq => (
          <Card key={mcq._id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title onClick={() => handleCardClick(mcq)} style={{ cursor: 'pointer' }}>
                {mcq.question}
              </Card.Title>
              {showDetails && selectedMcq._id === mcq._id && (
                <div>
                  <Card.Text>
                    <strong>Options:</strong>
                    <ul>
                      <li>{mcq.option1}</li>
                      <li>{mcq.option2}</li>
                      <li>{mcq.option3}</li>
                    </ul>
                    <strong>Correct Answer:</strong> {mcq.correct}
                    <br />
                    <strong>Difficulty:</strong> {mcq.difficulty}
                    <br />
                    <strong>Subject:</strong> {mcq.subject}
                  </Card.Text>
                  <Button variant="warning" onClick={() => handleUpdateClick(mcq)}>Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(mcq._id)}>Delete</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Update Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update MCQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                value={updateData.question || ''}
                onChange={(e) => setUpdateData({ ...updateData, question: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formOption1">
              <Form.Label>Option 1</Form.Label>
              <Form.Control
                type="text"
                value={updateData.option1 || ''}
                onChange={(e) => setUpdateData({ ...updateData, option1: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formOption2">
              <Form.Label>Option 2</Form.Label>
              <Form.Control
                type="text"
                value={updateData.option2 || ''}
                onChange={(e) => setUpdateData({ ...updateData, option2: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formOption3">
              <Form.Label>Option 3</Form.Label>
              <Form.Control
                type="text"
                value={updateData.option3 || ''}
                onChange={(e) => setUpdateData({ ...updateData, option3: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCorrect">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                type="text"
                value={updateData.correct || ''}
                onChange={(e) => setUpdateData({ ...updateData, correct: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDifficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                type="text"
                value={updateData.difficulty || ''}
                onChange={(e) => setUpdateData({ ...updateData, difficulty: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={updateData.subject || ''}
                onChange={(e) => setUpdateData({ ...updateData, subject: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update MCQ
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewMcq;
