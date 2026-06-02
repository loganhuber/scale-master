import { useContext, useState, useEffect } from "react";
import { loginUser, getCurrentUser, getUserScores } from "../../context/auth";
import { AuthContext } from "../../context/AuthContext";
function LoginForm({ setIsRegistering, setLoggingIn }) {
    const { currUser, setCurrUser, setUserStats } = useContext(AuthContext)
    const [error, setError] = useState(null)

        async function handleLogin(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            await loginUser(formData)
            const currUser = await getCurrentUser()
            console.log("Current User: ", currUser)
            const userScores = await getCurrentUser(currUser["id"])

            setCurrUser(currUser["username"])
            setUserStats(userScores)
            setLoggingIn(false)
        }
        catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        setError(null)
    }, [])

    return (
        <div className="message-overlay">
        <h3>Login</h3>
        <form onSubmit={handleLogin} className="d-flex flex-column m-5 gap-3">
                { error && 
                <div className="">{error}</div>
                }
                <label htmlFor="username">Email</label>
                <input type="email" name="username" required/>

                <label htmlFor="password" >Password</label>
                <input type="password" name="password" required />
            <button className="btn btn-light">Login</button>
        </form>

        <div>
            <p>Don't have an account?</p>
            <button className="btn btn-light m-2" onClick={() => {
                setLoggingIn(false)
                setIsRegistering(true)
            }}>Register</button>
            <button className="btn btn-light m-2" onClick={() => {
                setLoggingIn(false)
            }}>Close</button>
        </div>
    </div>
    )
}

export default LoginForm