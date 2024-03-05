import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthProvider";
import { useLoading } from "../../Components/Loading/LoadingProvider";

export default function Login() {
	const [oAuthResponse, setOAuthResponse] = useState(null);
	const location = useLocation();
	const { search } = location;
	const navigate = useNavigate();
	const { loginOAuth, user } = useAuth();
	const { loading, isPageLoading } = useLoading();

	useEffect(() => {
    let tempUser = {};
		const queryDatabaseForUser = async (user) => {
			console.log("OAUTHRESPONSE:", oAuthResponse);
			try {
				const validUser = await axios.post(
					"http://localhost:3001/databases/login/confirmUser",
					{ userEmail: user.email }
				);
				console.log("VALID USER:", validUser);
				if (validUser.data.isValidUser) {
					const userData = {
						...user,
						userRole: validUser.data.userRole,
						target: validUser.data.userRole === "Admin" ? "/admin" : "/user",
					};
					loginOAuth(userData, "OAuth");
				}
			} catch (error) {
				console.error("Error querying database for user:", error.message);
			} finally {
				loading(false);
				if (user && user.target) {
					navigate(user.target);
				} else {
					navigate("/");
				}
			}
		};

		const oAuthLoginHandling = async () => {
			const searchParams = new URLSearchParams(search);
			const code = searchParams.get("code");
			try {
				if (code && !isPageLoading) {
					loading(true);

					const response = await axios.get(
						`http://localhost:3001/login/auth/callback?code=${code}`
					);

					console.log("RESPONSE:", response);
					if (response.status === 200) {
						console.log("RESPONSE:DATA:", response.data);
						setOAuthResponse(response.data);
					} else {
						navigate("/");
					}
				}
			} catch (error) {
				console.error("Error:", error);
			} finally {
				queryDatabaseForUser();
			}
		};
		if (!oAuthResponse && !isPageLoading) {
			oAuthLoginHandling();
		}
	}, [
		user,
		oAuthResponse,
		isPageLoading,
		navigate,
		search,
		loginOAuth,
		loading,
	]);
}
