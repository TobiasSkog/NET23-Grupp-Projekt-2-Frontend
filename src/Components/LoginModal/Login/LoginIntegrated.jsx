import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../UserContext/UserContext";
import { useContext } from "react";
import { AuthContext } from "../../UserContext/Contexts";

export default function LoginIntegrated() {
	const { user, setUser } = useContext(AuthContext);
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
		};
		//target:	databaseUserData.data.userRole === "Admin" ? "/admin"	: databaseUserData.data.userRole === "User"	? "/user"	: "/",
		const amountOfMinutes = 15;
		const expirationTime = new Date(new Date().getTime() + amountOfMinutes * 60 * 1000);
		Cookies.set("auth", JSON.stringify(userData), {
			expires: expirationTime,
		});
		setUser(userData);
		navigate("/projects");
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
