import React from "react";

export default function Progressbar({ currentTime, endTime, startDate, endDate, progressType }) {
	const calculatePercent = () => {
		const timeConverter = 1000 * 60 * 60 * 24;
		switch (progressType) {
			case "time":
				return ((currentTime / endTime) * 100).toFixed(0);
			case "date":
				return (((new Date() - new Date(startDate)) / timeConverter / ((new Date(endDate) - new Date(startDate)) / timeConverter)) * 100).toFixed(0);
			default:
				return 50;
		}
	};
	return (
		<div className="neu-prog">
			<div
				id="progress-bar"
				className={`progress-bar neu-prog-bar ${
					calculatePercent() >= 100 ? "bg-neured" : progressType === "time" ? "bg-neuorange" : "bg-neuturquoise"
				}`}
				role="progressbar"
				style={{ width: calculatePercent() + "%" }}
				aria-valuenow={calculatePercent()}
				aria-valuemin="0"
				aria-valuemax="100">
				{calculatePercent() >= 20 && calculatePercent() + "%"}
			</div>
		</div>
	);
}
