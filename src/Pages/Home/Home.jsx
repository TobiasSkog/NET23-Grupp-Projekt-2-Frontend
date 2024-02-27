import { useEffect, useState } from "react";
const authenticationURL = "http://localhost:3001/auth";

export default function Home() {
	const [dbs, setdbs] = useState([]);

	// When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
	useEffect(() => {
		const params = new URL(window.document.location).searchParams;
		const code = params.get("code");
		if (!code) return;
		fetch(`http://localhost:3001/login/${code}`).then(async (resp) => {
			setdbs(await resp.json());
		});
	}, []);

	return (
		<div>
			<a style={{ display: "block" }} href={authenticationURL}>
				Connect to Notion
			</a>
			{dbs.map((db) => (
				<div
					style={{
						display: "inline-flex",
						whiteSpace: "pre",
						border: "1px solid black",
						marginBottom: 10,
					}}>
					{JSON.stringify(db, null, 2)}
				</div>
			))}
		</div>
	);
}
