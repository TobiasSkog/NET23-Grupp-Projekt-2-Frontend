import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavComponent() {
	return (
		<>
			<Navbar
				collapseOnSelect
				expand="md"
				bg="dark"
				data-bs-theme="dark"
				className="navbar mb-3">
				<Container>
					<Navbar.Brand href="#home">
						<span className="badge bg-light text-dark">Notion-Dashboard</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#">Link1</Nav.Link>
							<Nav.Link href="#">Link2</Nav.Link>
							<Nav.Link href="/projects">Projects</Nav.Link>
							<Nav.Link eventKey={2} href="#">
								Link4
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
