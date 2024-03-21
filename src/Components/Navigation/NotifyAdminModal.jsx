import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import socket from "../Socket/SocketService";
import CustomModal from "../CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NotifyAdminModal() {
	const [showModal, setShowModal] = useState(false);
	const [recievedNewNotification, setRecievedNewNotification] = useState(false);
	const [projectData, setProjectData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		socket.on("projectOverdue", (data) => {
			bakeMeACookie(data);
			setRecievedNewNotification(true);
		});
		return () => {
			socket.off("projectOverdue");
		};
	}, []);

	const bakeMeACookie = (data) => {
		try {
			Cookies.set("adminNotification", JSON.stringify(data), { expires: 0.5 })
			setProjectData(JSON.parse(Cookies.get("adminNotification")));
		} catch (error) {
			console.error("Cookie bad", error);
		}
	};

	const breakTheCookie = (id) => {
		const searchAndDestroy = projectData.findIndex(kill => kill.id === id);
		if (searchAndDestroy !== -1) {
			projectData.splice(searchAndDestroy, 1);
			bakeMeACookie(projectData)
		}
	};

	const handleRedirect = (id, name) => {
		const project = {
			id: id,
			name: name,
		};
		breakTheCookie(project.id);
		handleCloseModal();
		navigate("/timereports/project", { state: project });
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setRecievedNewNotification(projectData.length > 0 ? true : false);
	};

	return (
		<div>
			{recievedNewNotification ? (
				<Button className="neu-nav-notification-new-msg" onClick={handleShowModal}>
					<i className="bi bi-bell-fill" />
				</Button>
			) : (
				<Button className="neu-nav-notification-off" disabled>
					<i className="bi bi-bell" />
				</Button>
			)}
			{projectData && (
				<CustomModal
					show={showModal}
					onClose={handleCloseModal}
					title={` ${projectData ? (projectData.length === 1 ? projectData.length + " Project" : projectData.length + " Projects") : ""
						} needs your attention`}
					divider>
					<div className="neu-project-link-container">
						{projectData.map((project, index) => (
							<div className="neu-project-link-content" key={index}>
								<span className="project-name" onClick={() => handleRedirect(project.id, project.name)}>
									{project.name}
								</span>
								<div className="neu-project-info">
									<p>
										This project has exceeded the allocated time limit by <span className="overage-hours">{project.hoursLeft * -1} hours</span>.
									</p>

									<p> Please review the project details and consider taking appropriate action.</p>
								</div>
							</div>
						))}
					</div>
				</CustomModal>
			)}
		</div>
	);
}