import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
export default function Navigation({ userSignal, userLoggedOut, ...rest }) {
	const user = userSignal.value;
	const navigate = useNavigate();
	const handleLogout = () => {
		userLoggedOut();
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href={user ? "/projects" : "/"}>Caffeine & Insomnia</Navbar.Brand>
				{user ? (
					<>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse className="basic-navbar-nav">
							<Nav className="me-auto">
								<>
									<Nav.Link href="/projects">Projects</Nav.Link>
									<Nav.Link href="/timereports">Time Reports</Nav.Link>
								</>
							</Nav>
						</Navbar.Collapse>
					</>
				) : null}
				<Navbar.Collapse className="justify-content-end">
					<Nav className="end-auto">
						{user ? (
							<>
								<Navbar.Text>Logged in as: {user.name}</Navbar.Text>
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							</>
						) : null}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
