import { useState, useEffect, useContext } from 'react'
import { getCurrentUser, fetchUserData } from '../api-utils/auth'
import LoginForm from './forms/loginForm.jsx'
import RegisterForm from './forms/registerForm.jsx'
import { AuthContext } from '../context/AuthContext.jsx'


function Navbar() {
    const [loggingIn, setLoggingIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [viewingStats, setViewingStats] = useState(false)

    const { currUser, setCurrUser, userStats, setUserStats } = useContext(AuthContext)

    function logoutUser() {
        localStorage.removeItem('access_token')
        setUserStats(null)
        setCurrUser(null)
    }


    const Stats = () => {
        return (
            <div className="message-overlay">
                    <h2>Stats</h2>
                    <p>{currUser}</p>
                <ul>
                    {
                        userStats.map((stat, index) => {
                           return (
                             <li key={index} >{stat['score']}% --- {stat['scale_key']} {stat['scale']}</li>
                           )
                        })
                    }
                </ul>
                <button className='btn btn-light' onClick={() => {
                    setViewingStats(false)
                }}>Close</button>
            </div>
        )
    }

    useEffect(() => {
        if (!currUser) setViewingStats(false)
    }, [viewingStats])



    return (
        <>
        { loggingIn ? <LoginForm 
        setIsRegistering={setIsRegistering}
        setLoggingIn={setLoggingIn}
        setCurrUser={setCurrUser} />: ''}
        { isRegistering ? <RegisterForm 
        setIsRegistering={setIsRegistering} 
        /> : ''}
        { viewingStats ? <Stats /> : ''}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Let's Practice Scales!</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                { !currUser ?
                <li className="nav-item">
                <button className="nav-link" onClick={() => {
                    setIsRegistering(true)
                }}>Register</button>
                </li> :
                ''
                }
                <li className="nav-item">

                { currUser ? 
                        <button className="nav-link" onClick={logoutUser} >Logout</button>
                : 
                        <button className="nav-link" onClick={() => {
                            setLoggingIn(true)
                        }}>Login</button>
                }

                </li>
                { currUser ? 
                <li className="nav-item">
                    <button className='nav-link' onClick={() => {
                        setViewingStats(true)
                    }}>View Stats</button>
                </li>
                : ''
                }
            </ul>
            <span className="navbar-text">
                { currUser ? `Welcome, ${currUser.toLowerCase()}` : 'Welcome'}
            </span>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar