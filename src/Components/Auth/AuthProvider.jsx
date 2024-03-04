import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const loginOAuth = (userData, loginType) => {
		setUser({ userData, loginType });
	};
	const loginIntegrated = (email, userRole, loginType) => {
		setUser({ email, userRole, loginType });
	};
	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loginIntegrated, loginOAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
