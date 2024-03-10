import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Sorting from "./Sorting";
import SearchDate from "./SearchDate";

export default function Timereport({ proj }) {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [sortOrder, setSortOrder] = useState("ascending");

	const location = useLocation();
	const { state } = location;
	const projectId = state?.id || proj.id;
	const projectName = state?.name || proj.name;
	console.log(projectId);
	console.log(projectName);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await axios.get(
					`http://localhost:3001/databases/timereports/filter/project?property=Project&id=${projectId}`
				);

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

	const handleNameClick = (id, name) => {
		const person = {
			id: id,
			name: name,
		};
		console.log(person);
		navigate("/timereports/user", { state: person });
	};

	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section>
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />{" "}
					<h4 className="mt-3">Loading...</h4>
				</>
			)}
			<Container className="d-flex mb-3 ">
				<SearchDate
					setTimeReports={setTimeReports}
					originalTimeReports={originalTimeReports}
				/>
				<div className="mt-2 mb-3 w-50 ">
					<h2 className="text-center mb-5">Timereports - {projectName}</h2>
				</div>
			</Container>
			<Container>
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
						</tr>
					</tfoot>
				</Table>
			</Container>
			<Sorting
				setTimeReports={setTimeReports}
				originalTimeReports={originalTimeReports}
			/>
		</section>
	);
}
