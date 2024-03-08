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
	const [people, setPeople] = useState([]);

	const location = useLocation();
	location = { state: { projectId: state.id, projectName: state.name } };

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await axios.get(
					`http://localhost:5000/databases/timereports/?property=Project&id=${projectId}`
				);

				const responsePeople = await axios.get(
					`http://localhost:5000/databases/people`
				);

				//Create a Map of person IDs to names
				const idNameMap = new Map(
					responsePeople.data.map((person) => [person.id, person.name])
				);

				const updatedTimeReports = responseReports.data.map((report) => ({
					...report,
					name: idNameMap.get(report.person),
				}));
				console.log(response.data);
				setTimeReports(updatedTimeReports);
				//setPeople(responsePeople.data);
				console.log(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section>
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />{" "}
					<h4 className="mt-3">Loading...</h4>
				</>
			)}
			<h1 className="text-center mb-5">Timereport</h1>
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
								<td>{item.name}</td>
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
				<Button className="mx-2" style={{ width: "115px" }}>
					Last 7 days
				</Button>
				<Button className="mx-2" style={{ width: "115px" }}>
					Last 30 days
				</Button>
				<Button className="mx-2" style={{ width: "115px" }}>
					Total
				</Button>
			</Container>
		</section>
	);
};
