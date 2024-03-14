import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

export default function Menu({
	project,
	setProjectOption,
	people,
	setPeopleOption,
	setShowMenu,
	setShowProject,
}) {
	//Menu component when clicking Timereports in navbar
	const [selectedOption, setSelectedOption] = useState(null);

	const handleButtonClick = () => {
		if (!selectedOption) {
			alert("You must make a selection");
		} else {
			setShowMenu(false);
		}
	};

	return (
		<Container className="p-3 mt-5">
			<Form className="p-2 shadow w-25 rounded bg-dark">
				<Form.Group>
					<Form.Select
						className="mb-2 fw-semibold"
						name="project"
						id="project"
						aria-label="project"
						required
						disabled={selectedOption === "person"}
						onChange={(e) => {
							const selectedProject = project.find(
								(p) => p.id === e.target.value
							);
							setProjectOption(selectedProject);
							setSelectedOption("project");
							setShowProject(true);
						}}>
						<option value="">--Select Project--</option>
						{project.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</Form.Select>

					<Form.Text className="text-white ms-2">---OR---</Form.Text>

					<Form.Select
						className="mb-3 mt-2 fw-semibold"
						name="person"
						id="person"
						aria-label="person"
						required
						disabled={selectedOption === "project"}
						onChange={(e) => {
							const selectedPerson = people.find(
								(p) => p.id === e.target.value
							);
							setPeopleOption(selectedPerson);
							setSelectedOption("person");
							setShowProject(false);
						}}>
						<option value="">--Select Person--</option>
						{people.map((person) => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Button
					type="button"
					variant="primary"
					className="w-100"
					onClick={handleButtonClick}>
					View Report
				</Button>
			</Form>
		</Container>
	);
}
