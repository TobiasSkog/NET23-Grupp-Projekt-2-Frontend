import Home from "./Pages/Home/Home";
import OAuthButton from "./Components/OAuthButton/OAuthButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<main>
					<Routes>
						<Route path="/" element={<OAuthButton />} />
						<Route path="/success" element={<Home />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}
