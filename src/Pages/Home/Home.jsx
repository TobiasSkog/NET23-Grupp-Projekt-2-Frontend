import React, { useState, useContext } from "react";
import Logo from "../../Assets/img/coffe and insomnia logo.png";
import LoginModal from "../../Components/LoginModal/LoginModal";
import { Container, Row, Col, Button } from "react-bootstrap";

import { UserContext } from "../../Components/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/UserContext/Contexts";

export default function Home() {
	const [showLogin, setShowLogin] = useState(false);
	const handleShowLogin = () => setShowLogin(true);
	const handleCloseLogin = () => setShowLogin(false);
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	if (user) {
		navigate("/projects");
		return <>null</>;
	}

	return (
		<>
			<Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
				<Row>
					<Col xs={12} className="text-center">
						{/* Logo */}
						<img
							src={Logo}
							alt="Logo"
							className="img-fluid"
							style={{
								maxWidth: "50%",
								marginBottom: "70px",
								borderRadius: "50%",
								boxShadow: "0 0 10px rgba(0,0,0,0.5)",
								width: "10rem",
								height: "auto",
							}}
						/>
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
						<Button variant="dark" className="mt-4 mt-md-5" style={{ fontSize: "1rem" }} onClick={handleShowLogin}>
							Go To Login
						</Button>
					</Col>
				</Row>
			</Container>

			{/* Login Modal */}
			<LoginModal show={showLogin} handleClose={handleCloseLogin} />
		</>
	);
}
