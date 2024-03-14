import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Progressbar from "./Progressbar";

export default function ProjectCard({ item, handleEdit, handleClick, userRole, setProjectId, handleUserClick }) {
	return (
		<Card className="show-card neu-card bg-primary">
			<Card.Title className="pt-2 ps-2 text-center">{item.name}</Card.Title>
			<div className="neu-breaker" />
			<Card.Body className="d-flex flex-column">
				<section className="neu-card-status">
					<span
						className={`text-textdark 
            ${
							item.status === "Active"
								? "neu-card-active"
								: item.status === "Next up"
								? "neu-card-next"
								: item.status === "Done"
								? "neu-card-done"
								: "neu-card-pause"
						}`}>
						{item.status}
					</span>
				</section>

				<section className="neu-card-section neu-center">
					<p>
						{((deadlineDiff) => (deadlineDiff > 0 ? `Deadline: ${Math.ceil(deadlineDiff)} days` : "Deadline passed"))(
							(new Date(item.timespan.end) - new Date()) / (1000 * 3600 * 24)
						)}
					</p>
					<p>Ends: {item.timespan.end}</p>
					<Progressbar startDate={item.timespan.start} endDate={item.timespan.end} progressType="date" />
				</section>

				<section className="neu-card-section neu-center">
					<p>
						Time: {item.workedHours} h / {item.hours} h{" "}
					</p>
					<Progressbar currentTime={item.workedHours} endTime={item.hours} progressType="time" />
				</section>

				<section className="d-flex flex-row justify-content-between">
					{userRole === "User" && (
						<Button className="btn neu-button-square m-2 neu-size-full" onClick={() => handleUserClick(item.id, item.name)}>
							Report Time
						</Button>
					)}

					{userRole === "Admin" && (
						<>
							<Button className="neu-button-square mt-2 neu-size-half" onClick={() => handleClick(item.id, item.name)}>
								View Timereports
							</Button>

							<Button
								className="btn neu-button-square mt-2 neu-size-half"
								onClick={() => {
									handleEdit(item.id);
									setProjectId(item.id);
								}}>
								Edit
							</Button>
						</>
					)}
				</section>
			</Card.Body>
		</Card>
	);
}

{
	/* style={{ backgroundColor: item.color }} ADD CUSTOM STYLE BASED ON item.color
          ADD A TERNARY item.color === ... */
}

{
	/* <p className="my-0 mx-0">Hours: {item.hours}</p>

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
          */
}
