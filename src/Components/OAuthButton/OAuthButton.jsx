import React from "react";

export default function OAuthButton() {
	const handleOAuthClick = () => {
		window.location.href = "http://localhost:3001/login/auth";
	};

	return (
		<div>
			<button onClick={handleOAuthClick}>Login with Notion</button>
		</div>
	);
}
