import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Menu({
	project,
	setProjectOption,
	people,
	setPeopleOption,
	setShowMenu,
	setShowProject,
}) {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleButtonClick = () => {
		if (!selectedOption) {
			alert("You must make a selection");
		} else {
			setShowMenu(false);
		}
	};

	return (
		<section className="mt-5">
			<div className=" container p-3">
				<form className="form p-2 shadow w-25 rounded bg-dark">
					<label htmlFor="project" className="me-2 mb-2 text-white">
						Select Project
					</label>
					<select
						className="mb-2"
						type="text"
						id="project"
						required
						onChange={(e) => {
							const selectedProject = project.find(
								(p) => p.id === e.target.value
							);
							setProjectOption(selectedProject);
							setSelectedOption("project");
							setShowProject(true);
						}}
						disabled={selectedOption === "person"}>
						<option value="">--Select Project--</option>;
						{project.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
						;
					</select>
					<br></br>
					<p className="text-white text-center">------or------</p>
					<label htmlFor="person" className="me-2 mb-2 text-white">
						Select person
					</label>
					<select
						className="mb-2"
						type="text"
						id="person"
						onChange={(e) => {
							const selectedPerson = people.find(
								(p) => p.id === e.target.value
							);
							setPeopleOption(selectedPerson);
							setSelectedOption("person");
							setShowProject(false);
						}}
						disabled={selectedOption === "project"}>
						<option value="">--Select Person--</option>
						{people.map((person) => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</select>
					<Button
						type="button"
						variant="primary"
						className="w-100"
						onClick={handleButtonClick}>
						View Report
					</Button>
				</form>
			</div>
		</section>
	);
}
