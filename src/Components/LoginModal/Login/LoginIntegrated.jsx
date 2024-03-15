import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function LoginIntegrated({ userLoggedIn, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const authUserDatabase = async () => {
		const databaseUserData = await axios.post("http://localhost:3001/databases/people/login/integratedUser", {
			userEmail: email,
			userPassword: password,
		});
		if (!databaseUserData.data.isValidUser) {
			return false;
		}
		const userData = {
			id: databaseUserData.data.id,
			name: databaseUserData.data.name,
			userRole: databaseUserData.data.userRole,
			email: email,
		};

		userLoggedIn(userData);
		navigate("/projects");
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const isAuthenticated = authUserDatabase();
		handleClose();
		if (!isAuthenticated) {
			navigate("/");
		}
	};

	return (
		<Form>
			<Form.Group controlId="loginFormEmail" className="mb-3">
				<Form.Label>Email</Form.Label>

				<Form.Control type="email" className="neu-login" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} required />
			</Form.Group>
			<Form.Group controlId="loginFormPassword" className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					className="neu-login"
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Button type="submit" className="d-block w-100 mb-3 neu-button-square" onClick={handleLogin}>
				Login
			</Button>
		</Form>
	);
}
