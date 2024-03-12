import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditReportModal = ({
	selectedReport,
	closeModal,
	handleUpdateReport,
}) => {
	const [updatedReport, setUpdatedReport] = useState(selectedReport);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedReport({ ...updatedReport, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleUpdateReport(updatedReport);
		closeModal();
	};

	return (
		<Modal show={true} onHide={closeModal}>
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
							value={updatedReport.date}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="hours">
						<Form.Label>Hours</Form.Label>
						<Form.Control
							type="number"
							name="hours"
							value={updatedReport.hours}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="note">
						<Form.Label>Note</Form.Label>
						<Form.Control
							as="textarea"
							name="note"
							value={updatedReport.note}
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
