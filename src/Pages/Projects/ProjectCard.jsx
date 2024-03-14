import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Progressbar from "./Progressbar";

export default function ProjectCard({
	item,
	handleEdit,
	handleClick,
	userRole,
	setProjectId,
	handleUserClick,
}) {
	return (
		<Card bg="dark" text="light" className="show-card">
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				<div>
					<strong className="badge" style={{ backgroundColor: item.color }}>
						{item.status}
					</strong>
					<p className="my-0 mx-0">Hours: {item.hours}</p>

					<p className="my-0 mx-0 ">
						Worked Hours:
						<span className="text-primary"> {item.workedHours}</span>
					</p>

					<Progressbar workedHours={item.workedHours} totalHours={item.hours} />
					<p className="my-0 mx-0 ">
						Hours Left: <span className="text-info">{item.hoursLeft}</span>
					</p>
					<p className="my-0 mx-0">Timespan:</p>

					<span className="show-timespan">
						{item.timespan.start} - {item.timespan.end}
					</span>
				</div>
				{userRole === "User" && (
					<Button
						className="btn btn-primary m-2"
						onClick={() => handleUserClick(item.id, item.name)}>
						Report Time
					</Button>
				)}

				{userRole === "Admin" && (
					<>
						<Button onClick={() => handleClick(item.id, item.name)}>
							See Timereports
						</Button>

						<Button
							className="btn btn-danger m-2"
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
