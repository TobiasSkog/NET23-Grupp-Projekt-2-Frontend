import { useNavigate } from "react-router-dom";

export default function User({ userSignal, ...rest }) {
	const navigate = useNavigate();
	const user = userSignal.value;
	if (!user) {
		navigate(`/`);
		return null;
	}
	return (
		<div>
			<h1>User</h1>
			<h2>{user.name}</h2>
			<p>{user.id}</p>
			<p>{user.name}</p>
			<p>{user.userRole}</p>
		</div>
	);
}
