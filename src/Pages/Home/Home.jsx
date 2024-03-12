import React, { useState } from "react";
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
	if (user) {
		navigate(`/projects`);
		return null;
	}

	return (
		<>
			<Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
				<Row>
					<Col xs={12} className="text-center ">
						{/* Logo */}
						<img src={Logo} alt="Logo" className="img-fluid neu-img" />
					</Col>
					<Col xs={12} className="text-center">
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
					<Col xs={12} className="text-center">
						{/* Login Button */}
						{/* <Button variant="dark" className="mt-4 mt-md-5" style={{ fontSize: "1rem" }} onClick={handleShowLogin}> */}
						<Button className="mt-4 mt-md-5 neu-button" style={{ fontSize: "1rem" }} onClick={handleShowLogin}>
							Go To Login
						</Button>
					</Col>
				</Row>
			</Container>

			{/* Login Modal */}
			<LoginModal show={showLogin} handleClose={handleCloseLogin} userLoggedIn={userLoggedIn} />
		</>
	);
}
