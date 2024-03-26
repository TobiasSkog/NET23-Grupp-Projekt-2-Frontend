import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sorting from "./Sorting";
import SearchDate from "./SearchDate";
import EditAdminReportModal from "./EditAdminReportModal";

export default function Timereport({ proj }) {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [sortOrder, setSortOrder] = useState("ascending");
	const [modalOpen, setModalOpen] = useState(false);
	const [searchDate, setSearchDate] = useState({ startDate: "", endDate: "" });
	const [formInput, setFormInput] = useState({
		id: "",
		date: "",
		hours: "",
		note: "",
		project: "",
	});

	const location = useLocation();
	const { state } = location;
	const projectId = state?.id || proj.id;
	const projectName = state?.name || proj.name;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				//get timereports by filtering on projectId

				// const response = await axios.get(`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);
				const response = await axios.get(`http://127.0.0.1:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);

				//save response 2 times, one will be manipulated in filtering, and one to always have all data
				setTimeReports(response.data);
				setOriginalTimeReports(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [projectId]);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	//After editing we update
	const updateTimereports = async () => {
		try {
			setLoading(true);
			// const response = await axios.get(`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);
			const response = await axios.get(`http://127.0.0.1:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);

			setTimeReports(response.data);
			setOriginalTimeReports(response.data);
		} catch (error) {
			console.error("There was a problem updating projects:", error);
		} finally {
			setLoading(false);
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

	//sorting by people/person
	const handleSortByName = () => {
		const sortedReports = [...timeReports];
		sortedReports.sort((a, b) => {
			if (sortOrder === "ascending") {
				return a.name.localeCompare(b.name); // ascending
			} else {
				return b.name.localeCompare(a.name); // descending
			}
		});
		setTimeReports(sortedReports);
		setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
	};

	//when we click on a person in the table we pass the name and id to next component
	const handleNameClick = (id, name) => {
		const person = {
			id: id,
			name: name,
		};
		navigate("/timereports/admin", { state: person });
	};

	//in edit we find the right timereportId
	const handleEdit = (timereportId) => {
		const timereportToEdit = originalTimeReports.find((item) => item.id === timereportId);
		if (timereportToEdit) {
			setFormInput({
				id: timereportId,
				date: timereportToEdit.date,
				hours: timereportToEdit.hours,
				note: timereportToEdit.note,
				project: "",
			});
		}
		openModal();
	};

	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section className="neu-table-container">
			<div className="inner-container">
				{modalOpen && (
					<EditAdminReportModal
						formInput={formInput}
						setFormInput={setFormInput}
						closeModal={closeModal}
						modalOpen={modalOpen}
						updateTimereports={updateTimereports}
						setLoading={setLoading}
					/>
				)}
				{loading ? (
					<div className="neu-loader">
						<h4 className="me-3">Loading...</h4>
						<Spinner animation="border" variant="dark" />
					</div>
				) : (
					<>
						<section className="neu-search-container">
							<SearchDate
								setTimeReports={setTimeReports}
								originalTimeReports={originalTimeReports}
								setSearchDate={setSearchDate}
								searchDate={searchDate}
							/>
						</section>
						<h2 className="text-center page-title mt-2 mb-2">{projectName}</h2>
						<section className="table-responsive">
							<table className="neu-table">
								<thead>
									<tr className="text-center">
										<th>
											<strong>#</strong>
										</th>
										<th onClick={() => handleSortByDate()} style={{ cursor: "pointer" }}>
											<strong> Date</strong>
										</th>
										<th onClick={() => handleSortByName()} style={{ cursor: "pointer" }}>
											<strong>Person</strong>
										</th>
										<th>
											<strong>Hours</strong>
										</th>
										<th>
											<strong>Project</strong>
										</th>
										<th>
											<strong>Note</strong>
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{timeReports.map((item, index) => (
										<tr key={item.id} className="text-center">
											<td>
												<strong className="tableNumber">{index + 1}</strong>
											</td>
											<td className="">{item.date}</td>
											<td className="" onClick={() => handleNameClick(item.person, item.name)} style={{ cursor: "pointer" }}>
												{item.name}
											</td>
											<td className="">{item.hours}</td>
											<td className="">{projectName}</td>
											<td className="">{item.note}</td>
											<td>
												<button className="edit-timereport-button" onClick={() => handleEdit(item.id)}>
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
						</section>
						<section className="neu-table-filter-button-container d-flex flex-column flex-sm-row justify-content-center">
							<Sorting setTimeReports={setTimeReports} originalTimeReports={originalTimeReports} setSearchDate={setSearchDate} />
						</section>
					</>
				)}
			</div>
		</section>
	);
}
