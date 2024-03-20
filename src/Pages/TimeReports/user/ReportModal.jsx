import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CustomModal from "../../../Components/CustomModal/CustomModal";

const ReportModal = ({ showModal, closeModal, projects, reports, reportData, setReportData, handleSubmit, userId }) => {
	const location = useLocation();
	const [selectedProjectId, setSelectedProjectId] = useState("");
	const [projectTimespan, setProjectTimespan] = useState({ start: "", end: "" });
	const [suggestedHours, setSuggestedHours] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	console.log("Projects Prop in ReportModal:", projects); // At the beginning of the ReportModal component
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
		setReportData((prev) => ({
			...prev,
			date: new Date().toISOString().slice(0, 10),
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const handleNoteInputChange = (e) => {
		const { value } = e.target;
		setReportData((prev) => ({ ...prev, note: value }));
	};
	return (
		<CustomModal show={showModal} onClose={closeModal} title="Time Report" divider>
			<Form onSubmit={handleFormSubmit} className="neu-form">
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="projectId">Project</Form.Label>
					<Form.Select
						className="neu-form-select"
						type="text"
						name="projectId"
						id="projectId"
						aria-label="projectId"
						value={selectedProjectId}
						onChange={handleInputChange}
						required>
						<option hidden>Select a project</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="date">Date</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="date"
						name="date"
						id="date"
						aria-label="date"
						value={reportData.date}
						onChange={handleInputChange}
						min={projectTimespan.start}
						max={projectTimespan.end}
						required
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label>Hours Worked</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="text"
						name="hours"
						min="1"
						step="1"
						value={reportData.hours}
						onChange={handleInputChange}
						required
					/>
					{reportData.hours < 1 && <Form.Text className="text-danger">Hours must be at least 1.</Form.Text>}
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label>Note/Description</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="text"
						as="textarea"
						id="note"
						name="note"
						aria-label="note"
						placeholder="Note"
						required
						value={reportData.note}
						onChange={handleNoteInputChange}
						maxLength="50"
						autoComplete="off"
					/>
					{showSuggestions && (
						<ul>
							{suggestedHours.map((note, index) => (
								<li key={index}>{note}</li>
							))}
						</ul>
					)}
					{reportData.note.length > 50 && <Form.Text className="text-danger">Note cannot exceed 50 characters.</Form.Text>}
				</Form.Group>
				<button type="submit" className="neu-button-square neu-size-100">
					Submit
				</button>
			</Form>
		</CustomModal>
	);
};

export default ReportModal;
