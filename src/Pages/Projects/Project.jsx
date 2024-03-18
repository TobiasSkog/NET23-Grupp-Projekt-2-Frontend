import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormModal from "./FormModal";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const Project = ({ userSignal }) => {
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
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://localhost:3001/databases/projects");

				// Sort so Active will always display first
				const sorted = response.data.sort((a, b) => a.status.localeCompare(b.status));
				setProject(sorted);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const navigate = useNavigate();

	const user = userSignal.value;
	if (!user) {
		navigate("/");
		return null;
	}

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
		});
	};

	const updateProjects = async () => {
		try {
			setLoading(true);

			const response = await axios.get("http://localhost:3001/databases/projects");

			// sort so Active will always display first
			const sorted = response.data.sort((a, b) => a.status.localeCompare(b.status));

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
			});
		}

		setEdit(true);
		openModal();
	};

	//In usermode - when user clicks projectcard
	const handleUserClick = (idNr, name) => {
		const project = {
			id: idNr,
			name: name,
		};
		navigate(`/timereports/user`, { state: { project, selectedProjectId: idNr } });
	};

	//in Adminmode when user clicks projectcard
	const handleClick = (idNr, name) => {
		const project = {
			name: name,
			id: idNr,
		};

		navigate(`/timereports/project`, { state: project });
	};

	const filteredProjects = showAllProjects ? project : project.filter((project) => project.status === "Active");
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
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />
					<h4 className="mt-2">Loading...</h4>
				</>
			)}

			<div className="neu-grid">
				{filteredProjects.map((item, index) => (
					<React.Fragment key={item.id}>
						{/* Border that's being shown IF ALL projects are shown, separates each project by status (Active, Next, Done) */}
						{index !== 0 && item.status !== filteredProjects[index - 1].status && <hr className="border border-neuorange border-3 opacity-75" />}

						<ProjectCard
							item={item}
							handleClick={handleClick}
							handleEdit={handleEdit}
							userRole={user.userRole}
							setProjectId={setProjectId}
							handleUserClick={handleUserClick}
						/>
					</React.Fragment>
				))}
			</div>

			<div className={`${user.userRole === "Admin" ? "neu-buttons-2b-between" : "neu-buttons-1b"}`}>
				{user.userRole === "Admin" && (
					<Button className="neu-button-square " onClick={openModal}>
						<i className="bi bi-plus-circle" />
						Add New
					</Button>
				)}

				<Button className="neu-button-square" onClick={() => setShowAllProjects(!showAllProjects)}>
					<i className="bi bi-filter" />
					{showAllProjects ? "Show Active" : "Show All"}
				</Button>
			</div>
		</>
	);
};

export default Project;
//minmax(20%, 80%)
