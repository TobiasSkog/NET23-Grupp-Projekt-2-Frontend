import React, { useEffect, useState } from "react";
import Logo from "../../Assets/img/coffe and insomnia logo.png";
import LoginModal from "../../Components/LoginModal/LoginModal";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function Home({ userSignal, userLoggedIn }) {
	const [showLogin, setShowLogin] = useState(false);
	const handleShowLogin = () => setShowLogin(true);
	const handleCloseLogin = () => setShowLogin(false);
	const navigate = useNavigate();
	const user = userSignal.value;
	// IMPORT THIS FOR REDIRECTION OF THE USER IF THE USER COOKIE STILL EXISTS IN STORAGE
	useEffect(() => {
		if (user) {
			navigate("/projects");
		}
	}, []);

	return (
		<Container fluid className="d-flex align-items-center justify-content-center neu-size-max">
			<Row>
				<Col xs={12} className="text-center">
					<img src={Logo} alt="Logo" className="img-fluid neu-img" />
				</Col>
				<Col xs={12} className="text-center  neu-pad-bot-5">
					{/* Company Name */}
					<h2
						style={{
							fontSize: "2rem",
							paddingBottom: "0.5rem",
							borderBottom: "2px solid #000",
							marginBottom: "20px",
						}}>
						Caffeine & Insomnia
					</h2>
				</Col>

				{/* Login Button */}
				{!user && (
					<Col xs={12} className="text-center justify-content-center align-items-center">
						<Button className="mt-4 mt-md-5  neu-button-login neu-size-40" onClick={handleShowLogin}>
							Login
						</Button>
					</Col>
				)}
			</Row>

			{/* Login Modal */}
			<LoginModal show={showLogin} handleClose={handleCloseLogin} userLoggedIn={userLoggedIn} />
		</Container>
	);
}
