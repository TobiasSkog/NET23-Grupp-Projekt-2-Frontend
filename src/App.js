import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import { LoadingProvider } from "./Components/Loading/LoadingProvider";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import LoginOAuth from "./Pages/Login/LoginOAuth";
import NavComponent from "./Components/Navbar/NavComponent";
import Project from "./Pages/Projects/Project";

export default function App() {
	return (
		<>
			<NavComponent />
			<Router>
				<LoadingProvider>
					<AuthProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login/auth" element={<LoginOAuth />} />
							<Route path="/user" element={<User />} />
							<Route path="/projects" element={<Project />} />
						</Routes>
					</AuthProvider>
				</LoadingProvider>
			</Router>
		</>
	);
}
