import React from "react";

export default function Progressbar({ workedHours, totalHours }) {
	const calculatePercent = () => {
		return ((workedHours / totalHours) * 100).toFixed(0);
	};
	return (
		<div className="progress bg-info">
			<div
				id="progress-bar"
				className="progress-bar bg-primary"
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
