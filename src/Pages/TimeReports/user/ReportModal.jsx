import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ReportModal = ({ showModal, closeModal, projects, reports, reportData, setReportData, handleSubmit, userId }) => {
	const location = useLocation();
	const [selectedProjectId, setSelectedProjectId] = useState("");
	const [projectTimespan, setProjectTimespan] = useState({ start: "", end: "" });
	const [suggestedHours, setSuggestedHours] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	useEffect(() => {
		if (location.state && location.state.project) {
			setSelectedProjectId(location.state.project.id);
			const project = projects.find((p) => p.id === location.state.project.id);
			setProjectTimespan(project ? project.timespan : { start: "", end: "" });
		}
	}, [location, projects]);

	useEffect(() => {
		const mostRecentReport = getMostRecentReport();
		if (mostRecentReport) {
			setReportData((prev) => ({
				...prev,
				hours: mostRecentReport.hours.toString(), // Pre-fill hours with the most recent report's hours
				projectId: mostRecentReport.projectId, // Pre-fill project with the most recent report's project ID
			}));
		}
	}, []);

	const getMostRecentReport = () => {
		return reports.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log("handleIputChange name:", name, "value:", value);
		setReportData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === "projectId") {
			setSelectedProjectId(value);
			const selectedProject = projects.find((project) => project.id === value);
			if (selectedProject && selectedProject.timespan) {
				setProjectTimespan(selectedProject.timespan);
			} else {
				setProjectTimespan({ start: "", end: "" });
			}
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log("FE - handleFormSubmit - reportData:", reportData);

		const submissionData = {
			...reportData,
			hours: parseFloat(reportData.hours),
			personId: userId,
			projectId: selectedProjectId,
		};
		handleSubmit(submissionData);
	};

	const noteSuggestions = ["Completed the task", "Worked on *this* feature ", "Coded this module"];

	const handleNoteInputChange = (e) => {
		const { value } = e.target;
		setReportData((prev) => ({ ...prev, note: value }));

		const filteredNotes = noteSuggestions.filter((note) => note.toLowerCase().includes(value.toLowerCase()));
		setSuggestedHours(filteredNotes);
		setShowSuggestions(true);
	};

	const handleSuggestionClick = (suggestion) => {
		setReportData((prev) => ({ ...prev, note: suggestion }));
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
						<Form.Select name="projectId" value={selectedProjectId} onChange={handleInputChange} required>
							<option value="">Select a project</option>
							{projects.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group controlId="dateInput">
						<Form.Label>Date</Form.Label>
						<Form.Control
							type="date"
							name="date"
							value={new Date().toISOString().slice(0, 10)} // Set date to the current day
							onChange={handleInputChange}
							min={projectTimespan.start}
							max={projectTimespan.end}
							required
						/>
					</Form.Group>
					<Form.Group controlId="hoursInput">
						<Form.Label>Hours Worked</Form.Label>
						<Form.Control type="number" name="hours" min="1" step="1" value={reportData.hours} onChange={handleInputChange} required />
						{reportData.hours < 1 && <Form.Text className="text-danger">Hours must be at least 1.</Form.Text>}
					</Form.Group>
					<Form.Group controlId="noteInput">
						<Form.Label>Note/Description</Form.Label>
						<Form.Control as="textarea" name="note" value={reportData.note} onChange={handleNoteInputChange} maxLength="50" autoComplete="off" />
						{showSuggestions && (
							<ul>
								{suggestedHours.map((note, index) => (
									<li key={index} onClick={() => handleSuggestionClick(note)}>
										{note}
									</li>
								))}
							</ul>
						)}
						{reportData.note.length > 50 && <Form.Text className="text-danger">Note cannot exceed 50 characters.</Form.Text>}
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
