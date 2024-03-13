import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ReportModal = ({ showModal, closeModal, projects, reportData, setReportData, handleSubmit, userId }) => {
  const location = useLocation();
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    if (location.state && location.state.project) {
      setSelectedProjectId(location.state.project.id);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Include the userId and selectedProjectId in the submission data
    const submissionData = {
      ...reportData,
      hours: parseFloat(reportData.hours),
      personId: userId,
      projectId: selectedProjectId, // Set the selected project ID
    };
    handleSubmit(submissionData);
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Report Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="projectSelect">
            <Form.Label>Project</Form.Label>
            <Form.Select
              name="projectId"
              value={selectedProjectId} // Set the selected project ID as the value
              onChange={handleInputChange}
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="dateInput">
            <Form.Label>Date (YYYY-MM-DD)</Form.Label>
            <Form.Control
              type="text"
              placeholder="YYYY-MM-DD"
              name="date"
              pattern="\d{4}-\d{2}-\d{2}"
              value={reportData.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="hoursInput">
            <Form.Label>Hours Worked</Form.Label>
            <Form.Control
              type="number"
              name="hours"
              min="0"
              step="0.5"
              value={reportData.hours}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="noteInput">
            <Form.Label>Note/Description</Form.Label>
            <Form.Control
              as="textarea"
              name="note"
              value={reportData.note}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;