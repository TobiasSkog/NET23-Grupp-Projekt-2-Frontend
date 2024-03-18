import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import socket from "../Socket/SocketService";

export default function NotifyAdminModal() {
	const [showModal, setShowModal] = useState(false);
	const [conditionMet, setConditionMet] = useState(true);
	const [projectData, setProjectData] = useState(null);

	useEffect(() => {
		socket.on("projectOverdue", (data) => {
			setProjectData(data);
			setConditionMet(true);
		});

		return () => {
			socket.off("projectOverdue");
		};
	}, []);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setConditionMet(false);
	};

	return (
		<div>
			{conditionMet ? (
				<Button className="neu-nav-notification-new-msg" onClick={handleShowModal}>
					<i class="bi bi-bell-fill" />
				</Button>
			) : (
				<Button className="neu-nav-notification-off" disabled>
					<i class="bi bi-bell" />
				</Button>
			)}

			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Notification</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{projectData &&
						projectData.map((project, index) => (
							<p key={index}>
								{project.name} has {project.hoursLeft} hours left
							</p>
						))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">Go to project</Button>
					<Button variant="secondary" onClick={handleCloseModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
