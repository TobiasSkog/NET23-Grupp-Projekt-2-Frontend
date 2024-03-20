import LoginIntegrated from "./Login/LoginIntegrated";
import LoginOAuthButton from "./Login/LoginOAuthButton";
import CustomModal from "../CustomModal/CustomModal";

export default function LoginModal({ show, handleClose, userLoggedIn }) {
	return (
		<CustomModal show={show} onClose={handleClose} title="Login" divider>
			<LoginIntegrated userLoggedIn={userLoggedIn} handleClose={handleClose} />
			<p className="mb-3">Or Login Using Your Notion Account:</p>
			<LoginOAuthButton />
		</CustomModal>
	);
}
