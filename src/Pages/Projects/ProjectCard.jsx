import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProjectCard({
	item,
	handleEdit,
	handleClick,
	userRole,
	setProjectId,
}) {
	return (
		<Card bg="dark" text="light" className="show-card">
			<Card.Img variant="top" src={item.image} style={{ height: "142px" }} />
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				<Card.Text>
					<strong className="badge" style={{ backgroundColor: item.color }}>
						{item.status}
					</strong>
					<br />
					Hours: {item.hours} <br />
					Worked Hours: {item.workedHours} <br />
					Hours Left: {item.hoursLeft} <br />
					Timespan:
					<br />
					<span className="show-timespan">
						{item.timespan.start} - {item.timespan.end}
					</span>
				</Card.Text>
				{userRole === "User" && (
					<Button className="btn btn-primary m-2">Report Time</Button>
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
