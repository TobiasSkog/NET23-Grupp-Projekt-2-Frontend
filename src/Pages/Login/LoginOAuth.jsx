import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LoginOAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const { search } = location;
	const navigate = useNavigate();

	useEffect(() => {
		const authenticateAndFindUserInDatabase = async () => {
			try {
				setIsLoading(true);
				const searchParams = new URLSearchParams(search);
				const code = searchParams.get("code");

				if (!code) {
					return false;
				}
				//notion oath
				const response = await axios.get(
					`http://localhost:3001/login/auth/callback?code=${code}`
				);

				if (response.status !== 200) {
					console.error("Authentication error:", response.data);
					return false;
				}
				//call backend
				const databaseUserData = await axios.post(
					"http://localhost:3001/databases/login/authUser",
					{ userEmail: response.data.email } //lägga till email/password
				);

				if (!databaseUserData.data.isValidUser) {
					return false;
				}

				//exakt samma, copypasta
				const userData = {
					id: databaseUserData.data.id,
					name: response.data.name,
					userRole: databaseUserData.data.userRole,
					target:
						databaseUserData.data.userRole === "Admin"
							? "/admin"
							: databaseUserData.data.userRole === "User"
							? "/user"
							: "/",
				};

				Cookies.set("auth", JSON.stringify(userData));
				navigate(userData.target);
				//const expirationTime = new Date(new Date().getTime() + 60000);
				// Cookies.set("auth", JSON.stringify(userData), {
				// 	expires: expirationTime,
				// });
			} catch (error) {
				console.error("Unexpected error during authentication:", error);
			} finally {
				setIsLoading(false);
			}
		};

		const authenticatedUser = authenticateAndFindUserInDatabase();
		if (!authenticatedUser) {
			navigate("/");
		}
	}, []);

	return <>{isLoading && <div>Loading...</div>}</>;
}
