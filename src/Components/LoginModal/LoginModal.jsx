import React from "react";
import { Modal } from "react-bootstrap";
import LoginIntegrated from "./Login/LoginIntegrated";
import LoginOAuthButton from "./Login/LoginOAuthButton";

const LoginModal = ({ show, handleClose, userLoggedIn }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title className="w-100 text-center">Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<LoginIntegrated userLoggedIn={userLoggedIn} />
				<div className="text-center mt-3">Or Login Using Your Notion Account:</div>
				<LoginOAuthButton />
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
