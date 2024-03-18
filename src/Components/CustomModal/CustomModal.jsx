import { useState, useEffect } from "react";

export default function CustomModal({ show, onClose, children, title, divider }) {
	const [isVisible, setIsVisible] = useState(show);
	if (divider) {
		divider = true;
	} else {
		divider = false;
	}
	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};

	return (
		<>
			{isVisible && (
				<section className="neu-modal-overlay">
					<div className="neu-modal-close-container">
						<button className="neu-modal-close-button" onClick={handleClose}>
							&times;
						</button>
					</div>
					{title && (
						<>
							<div className="neu-modal-title">
								<h2>{title}</h2>
							</div>
							{divider && <span className="neu-modal-divider" />}
						</>
					)}

					<div className="neu-modal-body">{children}</div>
				</section>
			)}
		</>
	);
}
