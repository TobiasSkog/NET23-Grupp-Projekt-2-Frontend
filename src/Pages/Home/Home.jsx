import LoginButton from "../../Components/LoginButton/LoginButton";
import LoginIntegrated from "../Login/LoginIntegrated";

export default function Home() {
	return (
		<section>
			<h1>Welcome to Caffeine and Insomnia's Project Management Tool</h1>
			<LoginIntegrated/>
			{/* <LoginButton /> */}
		</section>
	);
}
