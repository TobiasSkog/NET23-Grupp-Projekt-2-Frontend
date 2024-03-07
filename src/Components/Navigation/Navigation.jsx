import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Navigation({ ...rest }) {
	const isExistingCookie = !!Cookies.get("auth");
	let user = null;
	if (isExistingCookie) {
		user = JSON.parse(Cookies.get("auth"));
	}

	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove("auth");
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href={user ? user.target : "/"}>
					Caffeine & Insomnia
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="basic-navbar-nav">
					<Nav className="me-auto">
						{user ? (
							<>
								<Nav.Link href="/projects">Projects</Nav.Link>
								<Nav.Link href="/timereports">Time Reports</Nav.Link>
							</>
						) : null}
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Nav className="end-auto">
						{user ? (
							<>
								<Navbar.Text>{user.name}</Navbar.Text>
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							</>
						) : null}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
