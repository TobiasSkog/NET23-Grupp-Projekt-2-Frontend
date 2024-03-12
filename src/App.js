import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Admin from "./Pages/Admin/Admin";
import Project from "./Pages/Projects/Project";
import Timereport from "./Pages/Timereports/Timereport";
import TimereportUser from "./Pages/Timereports/TimereportUser";
import TimereportMain from "./Pages/Timereports/TimereportMain";
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
					<Route path="/timereports" element={<TimereportMain />} />
					<Route path="/timereports/admin" element={<TimereportUser />} />
					<Route path="/timereports/project" element={<Timereport />} />
					<Route path="/projects" element={<Project />} />
				</Routes>
			</main>
		</Router>
	);
}
