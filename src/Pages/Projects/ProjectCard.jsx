import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Progressbar from "./Progressbar";

export default function ProjectCard({ item, handleEdit, handleClick, userRole, setProjectId, handleUserClick }) {
	return (
		<Card bg="primary" text="dark" className="show-card neu-hard-outer">
			{/* <Card.Img variant="top" src={item.image} style={{ height: "142px" }} /> */}
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				<div>
					<strong className="badge" style={{ backgroundColor: item.color }}>
						{item.status}
					</strong>
					{/* <p className="my-0 mx-0">Hours: {item.hours}</p> */}
					<p className="my-0 mx-0">
						Worked Hours:
						<span className="text-dark">
							{" "}
							{item.workedHours} out of {item.hours}
						</span>
					</p>

					<Progressbar workedHours={item.workedHours} totalHours={item.hours} />
					<p className="my-0 mx-0 ">
						Hours Left: <span className="text-info">{item.hoursLeft}</span>
					</p>
				</div>
				<div className="neu-hard-outer">
					<p className="my-0 mx-0">Timespan:</p>
				</div>
				<span className="show-timespan">
					{item.timespan.start} - {item.timespan.end}
				</span>
				{userRole === "User" && (
					<Button className="btn btn-primary neu-button m-2" onClick={() => handleUserClick(item.id, item.name)}>
						Report Time
					</Button>
				)}

				{userRole === "Admin" && (
					<>
						<Button className="neu-button m-2" onClick={() => handleClick(item.id, item.name)}>
							See Timereports
						</Button>

						<Button
							className="neu-button m-2"
							onClick={() => {
								handleEdit(item.id);
								setProjectId(item.id);
							}}>
							Edit
						</Button>
					</>
				)}
			</Card.Body>
		</Card>
	);
}
