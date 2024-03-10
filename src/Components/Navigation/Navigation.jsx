import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";
import { AuthContext } from "../UserContext/Contexts";

export default function Navigation({ ...rest }) {
	const { user, setUser } = useContext(AuthContext);
	//const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove("auth");
		setUser(null);
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href={user ? "/projects" : "/"}>Caffeine & Insomnia</Navbar.Brand>
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
