import { createContext, useContext, useState } from "react";

import type { User } from "../types/Users";

type authContextType = {
    isAuthenticated: boolean | null;
    user: User | null;
    login: (accessToken: string, user: User) => void;
    logout: () => void;
};

export const AuthContext = createContext<authContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => !!localStorage.getItem("access token")
    );

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser);
    });

    console.log(user);

    function login(accessToken: string, user: User) {
        localStorage.setItem("access token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.clear();

        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("use inside authprovider");
    }

    return context;
}

export default AuthProvider;