import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function LoginIntegrated() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const authUserDatabase = async () => {
		const dataUser = await axios.post("http://localhost:3001/databases/people/login/integratedUser", {
			userEmail: email,
			userPassword: password,
		});
		if (!dataUser.data.isValidUser) {
			return false;
		}
		const userData = {
			id: dataUser.data.id,
			name: dataUser.data.name,
			userRole: dataUser.data.userRole,
			target: dataUser.data.userRole === "Admin" ? "/admin" : dataUser.data.userRole === "User" ? "/user" : "/",
		};
		const amountOfMinutes = 15;
		const expirationTime = new Date(new Date().getTime() + amountOfMinutes * 60 * 1000);
		Cookies.set("auth", JSON.stringify(userData), {
			expires: expirationTime,
		});
		navigate(userData.target);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const isAuthenticated = authUserDatabase();
		if (!isAuthenticated) {
			navigate("/");
		}
	};

	return (
		<Form>
			<Form.Group controlId="loginFormEmail" className="mb-3">
				<Form.Label>Email</Form.Label>

				<Form.Control type="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} required />
			</Form.Group>
			<Form.Group controlId="loginFormPassword" className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
			</Form.Group>
			<Button variant="dark" type="submit" className="d-block w-100 mt-3" onClick={handleLogin}>
				Login
			</Button>
		</Form>
	);
}
