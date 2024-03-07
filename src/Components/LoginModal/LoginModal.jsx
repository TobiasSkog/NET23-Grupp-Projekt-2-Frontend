import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import LoginIntegrated from "./Login/LoginIntegrated";
import LoginOAuthButton from "./Login/LoginOAuthButton";
//import NotionImg from '../../Assets/Notion-Logo.png'

const LoginModal = ({ show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title className="w-100 text-center">Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<LoginIntegrated />
				<div className="text-center mt-3">
					Or Login Using Your Notion Account:
				</div>
				<LoginOAuthButton />
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
