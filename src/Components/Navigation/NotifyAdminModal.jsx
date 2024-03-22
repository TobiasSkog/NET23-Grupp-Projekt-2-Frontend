import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import socket from "../Socket/SocketService";
import CustomModal from "../CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { createAdminNotificationData, updateAdminNotificationData } from "../CustomSignals/UserSignal";

export default function NotifyAdminModal({ adminNotificationData }) {
	const [showModal, setShowModal] = useState(false);
	const [recievedNewNotification, setRecievedNewNotification] = useState(false);
	const [projectData, setProjectData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (adminNotificationData && adminNotificationData.length > 0) {
			setProjectData(adminNotificationData);
			setRecievedNewNotification(true);
		}

		socket.on("projectOverdue", (data) => {
			setProjectData(createAdminNotificationData(data));
			setRecievedNewNotification(true);
		});
		return () => {
			socket.off("projectOverdue");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRedirect = (id, name) => {
		const project = {
			id: id,
			name: name,
		};
		updateAdminNotificationData(project.id, projectData);
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
					title={` ${
						projectData ? (projectData.length === 1 ? projectData.length + " Project" : projectData.length + " Projects") : ""
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
								</div>
							</div>
						))}
					</div>
					<div className="neu-notification-reminder">
						<p> Please review the project details.</p>
					</div>
				</CustomModal>
			)}
		</div>
	);
}
