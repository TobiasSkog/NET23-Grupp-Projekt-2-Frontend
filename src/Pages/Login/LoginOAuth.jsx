import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthProvider";

export default function Login() {
	const location = useLocation();
	const { search } = location;
	const navigate = useNavigate();
	const { loginOAuth, user } = useAuth();

	useEffect(() => {
		const queryDatabaseForUser = async (authData) => {
			try {
				console.log(11);
				console.log("authData:", authData);
				const validUser = await axios.post(
					"http://localhost:3001/databases/login/confirmUser",
					{ userEmail: authData.email }
				);
				console.log(12);
				console.log("VALID USER:", validUser);
				if (validUser.data.isValidUser) {
					const userData = {
						...authData,
						userRole: validUser.data.userRole,
						target:
							validUser.data.userRole === "Admin"
								? "/admin"
								: validUser.data.userRole === "User"
								? "/user"
								: "/",
					};

					loginOAuth(userData, "OAuth");

					if (userData.target) {
						console.log(16);
						console.log(userData.target);
						navigate(userData.target);
					} else {
						navigate("/");
					}
				}
			} catch (error) {
				console.error("Error querying database for user:", error.message);
			}
		};

		const oAuthLoginHandling = async () => {
			console.log(4);
			const searchParams = new URLSearchParams(search);
			const code = searchParams.get("code");
			console.log(5);
			try {
				if (code) {
					console.log(6);
					console.log(7);
					const response = await axios.get(
						`http://localhost:3001/login/auth/callback?code=${code}`
					);
					console.log(8);
					console.log("RESPONSE:", response);
					if (response.status === 200) {
						console.log(9);
						console.log("RESPONSE.DATA:", response.data);
						queryDatabaseForUser(response.data);
					} else {
						console.log(10);
						navigate("/");
					}
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};
		console.log(1);
		if (!user) {
			console.log(2);
			oAuthLoginHandling();
		}
	}, [user, loginOAuth, navigate, search]);
}
