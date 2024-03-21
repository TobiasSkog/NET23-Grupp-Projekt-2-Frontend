import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CustomModal from "../../Components/CustomModal/CustomModal";

export default function FormModal({ formInput, setFormInput, closeModal, modalOpen, updateProjects, edit, setEdit, projectId, setLoading, people }) {
	const [teamMemberAlreadyInProject, setTeamMemberAlreadyInProject] = useState([]);
	useEffect(() => {
		const initialTeamMembers = people.filter((person) => formInput.teamMember.includes(person.id)).map((person) => person.id);

		setTeamMemberAlreadyInProject([{ id: projectId, activeMembers: initialTeamMembers }]);
	}, [people, formInput.teamMember, projectId]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			formInput.hours = parseInt(formInput.hours);
			setLoading(true);
			let response;

			//validation for Edit and create new projects
			if (!formInput.status.trim()) {
				alert("Please set a Status for the project.");
				return;
			} else if (!formInput.startDate.trim()) {
				alert("Please provide a Startdate for the project.");
				return;
			} else if (!formInput.endDate.trim()) {
				alert("Please provide an Enddate for the project.");
				return;
			} else if (formInput.teamMember.length === 0) {
				alert("Please select at least one team member.");
				return;
			}

			if (edit) {
				// If in editing mode, update existing project

				response = await axios.patch(`http://localhost:3001/pages/projects/${projectId}`, formInput);
				//console.log("Project updated successfully:", response.data);
			} else {
				// If not in editing mode, create a new project
				console.log(formInput);
				response = await axios.post("http://localhost:3001/pages/projects", formInput);
				//console.log(formInput);
				//console.log("New project created successfully:", response.data);
			}

			updateProjects();

			closeModal();
			setEdit(false);
		} catch (error) {
			console.error("Error sending data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleSelectChange = (event) => {
		const { name, value } = event.target;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleTeamMemberSelectChange = (event) => {

		const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
		setFormInput({
			...formInput,
			teamMember: selectedIds,
		});
		setTeamMemberAlreadyInProject([
			{
				id: projectId,
				activeMembers: selectedIds,
			},
		]);
	};

	return (
		<CustomModal show={modalOpen} onClose={closeModal}>
			<Form className="neu-form">
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="name">Name:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="text"
						id="name"
						name="name"
						aria-label="name"
						placeholder="Name"
						required
						value={formInput.name}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="status">Project Status:</Form.Label>
					<Form.Select
						className="neu-form-select"
						name="status"
						id="status"
						aria-label="status"
						required
						value={formInput.status}
						onChange={handleSelectChange}>
						<option hidden>Select Status</option>
						<option>Active</option>
						<option>Next up</option>
						<option>Done</option>
						<option>Paused</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="hours">Hours:</Form.Label>
					<Form.Control
						type="text"
						id="hours"
						placeholder="Hours"
						className="neu-form-controll"
						name="hours"
						value={formInput.hours}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="teamMembers">Select Team-Members:</Form.Label>
					<select
						className="neu-form-select"
						name="teamMembers"
						id="teamMembers"
						aria-label="teamMembers"
						multiple
						size={people.length + 1 >= 5 ? 5 : people.length + 1}
						value={formInput.teamMember}
						onChange={handleTeamMemberSelectChange}>
						{people.map((person) => {
							const isSelected = formInput.teamMember.includes(person.id);
							const isActiveInProject = teamMemberAlreadyInProject.find((project) => project.id === projectId)?.activeMembers.includes(person.id);
							teamMemberAlreadyInProject.forEach((proj) => console.log("bur:", proj));
							const className = `${isSelected ? "neu-selected" : "neu-not-selected"} ${
								isActiveInProject ? "neu-part-of-project" : "neu-not-part-of-project"
							}`;
							return (
								<option key={person.id} value={person.id} className={className}>

									{person.name}
								</option>
							);
						})}
					</select>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="startDate">Start Date:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="date"
						id="startDate"
						name="startDate"
						aria-label="startDate"
						required
						value={formInput.startDate}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="endDate">End Date:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="date"
						id="endDate"
						name="endDate"
						aria-label="endDate"
						min={formInput.startDate}
						value={formInput.endDate}
						onChange={handleInputChange}
						required
					/>
				</Form.Group>
				<div className="neu-form-2b">
					<button
						className="neu-button-square neu-max-400"
						onClick={(e) => {
							handleSubmit(e);
							closeModal();
						}}>
						Submit
					</button>
					<button className="neu-button-square neu-max-400" onClick={closeModal}>
						Cancel
					</button>
				</div>
			</Form>
		</CustomModal>
	);
}
