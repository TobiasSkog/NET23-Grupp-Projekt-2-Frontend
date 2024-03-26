import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sorting from "./Sorting";
import SearchDate from "./SearchDate";

export default function TimereportUser({ person }) {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [sortOrder, setSortOrder] = useState("ascending");
	const [searchDate, setSearchDate] = useState({ startDate: "", endDate: "" });

	const location = useLocation();
	const { state } = location;
	const personId = state?.id || person.id;
	const name = state?.name || person.name;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await axios.get(
					`http://localhost:3001/databases/timereports/filter/people?property=Person&id=${personId}`
				);

				setTimeReports(response.data);
				setOriginalTimeReports(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [personId]);

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

	//alphabeticly sorting by projectname
	const handleSortByProject = () => {
		const sortedReports = [...timeReports];
		sortedReports.sort((a, b) => {
			if (sortOrder === "ascending") {
				return a.projectName.localeCompare(b.projectName); // ascending
			} else {
				return b.projectName.localeCompare(a.projectName); // descending
			}
		});
		setTimeReports(sortedReports);
		setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
	};

	//passing projectId and projectName to next component
	const handleNameClick = (id, name) => {
		const project = {
			id: id,
			name: name,
		};

		navigate("/timereports/project", { state: project });
	};

	//Sum all hours to a Total - render in tfoot
	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section className="neu-table-container">
			<div className="inner-container">
				{loading && (
					<>
						<Spinner animation="border" variant="primary" />
						<h4 className="mt-3">Loading...</h4>
					</>
				)}
				<div className="neu-search-container">
					<SearchDate
						setTimeReports={setTimeReports}
						originalTimeReports={originalTimeReports}
						setSearchDate={setSearchDate}
						searchDate={searchDate}
					/>
				</div>
				<h2 className="text-center page-title mt-2 mb-2">{name}</h2>
				<div className="table-responsive">
					<table className="neu-table">
						<thead>
							<tr className="text-center">
								<th>
									<strong>#</strong>
								</th>
								<th
									onClick={() => handleSortByDate()}
									style={{ cursor: "pointer" }}>
									<strong>Date</strong>
								</th>
								<th>
									<strong>Hours</strong>
								</th>
								<th
									onClick={() => handleSortByProject()}
									style={{ cursor: "pointer" }}>
									<strong>Project</strong>
								</th>
								<th>
									<strong>Note</strong>
								</th>
								<th>
									<strong>Name</strong>
								</th>
							</tr>
						</thead>
						<tbody>
							{timeReports.map((item, index) => (
								<tr key={item.id} className="text-center">
									<td>
										<strong className="tableNumber">{index + 1}</strong>
									</td>
									<td>{item.date}</td>
									<td>{item.hours}</td>
									<td
										onClick={() =>
											handleNameClick(item.project, item.projectName)
										}
										style={{ cursor: "pointer" }}>
										{item.projectName}
									</td>
									<td>{item.note}</td>
									<td>{name}</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th scope="row" className="text-center">
									<strong> Sum</strong>
								</th>
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
					<Sorting
						setTimeReports={setTimeReports}
						originalTimeReports={originalTimeReports}
						setSearchDate={setSearchDate}
					/>
				</div>
			</div>
		</section>
	);
}
