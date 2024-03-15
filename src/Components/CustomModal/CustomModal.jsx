import { useState, useEffect } from "react";

export default function CustomModal({ isOpen, onClose, children }) {
	const [isVisible, setIsVisible] = useState(isOpen);
	console.log(isVisible);
	useEffect(() => {
		setIsVisible(isOpen);
	}, [isOpen]);

	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};

	return (
		<>
			{isVisible && (
				<div className="custom-modal-overlay">
					<div className="custom-modal-content">
						<button className="custom-modal-close-button" onClick={handleClose}>
							&times;
						</button>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
