import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import TimeReports from "./Pages/TimeReports/TimeReports";
import LoginOAuth from "./Components/LoginModal/Login/LoginOAuth";
import Navigation from "./Components/Navigation/Navigation";
import Project from "./Pages/Projects/Project";
import Timereport from "./Pages/Timereports/Timereport";
import TimereportUser from "./Pages/Timereports/TimereportUser";
import TimereportMain from "./Pages/Timereports/TimereportMain";
//import Cookies from "js-cookie";
import {
	userSignal,
	userLoggedIn,
	userLoggedOut,
} from "./Components/CustomSignals/UserSignal";

export default function App() {
	return (
		<Router>
			<header>
				<Navigation userSignal={userSignal} userLoggedOut={userLoggedOut} />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home userSignal={userSignal} userLoggedIn={userLoggedIn} />}/>
					<Route path="/login/auth" element={<LoginOAuth userLoggedIn={userLoggedIn} />}/>
					<Route path="/user" element={<User />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/timereports" element={<TimereportMain userSignal={userSignal} />}/>
					<Route path="/timereports/admin" element={<TimereportUser userSignal={userSignal} />}/>
          <Route path="/timereports/user" element={<Timereports userSignal={userSignal} />}/>
					<Route path="/timereports/project" element={<Timereport userSignal={userSignal} />}/>
					<Route path="/projects" element={<Project userSignal={userSignal} />}/>
				</Routes>
			</main>
			<footer></footer>
		</Router>
	);
}
