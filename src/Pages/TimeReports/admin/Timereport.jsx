import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Sorting from "./Sorting";
import SearchDate from "./SearchDate";
import EditAdminReportModal from "./EditAdminReportModal";

export default function Timereport({ proj, userSignal }) {
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

				const response = await axios.get(
					`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`
				);

				//save response 2 times, one will be manipulated in filtering, and one to always have all data
				setTimeReports(response.data);
				setOriginalTimeReports(response.data);
				//console.log(response.data);
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
			const response = await axios.get(
				`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`
			);

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
		console.log(person);
		navigate("/timereports/admin", { state: person });
	};

	//in edit we find the right timereportId
	const handleEdit = (timereportId) => {
		const timereportToEdit = originalTimeReports.find(
			(item) => item.id === timereportId
		);
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
		<section>
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
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />
					<h4 className="mt-3">Loading...</h4>
				</>
			)}
			<Container className="d-md-flex mb-3">
				<SearchDate
					setTimeReports={setTimeReports}
					originalTimeReports={originalTimeReports}
					setSearchDate={setSearchDate}
					searchDate={searchDate}
				/>
				<div className="mt-2 mb-3 col-md-5 col-lg-6">
					<h2 className="text-center mb-5">Timereports - {projectName}</h2>
				</div>
			</Container>
			<Container className="table-responsive">
				<Table className=" table table-dark table-striped table-bordered table-hover">
					<thead>
						<tr className="text-center">
							<th>#</th>
							<th
								onClick={() => handleSortByDate()}
								style={{ cursor: "pointer" }}>
								Date
							</th>
							<th
								onClick={() => handleSortByName()}
								style={{ cursor: "pointer" }}>
								Person
							</th>
							<th>Hours</th>
							<th>Project</th>
							<th>Note</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{timeReports.map((item, index) => (
							<tr key={item.id} className="text-center">
								<td>{index + 1}</td>
								<td>{item.date}</td>
								<td
									onClick={() => handleNameClick(item.person, item.name)}
									style={{ cursor: "pointer" }}>
									{item.name}
								</td>
								<td>{item.hours}</td>
								<td>{projectName}</td>
								<td>{item.note}</td>
								<td>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleEdit(item.id)}>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<th scope="row" className="text-center">
								Sum
							</th>
							<td></td>
							<td></td>
							<td className="text-center">
								<strong>{totalHours}</strong>
							</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tfoot>
				</Table>
			</Container>
			<Sorting
				setTimeReports={setTimeReports}
				originalTimeReports={originalTimeReports}
				setSearchDate={setSearchDate}
			/>
		</section>
	);
}
