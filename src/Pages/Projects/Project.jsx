import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import axios from "axios";
import FormModal from "./FormModal";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const Project = ({ userSignal }) => {
	const [project, setProject] = useState([]);
	const [people, setPeople] = useState([]);
	const [showAllProjects, setShowAllProjects] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const [projectId, setProjectId] = useState("");
	// const [teamMemberAlreadyInProject, setTeamMemberAlreadyInProject] = useState({project: [{id: "",activeMembers: [],},],});
	const [formInput, setFormInput] = useState({
		name: "",
		status: "",
		color: "",
		hours: "",
		startDate: "",
		endDate: "",
		teamMember: [],
	});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://localhost:3001/databases/projects");

				// Sort so Active will always display first
				const sorted = response.data.sort((a, b) => a.status.localeCompare(b.status));
				console.log("Response.data:", response.data);
				// User can only see own projects so we filter to find a match.
				const ownProjects = sorted.filter((project) => project.teamMember.includes(user.id));

				// console.log(ownProjects);
				const peopleResponse = await axios.get("http://localhost:3001/databases/people");
				setPeople(peopleResponse.data);
				// Set the project state if userRole is user
				if (user.userRole === "User") {
					setProject(ownProjects);
				} else {
					setProject(sorted);
					//console.log(sorted);
				}
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
		// console.log(user.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			teamMember: [],
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
			console.log("Project To Edit:", projectToEdit.teamMember);
			setFormInput({
				name: projectToEdit.name,
				status: projectToEdit.status,
				color: projectToEdit.color,
				hours: projectToEdit.hours,
				startDate: projectToEdit.timespan.start,
				endDate: projectToEdit.timespan.end,
				teamMember: projectToEdit.teamMember,
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
		navigate(`/timereports/user`, {
			state: { project, selectedProjectId: idNr },
		});
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
					people={people}
					setPeople={setPeople}
				/>
			)}
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />
					<h4 className="mt-2">Loading...</h4>
				</>
			)}
			{/* <div className="neu-grid my-3 neu-size-100"> */}
			<div className="container my-3">
				{loading && (
					<>
						<Spinner animation="border" variant="primary" />
						<h4 className="mt-2">Loading...</h4>
					</>
				)}

				<Row>
					{filteredProjects.map((item, index) => (
						<React.Fragment key={item.id}>
							{/* Border that's being shown IF ALL projects are shown, separates each project by status (Active, Next, Done) */}
							{index !== 0 && item.status !== filteredProjects[index - 1].status && <hr className="border border-neupurple border-3 opacity-75" />}
							<div className="col-md-6 col-xl-3">
								<ProjectCard
									item={item}
									handleClick={handleClick}
									handleEdit={handleEdit}
									userRole={user.userRole}
									setProjectId={setProjectId}
									handleUserClick={handleUserClick}
									project={project}
								/>
							</div>
						</React.Fragment>
					))}
				</Row>
			</div>
			<div className={`mb-4 ${user.userRole === "Admin" ? "neu-buttons-2b-between" : "neu-buttons-1b "}`}>
				{user.userRole === "Admin" && (
					<button className="neu-button-square" onClick={openModal}>
						<i className="bi bi-plus-circle me-1" />
						Add New
					</button>
				)}

				<button className="neu-button-square" onClick={() => setShowAllProjects(!showAllProjects)}>
					<i className="bi bi-filter me-1" />
					{showAllProjects ? "Show Active" : "Show All"}
				</button>
			</div>
		</>
	);
};

export default Project;
