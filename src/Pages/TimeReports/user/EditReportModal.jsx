import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReportModal = ({
  showModal,
  closeModal,
  selectedReport,
  handleUpdateReport,
  projects,
}) => {
  const [updatedReport, setUpdatedReport] = useState(selectedReport || {});
  const [projectTimespan, setProjectTimespan] = useState({ start: '', end: '' });

  useEffect(() => {
    // Update the state with the selected report
    setUpdatedReport(selectedReport || {});
    const project = projects.find(p => p.id === selectedReport?.projectId);
    if (project && project.timespan) {
      setProjectTimespan(project.timespan);
    }
  }, [selectedReport, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReport(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateReport(updatedReport);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Time Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={updatedReport.date || ''}
              onChange={handleChange}
              min={projectTimespan.start}
              max={projectTimespan.end}
              required
            />
          </Form.Group>
          <Form.Group controlId="hours">
            <Form.Label>Hours Worked</Form.Label>
            <Form.Control
              type="number"
              name="hours"
              min="1"
              step="1"
              value={updatedReport.hours || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="note">
            <Form.Label>Note/Description</Form.Label>
            <Form.Control
              as="textarea"
              name="note"
              maxLength="50"
              value={updatedReport.note || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Report
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReportModal;