import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
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
		<Container className="mt-2 mb-3 col-md-8 col-lg-6">
			<Container>
				<Form.Text className="title-text-search-date">
					Enter searchdate
				</Form.Text>
			</Container>
			<Container className="mt-2 d-md-flex justify-content-start">
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
					className="mb-3 me-2 neu-form-select"
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
					type="button"
					className="mb-3 me-2 ms-auto neu-button-square"
					onClick={handleDateSearch}>
					Search
				</button>
			</Container>
		</Container>
	);
}
