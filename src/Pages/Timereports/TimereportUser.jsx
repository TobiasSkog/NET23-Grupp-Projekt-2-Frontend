import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function TimereportUser() {
	const [loading, setLoading] = useState(false);
	const [timeReports, setTimeReports] = useState([]);

	const location = useLocation();
	const { state } = location;
	const personId = state.id;
	const name = state.name;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await axios.get(
					`http://localhost:3001/databases/timereports/filter/people?property=Person&id=${personId}`
				);

				setTimeReports(response.data);
				//console.log(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	//Sum all hours to a Total - render in tfoot
	const totalHours = timeReports.reduce((total, item) => total + item.hours, 0);

	return (
		<section>
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />{" "}
					<h4 className="mt-3">Loading...</h4>
				</>
			)}
			<h1 className="text-center mb-5">Timereports for {name}</h1>
			<Container className="table-responsive">
				<Table className=" table table-dark table-striped table-bordered table-hover">
					<thead>
						<tr className="text-center">
							<th>#</th>
							<th>Date</th>
							<th>Hours</th>
							<th>Project</th>
							<th>Note</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{timeReports.map((item, index) => (
							<tr key={item.id} className="text-center">
								<td>{index + 1}</td>
								<td>{item.date}</td>
								<td>{item.hours}</td>
								<td>{item.projectName}</td>
								<td>{item.note}</td>
								<td>{name}</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<th scope="row" className="text-center">
								Sum
							</th>
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
			<Container className="">
				<Button className="mx-2 my-2" style={{ width: "115px" }}>
					Last 7 days
				</Button>
				<Button className="mx-2 my-2" style={{ width: "115px" }}>
					Last 30 days
				</Button>
				<Button className="mx-2 my-2" style={{ width: "115px" }}>
					Total
				</Button>
			</Container>
		</section>
	);
}
