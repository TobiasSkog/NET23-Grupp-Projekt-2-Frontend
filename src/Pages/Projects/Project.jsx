import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import FormModal from "./FormModal";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ProjectCard from "./ProjectCard";

const Project = () => {
	const [project, setProject] = useState([]);
	const [showAllProjects, setShowAllProjects] = useState(false);
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
		image: "",
	});

	const isAuthenticated = !!Cookies.get("auth");
	let user = null;
	if (isAuthenticated) {
		user = JSON.parse(Cookies.get("auth"));
	}

	const userRole = user.userRole;
	const navigate = useNavigate();
	//console.log(userRole);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setFormInput({
			name: "",
			status: "",
			color: "",
			hours: "",
			startDate: "",
			endDate: "",
			image: "",
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					"http://localhost:3001/databases/projects"
				);

				// sort so Active will always display first
				const sorted = response.data.sort((a, b) =>
					a.status.localeCompare(b.status)
				);
				setProject(sorted);
				console.log(sorted);
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

			// sort so Active will always display first
			const sorted = response.data.sort((a, b) =>
				a.status.localeCompare(b.status)
			);

			setProject(sorted);
		} catch (error) {
			console.error("There was a problem updating projects:", error);
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
				image: projectToEdit.image,
			});
		}

		setEdit(true);
		openModal();
	};

	const handleClick = (idNr, name) => {
		//passing ProjectId & projectName to path:/timereport where we can use use id to fetch report
		//and use name to display inside component
		const project = {
			name: name,
			id: idNr,
		};
		//console.log(project.name, project.id);

		navigate(`/timereports/project`, { state: project });
	};

	const filteredProjects = showAllProjects
		? project
		: project.filter((project) => project.status === "Active");

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
			<div className="show-container container mt-4">
				{loading && (
					<>
						<Spinner animation="border" variant="primary" />
						<h4 className="mt-2">Loading...</h4>
					</>
				)}

				<Row>
					{filteredProjects.map((item) =>
						item.status === "Active" ? (
							<Col
								key={item.id}
								className="show-col mx-2 mb-2 mx-auto"
								sm={6}
								lg={3}>
								<ProjectCard
									item={item}
									handleClick={handleClick}
									handleEdit={handleEdit}
									userRole={userRole}
									setProjectId={setProjectId}
								/>
							</Col>
						) : (
							<React.Fragment key={item.id + "-inactive"}>
								<hr className="border border-primary border-3 opacity-75"></hr>
								<Col
									key={item.id}
									className="show-col mx-2 mb-2 mx-auto"
									sm={6}
									lg={3}>
									<ProjectCard
										item={item}
										handleClick={handleClick}
										handleEdit={handleEdit}
										userRole={userRole}
										setProjectId={setProjectId}
									/>
								</Col>
							</React.Fragment>
						)
					)}
				</Row>

				<div className="mb-4">
					{userRole === "Admin" && (
						<Button
							variants="primary"
							className="mt-4 mx-3"
							onClick={openModal}>
							<i className="bi bi-plus-circle me-2"></i>Add New Project
						</Button>
					)}

					<Button
						variants="primary"
						className="mt-4 mx-4"
						onClick={() => setShowAllProjects(!showAllProjects)}>
						{showAllProjects ? (
							<>
								<i className="bi bi-filter"></i> Active Projects
							</>
						) : (
							<>
								<i className="bi bi-filter"></i> Show All Projects
							</>
						)}
					</Button>
				</div>
			</div>
		</>
	);
};

export default Project;
