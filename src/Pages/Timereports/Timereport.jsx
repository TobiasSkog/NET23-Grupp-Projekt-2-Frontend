import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

export const Timereport = () => {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);
	const [originalTimeReports, setOriginalTimeReports] = useState([]);
	const [sortOrder, setSortOrder] = useState("ascending");

	const location = useLocation();
	const { state } = location;
	const projectId = state.id;
	const projectName = state.name;

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

	const handleNameClick = (id, name) => {
		const person = {
			id: id,
			name: name,
		};
		console.log(person);
		navigate("/timereports/user", { state: person });
	};

	const handleClick7days = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);
			//console.log(reportDate);
			return reportDate >= sevenDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleClick30days = () => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);
			//console.log(reportDate);
			return reportDate >= thirtyDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleAllClick = () => {
		setTimeReports(originalTimeReports);
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
			<h2 className="text-center mb-5">Timereports for {projectName}</h2>
			<Container>
				<Table className=" table table-dark table-striped table-bordered table-hover">
					<thead>
						<tr className="text-center">
							<th>#</th>
							<th onClick={() => handleSortByDate()}>Date</th>
							<th>Person</th>
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
			<Container>
				<Button
					className="mx-2"
					style={{ width: "115px" }}
					onClick={handleClick7days}>
					Last 7 days
				</Button>
				<Button
					className="mx-2"
					style={{ width: "115px" }}
					onClick={handleClick30days}>
					Last 30 days
				</Button>
				<Button
					className="mx-2"
					style={{ width: "115px" }}
					onClick={handleAllClick}>
					Total
				</Button>
			</Container>
		</section>
	);
};
