import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [userStats, setUserStats] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                currUser,
                setCurrUser,
                userStats,
                setUserStats
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}