import React from "react";
import LoginIntegrated from "./Login/LoginIntegrated";
import LoginOAuthButton from "./Login/LoginOAuthButton";
import CustomModal from "../CustomModal/CustomModal";

// export function LoginModal({ show, handleClose, userLoggedIn, setShowLogin }) {
// 	return (
// 		<Modal show={show} onHide={handleClose} dialogClassName="neu-modal" backdrop={false}>
// 			<Modal.Header closeButton>
// 				<Modal.Title>Login</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<LoginIntegrated userLoggedIn={userLoggedIn} setShowLogin={setShowLogin} />
// 				<div>Or Login Using Your Notion Account:</div>
// 				<LoginOAuthButton />
// 			</Modal.Body>
// 		</Modal>
// 	);
// }
// show={showModal} handleClose={handleCloseModal} userLoggedIn={userLoggedIn}
export default function LoginModal({ show, handleClose, userLoggedIn }) {
	return (
		<CustomModal show={show} onClose={handleClose} title="Login" divider>
			<LoginIntegrated userLoggedIn={userLoggedIn} handleClose={handleClose} />
			<p>Or Login Using Your Notion Account:</p>
			<LoginOAuthButton />
		</CustomModal>
	);
}
