import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CustomModal from "../../../Components/CustomModal/CustomModal";

export default function EditReportModal({ formInput, setFormInput, closeModal, modalOpen, updateTimereports, setLoading }) {
	const [project, setProject] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://localhost:3001/databases/projects");

				setProject(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleSelectChange = (event) => {
		const selectedProject = project.find((p) => p.id === event.target.value);
		setFormInput({
			...formInput,
			project: selectedProject.id,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			formInput.hours = parseInt(formInput.hours);
			setLoading(true);

			//validation
			if (!formInput.project.trim()) {
				alert("Project is required.");
				return;
			} else if (!formInput.date.trim()) {
				alert("Date is required.");
				return;
			}
			const timereportId = formInput.id;
			const response = await axios.patch(`http://localhost:3001/pages/timeReports/admin/${timereportId}`, formInput);
			updateTimereports();

			setFormInput({
				date: "",
				hours: "",
				note: "",
				project: "",
			});

			closeModal();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CustomModal show={modalOpen} onClose={closeModal}>
			<Form className="neu-form">
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="date">Date:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="date"
						id="date"
						name="date"
						aria-label="date"
						required
						value={formInput.date}
						onChange={handleInputChange}
					/>
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

				<Form.Select className="neu-form-select" name="project" id="project" aria-label="project" required onChange={(e) => handleSelectChange(e)}>
					<option hidden>--Select Project--</option>;
					{project.map((project) => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</Form.Select>
				<Form.Group className="neu-form-group">
					<Form.Label htmlFor="note">Note:</Form.Label>
					<Form.Control
						className="neu-form-controll"
						type="text"
						id="note"
						name="note"
						aria-label="note"
						placeholder="Note"
						required
						value={formInput.note}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<div className="neu-form-2b">
					<button
						type="submit"
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
