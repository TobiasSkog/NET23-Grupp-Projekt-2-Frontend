import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Project from "./Pages/Projects/Project";
import Cookies from "js-cookie";
import { UserContext, UserProvider } from "./Components/UserContext/UserContext";
import { AuthContext } from "./Components/UserContext/Contexts";
export default function App() {
	//const { setUser } = useContext(UserContext);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const isExistingCookie = !!Cookies.get("auth");
		if (isExistingCookie) {
			setUser(JSON.parse(Cookies.get("auth")));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//const isAuthenticated = !!Cookies.get("auth");

	return (
		<Router>
			<AuthContext.Provider value={{ user, setUser }}>
				<header>
					<Navigation />
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login/auth" element={<LoginOAuth />} />
						<Route path="/timereports" element={<User />} />
						<Route path="/projects" element={<Project />} />
					</Routes>
				</main>
				<footer></footer>
			</AuthContext.Provider>
		</Router>
	);
}
