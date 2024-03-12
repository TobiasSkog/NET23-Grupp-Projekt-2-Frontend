import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/esm/Modal";

export default function EditReportModal({
	formInput,
	setFormInput,
	closeModal,
	modalOpen,
	updateTimereports,
	setLoading,
	timereportName,
}) {
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			formInput.hours = parseInt(formInput.hours);
			setLoading(true);
			let response;
			const timereportId = formInput.id;
			console.log(timereportId);
			response = await axios.patch(
				`http://localhost:3001/pages/timeReports/admin/${timereportId}`,
				formInput
			);
			console.log("Project updated successfully:", response.data);

			updateTimereports();

			setFormInput({
				date: "",
				hours: "",
				note: "",
			});

			closeModal();
		} catch (error) {
			console.log(error);
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
