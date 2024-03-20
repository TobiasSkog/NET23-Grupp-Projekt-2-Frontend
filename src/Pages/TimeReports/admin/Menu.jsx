import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import CustomModal from "../../../Components/CustomModal/CustomModal";

export default function Menu({ project, setProjectOption, people, setPeopleOption, setShowMenu, setShowProject }) {
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
		<CustomModal show={true} alwaysOpen>
			<Form className="neu-form">
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="project">View Based of Project</Form.Label>
					<Form.Select
						className="neu-form-select"
						name="project"
						id="project"
						aria-label="project"
						required
						disabled={selectedOption === "person"}
						onChange={(e) => {
							const selectedProject = project.find((p) => p.id === e.target.value);
							setProjectOption(selectedProject);
							setSelectedOption("project");
							setShowProject(true);
						}}>
						<option hidden>Select Project</option>
						{project.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</Form.Select>
					<Form.Label htmlFor="person">View Based of Person</Form.Label>
					<Form.Select
						className="neu-form-select"
						name="person"
						id="person"
						aria-label="person"
						required
						disabled={selectedOption === "project"}
						onChange={(e) => {
							const selectedPerson = people.find((p) => p.id === e.target.value);
							setPeopleOption(selectedPerson);
							setSelectedOption("person");
							setShowProject(false);
						}}>
						<option hidden>Select Person</option>
						{people.map((person) => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<button className="neu-button-square neu-size-100" onClick={handleButtonClick}>
					View Report
				</button>
			</Form>
		</CustomModal>
	);
}
