import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";

export default function LoginIntegrated({ userLoggedIn, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successfullLogin, setSuccessfullLogin] = useState(true);
	const [loginButtonPressed, setLoginButtonPressed] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginButtonPressed(true);
		// const databaseUserData = await axios.post("http://localhost:3001/databases/people/login/integratedUser", {
		const databaseUserData = await axios.post("http://127.0.0.1:3001/databases/people/login/integratedUser", {
			userEmail: email,
			userPassword: password,
		});

		if (!databaseUserData.data.isValidUser) {
			setSuccessfullLogin(false);
			return;
		}

		const userData = {
			id: databaseUserData.data.id,
			name: databaseUserData.data.name,
			userRole: databaseUserData.data.userRole,
			email: email,
		};

		userLoggedIn(userData);
		handleClose();
		setSuccessfullLogin(true);
		setLoginButtonPressed(false);
		navigate("/projects");
	};

	return (
		<Form className="neu-form">
			<Form.Group controlId="loginFormEmail" className="neu-form-group">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					className={`neu-form-controll ${loginButtonPressed && !successfullLogin ? "neu-error-border" : ""}`}
					placeholder="Enter your email address"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId="loginFormPassword" className="neu-form-group">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					className={`neu-form-controll ${loginButtonPressed && !successfullLogin ? "neu-error-border" : ""}`}
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<button type="submit" className="neu-button-square neu-size-100 mb-3" onClick={handleLogin}>
				Login
			</button>
		</Form>
	);
}
