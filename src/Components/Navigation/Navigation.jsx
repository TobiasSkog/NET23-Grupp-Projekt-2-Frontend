import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NotifyAdminModal from "./NotifyAdminModal";

export default function Navigation({ userSignal, userLoggedOut, handleShowModal }) {
	const userData = userSignal.value;
	const adminNotificationData = userData?.notification;
	const user = userData?.user;
	const navigate = useNavigate();
	const location = useLocation();

	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
	const navRef = useRef(null);

	const handleNavCollapse = () => {
		setIsNavCollapsed(!isNavCollapsed);
	};

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

	const getNavLinkClass = (path) => {
		return location.pathname === path ? "neu-nav-item-active" : "";
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setIsNavCollapsed(true);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav ref={navRef} className="navbar navbar-expand-lg neu-nav">
			<section className="container-fluid">
				<a className="navbar-brand" href="/projects">
					Caffeine & Insomnia
				</a>
				<button
					className={`navbar-toggler ${!isNavCollapsed ? "pressed" : ""}`}
					type="button"
					onClick={handleNavCollapse}
					aria-expanded={!isNavCollapsed}
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<section className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`} id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{user && (
							<>
								<li className={`neu-nav-item ${getNavLinkClass("/projects")}`}>
									<a className="nav-link" href="/projects">
										Projects
									</a>
								</li>
								{user.userRole === "Admin" ? (
									<li className={`neu-nav-item ${getNavLinkClass("/timereports")}`}>
										<a className="nav-link" href="/timereports">
											Timereports
										</a>
									</li>
								) : (
									<li className={`neu-nav-item ${getNavLinkClass("/timereports/user")}`}>
										<a className="nav-link" href="/timereports/user">
											Timereports
										</a>
									</li>
								)}
								<li className="neu-nav-item logout-link" onClick={handleLogout}>
									<a className="nav-link" href="/">
										Logout
									</a>
								</li>
							</>
						)}
					</ul>
				</section>
				<div>{user && user.userRole === "Admin" && <NotifyAdminModal adminNotificationData={adminNotificationData} />}</div>
				<section className="neu-nav-user-container">
					<i onClick={handleLoginButton} className={user ? "bi bi-person-circle neu-online-icon" : "bi bi-person-circle neu-offline-icon"} />
				</section>
			</section>
		</nav>
	);
}
