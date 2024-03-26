export default function Sorting({ originalTimeReports, setTimeReports, setSearchDate }) {
	//This component is used to filter timereports by last 7days, 30days & show all
	const handleClick7days = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= sevenDaysAgo;
		});
		setTimeReports(filteredReports);
		setSearchDate({ startDate: "", endDate: "" });
	};

	const handleClick30days = () => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= thirtyDaysAgo;
		});
		setTimeReports(filteredReports);
		setSearchDate({ startDate: "", endDate: "" });
	};

	const handleAllClick = () => {
		setTimeReports(originalTimeReports);
		setSearchDate({ startDate: "", endDate: "" });
	};

	return (
		<>
			<button className="neu-button-square mx-auto me-3 my-2 w-100" onClick={handleClick7days}>
				Last 7 days
			</button>
			<button className="neu-button-square me-3 mx-auto my-2 w-100" onClick={handleClick30days}>
				Last 30 days
			</button>
			<button className="neu-button-square mx-auto my-2 w-100" onClick={handleAllClick}>
				All
			</button>
		</>
	);
}
