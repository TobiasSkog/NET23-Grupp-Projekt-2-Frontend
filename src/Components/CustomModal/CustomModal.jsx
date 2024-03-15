import { useState, useEffect } from "react";

export default function CustomModal({ show, onClose, children, title }) {
	const [isVisible, setIsVisible] = useState(show);
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
							<span className="neu-modal-divider"> </span>
						</>
					)}

					<div className="neu-modal-body">{children}</div>
				</section>
			)}
		</>
	);
}
