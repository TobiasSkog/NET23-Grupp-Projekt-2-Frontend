import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

export default function Sorting({ originalTimeReports, setTimeReports }) {
	const handleClick7days = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= sevenDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleClick30days = () => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= thirtyDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleAllClick = () => {
		setTimeReports(originalTimeReports);
	};

	return (
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
				All
			</Button>
		</Container>
	);
}
