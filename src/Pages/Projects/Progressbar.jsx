import React from "react";

export default function Progressbar({ workedHours, totalHours }) {
	const calculatePercent = () => {
		return ((workedHours / totalHours) * 100).toFixed(0);
	};
	return (
		<div className="progress bg-primary neu-prog ">
			<div
				id="progress-bar"
				className="progress-bar bg-progress"
				role="progressbar"
				style={{ width: calculatePercent() + "%" }}
				aria-valuenow={calculatePercent()}
				aria-valuemin="0"
				aria-valuemax="100">
				{calculatePercent()}%
			</div>
		</div>
	);
}
