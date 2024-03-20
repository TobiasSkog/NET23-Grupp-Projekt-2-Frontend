import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import CustomModal from "../../../Components/CustomModal/CustomModal";

const EditReportModal = ({ showModal, closeModal, selectedReport, handleUpdateReport, projects }) => {
	const [updatedReport, setUpdatedReport] = useState(selectedReport || {});
	const [projectTimespan, setProjectTimespan] = useState({ start: "", end: "" });

	useEffect(() => {
		// Update the state with the selected report
		setUpdatedReport(selectedReport || {});
		const project = projects.find((p) => p.id === selectedReport?.projectId);
		if (project && project.timespan) {
			setProjectTimespan(project.timespan);
		}
	}, [selectedReport, projects]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedReport((prev) => ({
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
		<CustomModal show={showModal} onClose={closeModal}>
			<Form onSubmit={handleSubmit} className="neu-form">
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="startDate">Date:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="date"
						id="startDate"
						name="startDate"
						aria-label="startDate"
						required
						value={updatedReport.date || ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="hours">Hours:</Form.Label>
					<Form.Control
						type="text"
						id="hours"
						placeholder="Hours"
						className="neu-form-controll"
						name="hours"
						value={updatedReport.hours || ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="note">Note:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="text"
						id="note"
						name="note"
						aria-label="note"
						placeholder="Note"
						required
						value={updatedReport.note || ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<div className="neu-form-1b">
					<button
						type="submit"
						className="neu-button-square neu-size-100"
						onClick={(e) => {
							handleSubmit(e);
							closeModal();
						}}>
						Update Report
					</button>
				</div>
			</Form>
		</CustomModal>
	);
};

export default EditReportModal;
