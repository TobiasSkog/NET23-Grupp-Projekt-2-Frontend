import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ReportModal = ({ showModal, closeModal, projects, reportData, setReportData, handleSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setReportData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Report Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <Form.Group controlId="projectSelect">
            <Form.Label>Project</Form.Label>
            <Form.Select
              name="projectId"
              value={reportData.projectId}
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