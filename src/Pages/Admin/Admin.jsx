import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Admin({ ...rest }) {
	const isAuthenticated = !!Cookies.get("auth");
	const navigate = useNavigate();
	if (!isAuthenticated) {
		navigate("/");
		return null;
	}
	let userJson = Cookies.get("auth");
	let user = JSON.parse(userJson);
	return (
		<div>
			<h1>Admin</h1>
			<h2>{user.name}</h2>
			<p>{user.id}</p>
			<p>{user.name}</p>
			<p>{user.userRole}</p>
		</div>
	);
}
