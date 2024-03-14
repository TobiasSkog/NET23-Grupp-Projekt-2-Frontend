import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./Assets/css/custom.min.css";
import "./Assets/css/Neumorphism.css";
import TimeReports from "./Pages/TimeReports/user/TimeReports";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Project from "./Pages/Projects/Project";
import Timereport from "./Pages/TimeReports/admin/Timereport";
import TimereportMain from "./Pages/TimeReports/admin/TimereportMain";
import TimereportUser from "./Pages/TimeReports/admin/TimereportUser";
import { userSignal, userLoggedIn, userLoggedOut } from "./Components/CustomSignals/UserSignal";
import Footer from "./Components/Footer/Footer";

export default function App() {
	return (
		<>
			<header>
				<Navigation userSignal={userSignal} userLoggedOut={userLoggedOut} />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home userSignal={userSignal} userLoggedIn={userLoggedIn} />} />
					<Route path="/login/auth" element={<LoginOAuth userLoggedIn={userLoggedIn} />} />
					<Route path="/timereports" element={<TimereportMain userSignal={userSignal} />} />
					<Route path="/timereports/admin" element={<TimereportUser userSignal={userSignal} />} />
					<Route path="/timereports/user" element={<TimeReports userSignal={userSignal} />} />
					<Route path="/timereports/project" element={<Timereport userSignal={userSignal} />} />
					<Route path="/projects" element={<Project userSignal={userSignal} />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
}
