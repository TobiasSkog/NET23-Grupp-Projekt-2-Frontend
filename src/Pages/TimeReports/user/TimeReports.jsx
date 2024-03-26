import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReportModal from "./ReportModal"; // Modal for adding new reports
import EditReportModal from "./EditReportModal"; // Modal for editing a report
import Sorting from "../admin/Sorting";
import SearchDate from "../admin/SearchDate";

const TimeReports = ({ userSignal }) => {
	const [showReportModal, setShowReportModal] = useState(false);
	const [showEditReportModal, setShowEditReportModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [searchDate, setSearchDate] = useState({ startDate: "", endDate: "" });
	const [sortOrder, setSortOrder] = useState("ascending");
	const [selectedReport, setSelectedReport] = useState(null);
	const [reportData, setReportData] = useState({
		date: "",
		hours: "",
		note: "",
		projectId: "",
	});

	const location = useLocation();
	const navigate = useNavigate();
	const userData = userSignal.value;
	const user = userData?.user;

	useEffect(() => {
		if (!user) {
			navigate("/");
			return;
		}
		fetchProjects();
	}, [user, navigate]);

	useEffect(() => {
		// Ensure projects are fetched and set before fetching time reports
		if (projects.length > 0) {
			fetchTimeReports();
		}
	}, [projects]); // Depend on projects to ensure they're fetched first

	useEffect(() => {
		if (location.pathname === "/timereports/user") {
			setShowReportModal(true);
		}
	}, [location.pathname]);

	const fetchProjects = async () => {
		try {
			const response = await axios.get("http://localhost:3001/databases/projects");
			const activeProjects = response.data.filter((project) => project.status.toLowerCase() === "active");
			setProjects(activeProjects || []);
		} catch (error) {
			console.error("Failed to fetch projects:", error);
		}
	};

	const fetchTimeReports = async () => {
		try {
			const response = await axios.get("http://localhost:3001/databases/timereports");
			const userTimeReports = response.data.filter((report) => report.person === user.id);

			// Corrected the property name used to match project IDs from reports to active projects
			const activeReports = userTimeReports.filter((report) =>
				projects.some((project) => project.id === report.project && project.status.toLowerCase() === "active")
			);

			setTimeReports(activeReports);
			setOriginalTimeReports(activeReports);
		} catch (error) {
			console.error("Failed to fetch time reports:", error);
		}
	};

	// Function to handle sorting by date
	const handleSortByDate = () => {
		const sortedReports = [...timeReports];
		sortedReports.sort((a, b) => {
			if (sortOrder === "ascending") {
				return new Date(a.date) - new Date(b.date);
			} else {
				return new Date(b.date) - new Date(a.date);
			}
		});
		setTimeReports(sortedReports);
		setSortOrder(sortOrder === "ascending" ? "descending" : "ascending"); // Toggle sort order
	};
	const openReportModal = () => setShowReportModal(true);

	const closeReportModal = () => setShowReportModal(false);

	const handleEditReportSelection = (report) => {
		setSelectedReport(report);
		setShowEditReportModal(true);
	};

	const closeEditReportModal = () => {
		setShowEditReportModal(false);
		setSelectedReport(null); // Reset selected report on modal close
		fetchTimeReports(); // Refetch reports to reflect any updates
	};

	const handleSubmitReport = async (report) => {
		try {
			const response = await axios.post("http://localhost:3001/pages/timereports", report);
		} catch (error) {
			console.error("Failed to add time report:", error);
		}
		closeReportModal();
	};

	const handleUpdateReport = async (updatedReport) => {
		try {
			const response = await axios.patch(`http://localhost:3001/pages/timeReports/user/${updatedReport.id}`, {
				date: updatedReport.date,
				hours: updatedReport.hours,
				note: updatedReport.note,
				personId: updatedReport.person,
				projectId: updatedReport.project,
			});
			closeEditReportModal();
		} catch (error) {
			console.error("Failed to update report:", error);
		}
	};

	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section className="neu-table-container">
			<div className="inner-container">
				<div className="neu-search-container">
					<SearchDate
						setTimeReports={setTimeReports}
						originalTimeReports={originalTimeReports}
						setSearchDate={setSearchDate}
						searchDate={searchDate}
					/>
				</div>
				<div className="d-flex flex-row align-items-center justify-content-center text-center page-title mt-2 mb-2">
					<h2 className="page-title mt-2 mb-2 me-3">{user.name}</h2>
					<button className="neu-button-square m-0" onClick={openReportModal}>
						Report Time
					</button>
				</div>

				<div className="table-responsive">
					<table className="neu-table">
						<thead>
							<tr className="text-center">
								<th>
									<strong>#</strong>
								</th>
								<th onClick={() => handleSortByDate()} style={{ cursor: "pointer" }}>
									<strong>Date</strong>
								</th>
								<th>
									<strong>Project</strong>
								</th>
								<th>
									<strong>Hours</strong>
								</th>
								<th>
									<strong>Note</strong>
								</th>
								<th>
									<strong>Edit</strong>
								</th>
							</tr>
						</thead>
						<tbody>
							{timeReports.map((report, index) => (
								<tr key={report.id}>
									<td>
										<strong className="tableNumber">{index + 1}</strong>
									</td>
									<td>{report.date}</td>
									<td>{projects.find((project) => project.id === report.project)?.name || "Unknown Project"}</td>
									<td>{report.hours}</td>
									<td>{report.note}</td>
									<td>
										<button className="edit-timereport-button" onClick={() => handleEditReportSelection(report)}>
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th scope="row" className="text-center">
									<strong> Sum</strong>
								</th>
								<td></td>
								<td></td>
								<td className="text-center">
									<strong className="tableNumber">{totalHours}</strong>
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div className="neu-table-filter-button-container d-flex flex-column flex-sm-row justify-content-center">
					<Sorting setTimeReports={setTimeReports} originalTimeReports={originalTimeReports} setSearchDate={setSearchDate} />
				</div>
				<ReportModal
					key={showReportModal}
					showModal={showReportModal}
					closeModal={closeReportModal}
					projects={projects}
					reports={timeReports}
					reportData={reportData}
					setReportData={setReportData}
					userId={user.id}
					handleSubmit={handleSubmitReport}
					location={location}
				/>

				<EditReportModal
					showModal={showEditReportModal}
					closeModal={closeEditReportModal}
					selectedReport={selectedReport}
					handleUpdateReport={handleUpdateReport}
					projects={projects}
				/>
			</div>
		</section>
	);
};

export default TimeReports;
