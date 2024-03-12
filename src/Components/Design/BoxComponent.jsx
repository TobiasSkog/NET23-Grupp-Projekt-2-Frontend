import "./Neumorphism.css";

export default function BoxComponent({ v, i, user }) {
	console.log("Re-Render: BoxComponent Component");
	switch (i) {
		case 0:
			return (
				<div className={`neu-${v} bg-primary`}>
					<p>{user.id}</p>
				</div>
			);
		case 1:
			return (
				<div className={`neu-${v} bg-altprimary`}>
					<p>{user.name}</p>
				</div>
			);
		case 2:
			return (
				<div className={`neu-${v} bg-light`}>
					<p>{user.userRole}</p>
				</div>
			);
		case 3:
			return (
				<div className={`neu-${v} bg-altlight`}>
					<p>{user.id}</p>
				</div>
			);
		case 4:
			return (
				<div className={`neu-${v} bg-dark`}>
					<p>{user.name}</p>
				</div>
			);
		case 5:
			return (
				<div className={`neu-${v} bg-altdark`}>
					<p>{user.userRole}</p>
				</div>
			);

		default:
			return <div className={`neu-${v}`}></div>;
	}
}
// user.name
// user.id
// user.name
// user.userRole
