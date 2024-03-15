import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NotifyAdminModal from "./NotifyAdminModal";

export default function Navigation({ userSignal, userLoggedOut, ...rest }) {
	const user = userSignal.value;
	const navigate = useNavigate();
	//console.log(user);
	const handleLogout = () => {
		userLoggedOut();
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="neu-nav">
			<Container>
				<Navbar.Brand href={user ? "/projects" : "/"}>
					Caffeine & Insomnia
				</Navbar.Brand>

				{user && (
					<Navbar.Collapse className="basic-navbar-nav">
						<Nav className="me-auto">
							{user.userRole === "Admin" ? (
								<>
									<Nav.Link href="/projects">Projects</Nav.Link>
									<Nav.Link href="/timereports">Time Reports</Nav.Link>
								</>
							) : (
								<>
									<Nav.Link href="/projects">Projects</Nav.Link>
									<Nav.Link href="/timereports/user">Time Reports</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				)}
				{user ? (
					<>
						{user.userRole === "Admin" && <NotifyAdminModal />}
						<Nav.Link className="me-5" onClick={handleLogout}>
							Logout
						</Nav.Link>
					</>
				) : null}

				<section className="neu-nav-user-container">
					<i
						className={
							user
								? "bi bi-person-circle neu-online-icon"
								: "bi bi-person-circle neu-offline-icon"
						}
					/>
				</section>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</Container>
		</Navbar>
	);
}
