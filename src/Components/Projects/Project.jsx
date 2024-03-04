import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import FormModal from "./FormModal";
import Spinner from "react-bootstrap/Spinner";

const Project = () => {
	const [project, setProject] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const [projectId, setProjectId] = useState("");
	const [formInput, setFormInput] = useState({
		name: "",
		status: "",
		color: "",
		hours: "",
		startDate: "",
		endDate: "",
	});

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					"http://localhost:3001/databases/projects"
				);

				setProject(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const updateProjects = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:3001/databases/projects"
			);
			//console.log(response.data);
			setProject(response.data);
		} catch (error) {
			console.error("There was a problem updating projects:", error);
		} finally {
			setLoading(false);
		}
	};
	const getActiveProjects = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:3001/databases/projects?status=Active"
			);
			setProject(response.data);
		} catch (error) {
			console.error("There was a problem updating active projects:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (projectId) => {
		const projectToEdit = project.find((item) => item.id === projectId);
		if (projectToEdit) {
			setFormInput({
				name: projectToEdit.name,
				status: projectToEdit.status,
				color: projectToEdit.color,
				hours: projectToEdit.hours,
				startDate: projectToEdit.timespan.start,
				endDate: projectToEdit.timespan.end,
				//image: projectToEdit.image,
			});
		}
		//console.log(projectId);
		//console.log(projectToEdit);
		closeModal();
		setEdit(true);
		openModal(); // Open the modal for editing
	};

	return (
		<>
			{modalOpen && (
				<FormModal
					formInput={formInput}
					setFormInput={setFormInput}
					closeModal={closeModal}
					modalOpen={modalOpen}
					updateProjects={updateProjects}
					edit={edit}
					setEdit={setEdit}
					projectId={projectId}
					setLoading={setLoading}
				/>
			)}
			<div className="show-container container">
				{loading && (
					<>
						<Spinner animation="border" variant="primary" />{" "}
						<h4 className="mt-2">Loading...</h4>
					</>
				)}
				<div className="row justify-content-center">
					<Row>
						{project.map((item) => (
							<Col
								key={item.id}
								className="show-col mx-2 mb-2 mx-auto"
								sm={6}
								md={6}
								lg={3}>
								<Card bg="dark" text="light" className="show-card">
									<Card.Img variant="top" src={item.image} />
									<Card.Body>
										<Card.Title>{item.name}</Card.Title>
										<Card.Text>
											<strong
												className="badge"
												style={{ backgroundColor: item.color }}>
												{item.status}
											</strong>
											<br />
											Hours: {item.hours} <br />
											Worked Hours: {item.workedHours} <br />
											Hours Left: {item.hoursLeft} <br />
											Timespan:
											<br />
											<span className="show-timespan">
												{item.timespan.start} - {item.timespan.end}
											</span>
										</Card.Text>
										<Button className="btn btn-primary m-2">Time Report</Button>
										<Button
											className="btn btn-danger m-2"
											onClick={() => {
												handleEdit(item.id);
												setProjectId(item.id);
											}}>
											Edit
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
				<div className="mb-4 mx-3">
					<Button variants="primary" className="mt-4 mx-3" onClick={openModal}>
						<i className="bi bi-plus-circle me-2"></i>Add New Project
					</Button>

					<Button
						variants="primary"
						className="mt-4 mx-4"
						onClick={() => updateProjects()}>
						<i className="bi bi-filter"></i> See All Projects
					</Button>
					<Button
						variants="primary"
						className="mt-4 mx-4"
						onClick={() => getActiveProjects()}>
						<i className="bi bi-filter"></i> See Active Projects
					</Button>
				</div>
			</div>
		</>
	);
};

export default Project;
