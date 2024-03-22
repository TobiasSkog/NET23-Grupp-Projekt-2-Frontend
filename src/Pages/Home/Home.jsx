import { useEffect } from "react";
import Logo from "../../Assets/img/coffe and insomnia logo.png";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function Home({ userSignal, handleShowModal }) {
	const navigate = useNavigate();
	const userData = userSignal.value;
	const user = userData?.user;
	useEffect(() => {
		if (user) {
			navigate("/projects");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container fluid className="d-flex align-items-center justify-content-center neu-size-max">
			<Row>
				<Col xs={12} className="text-center">
					<img src={Logo} alt="Logo" className="img-fluid neu-img" />
				</Col>
				<Col xs={12} className="text-center  neu-pad-bot-5">
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

				<Col xs={12} className="text-center justify-content-center align-items-center">
					<Button className="mt-4 mt-md-5  neu-button-login neu-size-40" onClick={handleShowModal}>
						Login
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
