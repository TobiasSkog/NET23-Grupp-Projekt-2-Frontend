import NotionImg from "../../../Assets/img/Notion-Logo.png";
export default function LoginOAuthButton() {
	const handleImageClick = () => {
		//console.log("Redirecting to:", process.env.REACT_APP_NOTION_AUTH_URL);
		window.location.href = process.env.REACT_APP_NOTION_AUTH_URL;
	};
	return (
		<>
			<div className="text-center ">
				<img
					src={NotionImg}
					alt="Login Option"
					className="mt-3 neu-img neu-button"
					style={{ cursor: "pointer", maxWidth: "100px", height: "auto" }}
					onClick={handleImageClick}
				/>
			</div>
		</>
	);
}
