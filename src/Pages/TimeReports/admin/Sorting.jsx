export default function Sorting({ originalTimeReports, setTimeReports }) {
	//This component is used to filter timereports by last 7days, 30days & show all
	const handleClick7days = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= sevenDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleClick30days = () => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const filteredReports = originalTimeReports.filter((report) => {
			const reportDate = new Date(report.date);

			return reportDate >= thirtyDaysAgo;
		});
		setTimeReports(filteredReports);
	};

	const handleAllClick = () => {
		setTimeReports(originalTimeReports);
	};

	return (
		<>
			<button className="neu-button-square" onClick={handleClick7days}>
				Last 7 days
			</button>
			<button className="neu-button-square" onClick={handleClick30days}>
				Last 30 days
			</button>
			<button className="neu-button-square" onClick={handleAllClick}>
				All
			</button>
		</>
	);
}
