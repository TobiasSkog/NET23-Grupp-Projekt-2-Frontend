import React from "react";
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
		<Card className="neu-card">
			<section className="neu-card-status">
				<span
					className={`
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
			<Card.Title className="text-center">{item.name}</Card.Title>
			<div className="neu-breaker" />
			<Card.Body className="d-flex flex-column">
				<section className="neu-card-section neu-center">
					<p>
						{((deadlineDiff) =>
							deadlineDiff > 0
								? `Deadline: ${Math.ceil(deadlineDiff)} days`
								: "Deadline passed")(
							(new Date(item.timespan.end) - new Date()) / (1000 * 3600 * 24)
						)}
					</p>
					<p>Ends: {item.timespan.end}</p>
					<Progressbar
						startDate={item.timespan.start}
						endDate={item.timespan.end}
						progressType="date"
						role="progressbar"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-label={`Progress between ${item.timespan.start} and ${item.timespan.end}`}
					/>

					<p>
						Time: {item.workedHours} h / {item.hours} h
					</p>
					<Progressbar
						currentTime={item.workedHours}
						endTime={item.hours}
						progressType="time"
						role="progressbar"
						aria-valuenow={item.workedHours}
						aria-valuemin={0}
						aria-valuemax={item.hours}
						aria-label={`Progress between ${item.workedHours} and ${item.hours}`}
					/>
				</section>
				<section className="neu-size-100 neu-buttons-between">
					{userRole === "User" && (
						<>
							<button
								className="neu-button-square neu-size-100"
								onClick={() => handleUserClick(item.id, item.name)}>
								Report Time
							</button>
						</>
					)}

					{userRole === "Admin" && (
						<>
							<button
								className="neu-button-square neu-size-60"
								onClick={() => handleClick(item.id, item.name)}>
								Timereports
							</button>

							<button
								className="neu-button-square neu-size-30 ms-auto"
								onClick={() => {
									handleEdit(item.id);
									setProjectId(item.id);
								}}>
								Edit
							</button>
						</>
					)}
				</section>
			</Card.Body>
		</Card>
	);
}
