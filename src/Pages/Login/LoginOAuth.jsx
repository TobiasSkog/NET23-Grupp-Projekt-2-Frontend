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
				const validUser = await axios.post(
					"http://localhost:3001/databases/login/confirmUser",
					{ userEmail: authData.email }
				);
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
			const searchParams = new URLSearchParams(search);
			const code = searchParams.get("code");
			try {
				if (code) {
					const response = await axios.get(
						`http://localhost:3001/login/auth/callback?code=${code}`
					);
					if (response.status === 200) {
						queryDatabaseForUser(response.data);
					} else {
						navigate("/");
					}
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};
		console.log(1);
		if (!user) {
			oAuthLoginHandling();
		}
	}, [user, loginOAuth, navigate, search]);
}
