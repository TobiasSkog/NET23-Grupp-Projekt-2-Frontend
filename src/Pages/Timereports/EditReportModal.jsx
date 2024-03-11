import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/esm/Modal";
import { useEffect, useState } from "react";

export default function EditReportModal({
	formInput,
	setFormInput,
	closeModal,
	modalOpen,
	updateTimereports,
	setLoading,
}) {
	const [project, setProject] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					"http://localhost:3001/databases/projects"
				);

				setProject(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
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

		//console.log(selectedProject.id);
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

			if (!formInput.project.trim()) {
				alert("Project is required.");
				return;
			}

			const timereportId = formInput.id;

			const response = await axios.patch(
				`http://localhost:3001/pages/timeReports/${timereportId}`,
				formInput
			);
			console.log("Project updated successfully:", response.data);

			updateTimereports();

			setFormInput({
				date: "",
				hours: "",
				note: "",
				project: "",
			});

			closeModal();
		} catch (error) {
			console.log("There was a problem with the fetch operation: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Modal.Dialog>
				<Modal show={modalOpen} dialogClassName="modal-md">
					<Form className="bg-dark p-4 rounded">
						<Form.Group>
							<Form.Label htmlFor="date" className="text-light">
								Date:
							</Form.Label>
							<Form.Control
								className="mb-3"
								type="date"
								id="date"
								name="date"
								aria-label="date"
								required
								value={formInput.date}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label htmlFor="hours" className="text-light">
								Hours
							</Form.Label>
							<Form.Control
								type="text"
								id="hours"
								placeholder="Hours"
								className="mb-3 fw-semibold"
								name="hours"
								value={formInput.hours}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Select
							className="mb-3 fw-semibold"
							name="project"
							id="project"
							aria-label="project"
							required
							onChange={(e) => handleSelectChange(e)}>
							<option value="">--Select Project--</option>
							{project.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
						</Form.Select>

						<Form.Group>
							<Form.Label htmlFor="note" className="text-light">
								Note
							</Form.Label>
							<Form.Control
								className="mb-4 fw-semibold"
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

						<Button
							type="submit"
							className="w-100 mb-4"
							onClick={(e) => {
								handleSubmit(e);
								closeModal();
							}}>
							Submit
						</Button>
						<Button
							type="button"
							className="w-100 btn-secondary"
							onClick={closeModal}>
							Cancel
						</Button>
					</Form>
				</Modal>
			</Modal.Dialog>
		</Container>
	);
}
