import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sorting from "./Sorting";
//import SearchDate from "./SearchDate";
import EditAdminReportModal from "./EditAdminReportModal";
import SearchDate from "./SearchDate";

export default function Timereport({ proj, userSignal }) {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [sortOrder, setSortOrder] = useState("ascending");
	const [modalOpen, setModalOpen] = useState(false);
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

				const response = await axios.get(`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);

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
			const response = await axios.get(`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`);

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
		<section>
			<section className="neu-table-container">
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

				<section className="neu-search-container">
					<SearchDate setTimeReports={setTimeReports} originalTimeReports={originalTimeReports} />
					<div className="mt-2 mb-3 col-md-5 col-lg-6"></div>
				</section>
				<h2>Timereports - {projectName}</h2>
				{loading && (
					<div class="neu-loading-container">
						<div class="neu-loading-spinner">
							<div class="layer layer1"></div>
							<div class="layer layer2"></div>
							<div class="layer layer3"></div>
						</div>
						<p class="neu-loading-msg">Loading...</p>
					</div>
				)}

				{/* kinda cool one!
        	<div class="shape shape1"></div>
							<div class="shape shape2"></div>
							<div class="shape shape3"></div>
							<div class="shape shape4"></div>
							<div class="shape shape5"></div>
							<div class="shape shape6"></div>
          <p className="neu-loading-msg">Loading...</p>
					<div class="neu-loading-spinner">
						<div class="layer layer1" />
						<div class="layer layer2" />
						<div class="layer layer3" /> 
					</div>*/}
				{!loading && (
					<table className="neu-table">
						<thead>
							<tr>
								<th>#</th>
								<th onClick={() => handleSortByDate()} className="neu-table-clickable">
									Date
								</th>
								<th onClick={() => handleSortByName()} className="neu-table-clickable">
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
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.date}</td>
									<td onClick={() => handleNameClick(item.person, item.name)} className="neu-table-clickable">
										{item.name}
									</td>
									<td>{item.hours}</td>
									<td>{projectName}</td>
									<td>{item.note}</td>
									<td>
										<button className="neu-button-square" onClick={() => handleEdit(item.id)}>
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<div className="neu-table-filter-button-container">
					<Sorting setTimeReports={setTimeReports} originalTimeReports={originalTimeReports} />
				</div>
			</section>
		</section>
	);
}
