import { useState, useEffect, useRef } from "react";

export default function CustomModal({ show, onClose, children, title, divider, alwaysOpen }) {
	const [isVisible, setIsVisible] = useState(show);
	const modalRef = useRef(null);

	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	if (alwaysOpen) {
		alwaysOpen = true;
	}

	if (divider) {
		divider = true;
	} else {
		divider = false;
	}
	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			handleClose();
		}
	};

	useEffect(() => {
		if (isVisible && !alwaysOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	const handleClose = () => {
		if (!alwaysOpen) {
			setIsVisible(false);
			if (onClose) {
				onClose();
			}
		}
	};

	return (
		<>
			{isVisible && (
				<section className="neu-modal-overlay col-md-6" ref={modalRef}>
					{!alwaysOpen && (
						<span className="neu-modal-close-button" onClick={handleClose}>
							&#x2715;
						</span>
					)}
					{title && (
						<>
							<div className="neu-modal-title">
								<p>{title}</p>
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
