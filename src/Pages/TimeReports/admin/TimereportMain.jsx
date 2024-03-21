import React, { useEffect, useState } from "react";
import axios from "axios";
import Timereport from "./Timereport";
import Menu from "./Menu";
import TimeReportUser from "./TimereportUser";
import Spinner from "react-bootstrap/esm/Spinner";

export default function TimereportMain() {
	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState([]);
	const [people, setPeople] = useState([]);
	const [showProject, setShowProject] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const [projectOption, setProjectOption] = useState(null);
	const [peopleOption, setPeopleOption] = useState(null);

	//When clicking Timereports in navbar we fetch all projects and all people to fill up the select menu
	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const projectResponse = await axios.get("http://localhost:3001/databases/projects");

				const peopleResponse = await axios.get("http://localhost:3001/databases/people");

				setPeople(peopleResponse.data);
				setProject(projectResponse.data);
				//console.log(projectResponse.data);
				//console.log(peopleResponse.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, []);

	return (
		<>
			{loading && (
				<>
					<Spinner animation="border" variant="primary" />
					<h4 className="mt-3">Loading...</h4>
				</>
			)}
			{showMenu ? (
				<Menu
					project={project}
					people={people}
					setPeopleOption={setPeopleOption}
					setProjectOption={setProjectOption}
					setShowMenu={setShowMenu}
					setShowProject={setShowProject}
				/>
			) : showProject ? (
				<Timereport proj={projectOption} />
			) : (
				<TimeReportUser person={peopleOption} />
			)}
		</>
	);
}
