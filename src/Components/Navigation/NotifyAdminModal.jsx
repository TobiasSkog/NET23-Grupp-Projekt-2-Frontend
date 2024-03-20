import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import socket from "../Socket/SocketService";
import CustomModal from "../CustomModal/CustomModal";

export default function NotifyAdminModal() {
	const [showModal, setShowModal] = useState(false);
	const [recievedNewNotification, setRecievedNewNotification] = useState(false);
	const [projectData, setProjectData] = useState(null);

	useEffect(() => {
		socket.on("projectOverdue", (data) => {
			setProjectData(data);
			setRecievedNewNotification(true);
		});

		return () => {
			socket.off("projectOverdue");
		};
	}, []);

	const hej = () => {};

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setRecievedNewNotification(false);
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
					title={` ${
						projectData ? (projectData.length === 1 ? projectData.length + " Project" : projectData.length + " Projects") : ""
					} needs your attention`}
					divider>
					<div className="neu-project-link-container">
						{projectData.map((project, index) => (
							<div className="neu-project-link-content" key={index}>
								<span className="project-name" onClick={hej}>
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

// 	Project: {project.name} <br /> has gone {project.hoursLeft * -1} hours over time.
