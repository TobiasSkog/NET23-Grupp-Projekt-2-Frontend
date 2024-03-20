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
				<Form.Text className="title-text-search-date">
					Enter searchdate
				</Form.Text>
			</Container>
			<Container className="mt-2 d-sm-flex justify-content-center">
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

				<button className="neu-button-square mb-3" onClick={handleDateSearch}>
					Search
				</button>
			</Container>
		</div>
	);
}
