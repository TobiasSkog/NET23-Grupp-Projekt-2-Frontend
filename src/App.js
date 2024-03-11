import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Project from "./Pages/Projects/Project";
import { userSignal, userLoggedIn, userLoggedOut } from "./Components/CustomSignals/UserSignal";

export default function App() {
	return (
		<Router>
			<header>
				<Navigation userSignal={userSignal} userLoggedOut={userLoggedOut} />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home userSignal={userSignal} userLoggedIn={userLoggedIn} />} />
					<Route path="/login/auth" element={<LoginOAuth userLoggedIn={userLoggedIn} />} />
					<Route path="/timereports" element={<User userSignal={userSignal} />} />
					<Route path="/projects" element={<Project userSignal={userSignal} />} />
				</Routes>
			</main>
			<footer></footer>
		</Router>
	);
}
