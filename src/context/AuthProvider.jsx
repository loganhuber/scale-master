import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import { getCurrentUser } from "./auth";

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem('access_token')
    async function loadUser() {
        if (!token) {
            setCurrUser(null)
            return
        }
        try {
            const userData = await getCurrentUser()
            
            setUserStats(userData["scores"])
            setCurrUser(userData["username"])
        }
        catch (error) {
            console.log("Error fetching current user", error)
            setCurrUser(null)
        }
    }
    loadUser()
}, [])

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