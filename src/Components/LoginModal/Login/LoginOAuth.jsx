import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LoginOAuth({ userLoggedIn }) {
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

				const response = await axios.get(`http://localhost:3001/login/auth/callback?code=${code}`);

				if (response.status !== 200) {
					console.error("Authentication error:", response.data);
					return false;
				}

				const databaseUserData = await axios.post("http://localhost:3001/databases/people/login/authUser", { userEmail: response.data.email });

				if (!databaseUserData.data.isValidUser) {
					return false;
				}
				const userData = {
					id: databaseUserData.data.id,
					name: databaseUserData.data.name,
					userRole: databaseUserData.data.userRole,
					email: response.data.email,
				};

				userLoggedIn(userData);
				navigate("/projects");
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{isLoading && <div>Loading...</div>}</>;
}
