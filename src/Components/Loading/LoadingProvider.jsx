import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [isPageLoading, setIsPageLoading] = useState(false);

	const loading = (isLoading) => {
		setIsPageLoading(isLoading);
	};

	return (
		<LoadingContext.Provider value={{ isPageLoading, loading }}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	return useContext(LoadingContext);
};
