import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import TimeReports from "./Pages/TimeReports/TimeReports";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Admin from "./Pages/Admin/Admin";
import Project from "./Pages/Projects/Project";
//import Cookies from "js-cookie";

export default function App() {
	//const isAuthenticated = !!Cookies.get("auth");

	return (
		<Router>
			<header>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login/auth" element={<LoginOAuth />} />
					<Route path="/user" element={<User />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/timereports" element={<TimeReports />} />
					<Route path="/projects" element={<Project />} />
				</Routes>
			</main>
		</Router>
	);
}
