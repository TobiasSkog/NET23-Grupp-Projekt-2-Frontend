import { useEffect } from "react";
import { useAuth } from "../../Components/Auth/AuthProvider";
import { useLoading } from "../../Components/Loading/LoadingProvider";
import { useNavigate } from "react-router-dom";

export default function User() {
	// const { user, logout } = useAuth();
	// const { isPageLoading, loading } = useLoading();
	// const redirect = useNavigate();

	// useEffect(() => {
	// 	if (!user && !isPageLoading) {
	// 		redirect("/");
	// 	}
	// 	console.log("USER:", user);
	// });

	return (
		<div>
			<h2>User Page</h2>
		</div>
	);
}
