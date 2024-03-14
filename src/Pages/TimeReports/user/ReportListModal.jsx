import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const ReportListModal = ({ showModal, closeModal, reports, projects, onEditReport }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Time Reports</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Hours</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const project = projects.find(project => project.id === report.projectId);
              const projectName = projects.find(project => project.id === report.project)?.name || 'Unknown Project';
              return (
                <tr key={report.id}>
                  <td>{report.date}</td>
                  <td>{projectName}</td>
                  <td>{report.hours}</td>
                  <td>{report.note}</td>
                  <td>
                    <Button variant="primary" onClick={() => onEditReport(report)}>Edit</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportListModal;