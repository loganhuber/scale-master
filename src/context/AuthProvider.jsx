import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import { getCurrentUser, getUserScores } from "./auth";

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
            const userScores = await getUserScores(userData['id'])
            setUserStats(userScores)
            setCurrUser(userData["username"])
        }
        catch (error) {
            console.log("Error fetching current user", error)
            setCurrUser(null)
        }
    }
    loadUser()
}, [])

    useEffect(() => {
        console.log(userStats)
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