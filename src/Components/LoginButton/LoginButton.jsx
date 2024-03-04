export default function LoginButton() {
	const handleLogin = () => {
		window.location.href = process.env.REACT_APP_NOTION_AUTH_URL;
	};
	return (
		<div>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
