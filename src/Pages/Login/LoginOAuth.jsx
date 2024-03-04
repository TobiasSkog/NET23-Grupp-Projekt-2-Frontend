import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../Components/Auth/AuthProvider";
import { useLoading } from "../../Components/Loading/LoadingProvider";

export default function Login() {
	const location = useLocation();
	const { search } = location;
	const navigate = useNavigate();
	const { loginOAuth, user } = useAuth();
	const { loading, isPageLoading } = useLoading();
	useEffect(() => {
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
					loginOAuth(response.data, "OAuth");
				}
			} catch (error) {
				console.error("Error:", error);
			} finally {
				loading(false);
				if (user) {
					navigate(user.target);
				} else {
					navigate("/");
				}
			}
		};
		if (!user && !isPageLoading) {
			oAuthLoginHandling();
		}
	}, []);
}
