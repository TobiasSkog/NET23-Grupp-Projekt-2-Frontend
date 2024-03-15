import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

export default function Sorting({
	originalTimeReports,
	setTimeReports,
	setSearchDate,
}) {
	//This component is used to filter timereports by last 7days, 30days & show all
	const handleClick7days = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= sevenDaysAgo;
		});
		setTimeReports(filteredReports);
		setSearchDate({ startDate: "", endDate: "" });
	};

	const handleClick30days = () => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= thirtyDaysAgo;
		});
		setTimeReports(filteredReports);
		setSearchDate({ startDate: "", endDate: "" });
	};

	const handleAllClick = () => {
		setTimeReports(originalTimeReports);
		setSearchDate({ startDate: "", endDate: "" });
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
