import BoxComponent from "./BoxComponent";
import { userSignal } from "../CustomSignals/UserSignal";
export default function SpawnBoxTest() {
	const user = userSignal.value;
	const getBoxes = (amountOfBoxes) => {
		let boxArray = [];
		for (let i = 0; i < amountOfBoxes; i++) {
			let name =
				i === 0
					? "box-hard-outer"
					: i === 1
					? "box-hard-inner"
					: i === 2
					? "box-soft-outer"
					: i === 3
					? "box-soft-inner"
					: i === 4
					? "circle-soft"
					: "circle-hard";

			boxArray.push(<BoxComponent v={name} i={i} user={user} />);
		}
		return boxArray.map((box) => box);
	};
}
