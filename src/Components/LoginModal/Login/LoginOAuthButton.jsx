import NotionImg from "../../../Assets/img/Notion-Logo.png";
export default function LoginOAuthButton() {
	const handleImageClick = () => {
		window.location.href = process.env.REACT_APP_NOTION_AUTH_URL;
	};
	return (
		<>
			<div className="text-center">
				<img
					src={NotionImg}
					alt="Login Option"
					className="img-fluid neu-button-round"
					style={{ cursor: "pointer", maxWidth: "100px", height: "auto" }}
					onClick={handleImageClick}
				/>
			</div>
		</>
	);
}
