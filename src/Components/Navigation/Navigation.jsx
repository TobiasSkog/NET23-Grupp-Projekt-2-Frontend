import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotifyAdminModal from "./NotifyAdminModal";
import LoginModal from "../LoginModal/LoginModal";

export default function Navigation({ userSignal, userLoggedOut, handleShowModal }) {
	const user = userSignal.value;
	const navigate = useNavigate();
	const handleLoginButton = () => {
		if (user) {
			handleLogout();
		} else {
			handleShowModal();
		}
	};

	const handleLogout = () => {
		userLoggedOut();
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg neu-nav">
			<section className="container-fluid">
				<a className="navbar-brand" href="/projects">
					Caffeine & Insomnia
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<section className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className=" neu-nav-item">
							<a className="nav-link " href="/projects">
								Projects
							</a>
						</li>
						<li className=" neu-nav-item">
							<a className="nav-link" href="/timereports/user">
								Timereports
							</a>
						</li>
					</ul>
				</section>
				{user ? <>{user.userRole === "Admin" && <NotifyAdminModal />}</> : null}
				<section className="neu-nav-user-container">
					<i onClick={handleLoginButton} className={user ? "bi bi-person-circle neu-online-icon" : "bi bi-person-circle neu-offline-icon"} />
				</section>
			</section>
		</nav>
	);
}
//<Container>
//<Navbar.Brand href={user ? "/projects" : "/"}>Caffeine & Insomnia</Navbar.Brand>
//
//{user && (
//<Navbar.Collapse className="basic-navbar-nav">
//<Nav className="me-auto">
//{user.userRole === "Admin" ? (
//<>
//<Nav.Link href="/projects">Projects</Nav.Link>
//<Nav.Link href="/timereports">Time Reports</Nav.Link>
//</>
//) : (
//<>
//<Nav.Link href="/projects">Projects</Nav.Link>
//<Nav.Link href="/timereports/user">Time Reports</Nav.Link>
//</>
//)}
//</Nav>
//</Navbar.Collapse>
//)}
//{user ? <>{user.userRole === "Admin" && <NotifyAdminModal />}</> : null}
//<Nav.Link className="me-5" onClick={handleLogout}>
//<section className="neu-nav-user-container">
//<i className={user ? "bi bi-person-circle neu-online-icon" : "bi bi-person-circle neu-offline-icon"} />
//</section>
//</Nav.Link>
//<Navbar.Toggle aria-controls="basic-navbar-nav" />
//</Container>
