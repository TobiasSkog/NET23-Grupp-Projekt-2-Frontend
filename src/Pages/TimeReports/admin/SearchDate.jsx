import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

export default function SearchDate({
	setTimeReports,
	originalTimeReports,
	searchDate,
	setSearchDate,
}) {
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		//console.log(name, value);
		setSearchDate({
			...searchDate,
			[name]: value,
		});
	};

	const handleDateSearch = () => {
		const start = searchDate.startDate;
		const end = searchDate.endDate;

		const filteredDate = originalTimeReports.filter(
			(report) => report.date >= start && report.date <= end
		);
		setTimeReports(filteredDate);
	};

	return (
		<div>
			<Container>
				<Form.Text className="title-text-search-date ms-3 mb-2">
					Enter searchdate
				</Form.Text>
			</Container>
			<Container className="d-flex flex-column flex-sm-row justify-content-center align-items-center w-100">
				<Form.Control
					className="mb-3 me-2 neu-form-select"
					type="date"
					id="startDate"
					name="startDate"
					aria-label="startDate"
					required
					value={searchDate.startDate}
					onChange={handleInputChange}
				/>

				<Form.Control
					className="mb-3 me-4 neu-form-select"
					type="date"
					id="endDate"
					name="endDate"
					aria-label="endDate"
					required
					min={searchDate.startDate}
					value={searchDate.endDate}
					onChange={handleInputChange}
				/>

				<button
					className="neu-button-square w-100 ms-2 me-2 mb-2 center"
					onClick={handleDateSearch}>
					Search
				</button>
			</Container>
		</div>
	);
}
