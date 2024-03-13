import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/esm/Modal";

export default function FormModal({
	formInput,
	setFormInput,
	closeModal,
	modalOpen,
	updateProjects,
	edit,
	setEdit,
	projectId,
	setLoading,
}) {
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			formInput.hours = parseInt(formInput.hours);
			setLoading(true);
			let response;

			//validation for Edit and create new projects
			if (!formInput.status.trim()) {
				alert("Status is required.");
				return;
			} else if (!formInput.startDate.trim()) {
				alert("Startdate is required");
				return;
			} else if (!formInput.endDate.trim()) {
				alert("Enddate is required");
				return;
			}

			if (edit) {
				// If in editing mode, update existing project

				response = await axios.patch(
					`http://localhost:3001/pages/projects/${projectId}`,
					formInput
				);
				console.log("Project updated successfully:", response.data);
			} else {
				// If not in editing mode, create a new project
				console.log(formInput);
				response = await axios.post(
					"http://localhost:3001/pages/projects",
					formInput
				);
				console.log("New project created successfully:", response.data);
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

	return (
		<div className="container">
			<Modal.Dialog>
				<Modal show={modalOpen} dialogClassName="modal-md">
					<Form className="bg-dark p-4 rounded">
						<Form.Group>
							<Form.Label htmlFor="name" className="text-light">
								Name
							</Form.Label>
							<Form.Control
								className="mb-4 fw-semibold"
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
						<Form.Select
							className="mb-3 fw-semibold"
							name="status"
							id="status"
							aria-label="status"
							required
							value={formInput.status}
							onChange={handleSelectChange}>
							<option className="">Select Status</option>
							<option>Active</option>
							<option>Next up</option>
							<option>Done</option>
						</Form.Select>
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

						<Form.Group>
							<Form.Label htmlFor="startDate" className="text-light">
								Start Date:
							</Form.Label>
							<Form.Control
								className="mb-3"
								type="date"
								id="startDate"
								name="startDate"
								aria-label="startDate"
								required
								value={formInput.startDate}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="endDate" className="text-light">
								End Date:
							</Form.Label>
							<Form.Control
								className="mb-5"
								type="date"
								id="endDate"
								name="endDate"
								aria-label="endDate"
								required
								min={formInput.startDate}
								value={formInput.endDate}
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
		</div>
	);
}
