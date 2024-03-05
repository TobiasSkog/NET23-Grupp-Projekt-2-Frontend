import { useEffect } from "react";
import { useAuth } from "../../Components/Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function User() {
	const { user, logout } = useAuth();
	const redirect = useNavigate();

	useEffect(() => {
		if (!user) {
			redirect("/");
		}
		console.log("WELCOME USER THIS IS YOU:", user);
	});

	return (
		<div>
			<h2>User Page</h2>
			{user && (
				<div>
					<p>Welcome {user.userData.userObj.name}!</p>
					<button onClick={logout}>Logout</button>
				</div>
			)}
		</div>
	);
}
