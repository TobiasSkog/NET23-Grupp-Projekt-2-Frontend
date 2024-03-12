import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ReportModal from "./ReportModal";
import Cookies from "js-cookie";
import axios from "axios";
import EditReportModal from "./EditReportModal";

const TimeReports = () => {
	const [showModal, setShowModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [reportData, setReportData] = useState({
		date: "",
		hours: "",
		note: "",
	});
	const [timeReports, setTimeReports] = useState([]);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);

	const userJson = Cookies.get("auth");
	const user = JSON.parse(userJson || "{}");
	const userId = user?.id;

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3001/databases/projects"
				);
				setProjects(response.data || []);
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			}
		};

		fetchProjects();
	}, []);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const handleEditTime = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3001/databases/timereports"
			);
			const userTimeReports = response.data.filter(
				(report) => report.personId === userId
			);
			setTimeReports(userTimeReports);
			setEditModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch time reports:", error);
		}
	};

	const handleEditReport = (report) => {
		setSelectedReport(report);
	};

	const handleUpdateReport = async (updatedReport) => {
		try {
			const response = await axios.patch(
				`http://localhost:3001/pages/timereports/${updatedReport.id}`,
				updatedReport
			);
			console.log("Time report updated:", response.data);
		} catch (error) {
			console.error("Failed to update time report:", error);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<Button onClick={openModal} style={{ marginRight: "10px" }}>
				Report Time
			</Button>
			<Button onClick={handleEditTime}>Edit Time</Button>
			<ReportModal
				showModal={showModal}
				closeModal={closeModal}
				projects={projects}
				reportData={reportData}
				setReportData={setReportData}
			/>
			{editModalVisible && (
				<Modal show={true} onHide={() => setEditModalVisible(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Time Reports</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ul>
							{timeReports.map((report) => (
								<li key={report.id}>
									{report.date} - {report.hours} hours - {report.note} -{" "}
									{report.projectId}
									<Button onClick={() => handleEditReport(report)}>Edit</Button>
								</li>
							))}
						</ul>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setEditModalVisible(false)}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
			{selectedReport && (
				<EditReportModal
					selectedReport={selectedReport}
					closeModal={() => setSelectedReport(null)}
					handleUpdateReport={handleUpdateReport}
				/>
			)}
		</div>
	);
};

export default TimeReports;
