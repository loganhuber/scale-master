import { useState, useEffect, useContext } from 'react'
import { getCurrentUser, fetchUserData } from '../context/auth.jsx'
import LoginForm from './forms/loginForm.jsx'
import RegisterForm from './forms/registerForm.jsx'
import { AuthContext } from '../context/AuthContext.jsx'


function Navbar() {
    const [loggingIn, setLoggingIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [viewingStats, setViewingStats] = useState(false)
    const [offset, setOffset] = useState(0)
    const [totalPerPage, setTotalPerPage] = useState(5)
    const [statCount, setStatCount] = useState(totalPerPage)
    const { currUser, setCurrUser, userStats, setUserStats } = useContext(AuthContext)
    
    function logoutUser() {
        localStorage.removeItem('access_token')
        setUserStats(null)
        setCurrUser(null)
    }

    function formatDate(data) {
        const date = new Date(data).toLocaleDateString()
        return date
    }

    function switchPage(direction) {
        setOffset(prev => prev + direction)
        setStatCount(prev => prev + direction)
    }

    const Stats = () => {
        return (
            <div className="message-overlay">

                <div className='d-flex flex-column align-items-center justify-content-center'
                 style={{ width: '600px'}}>
                    <h2>Stats</h2>
                    <p>{currUser}</p>
                    <table className='table table-striped p-5 border border-2'>
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Scale</th>
                                <th>BPM</th>
                                <th>Date</th>
                            </tr>

                        </thead>
                        <tbody>

                            { 
                            userStats?.length ?
                                userStats.slice(offset, statCount).map((stat, index) => {
                                return (
                                    <tr key={index}>
                                        <td >{stat['score']}%</td>
                                        <td>{stat['scale_key']} {stat['scale']}</td>
                                        <td>{stat['bpm']} BPM</td>
                                        <td>{formatDate(stat['date'])}</td>
                                    </tr>
                                )
                                })
                                :
                                <li>No Stats Yet</li>
                            }
                        </tbody>
                    
                    </table>
                    <ul className="pagination">
                        <li className='page-item'>
                            <button className={`page-link ${offset === 0 && 'disabled'}`} disabled={offset === 0} onClick={() => switchPage(-totalPerPage)}>Previous</button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${(statCount) > userStats.length && 'disabled'} `} disabled={(statCount) > userStats.length} onClick={() => switchPage(totalPerPage)}>Next</button>
                        </li>
                    </ul>
                    <button className='btn btn-light' onClick={() => {
                        setViewingStats(false)
                        setOffset(0)
                        setStatCount(totalPerPage)
                    }}>Close</button>
                </div>
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
        setLoggingIn={setLoggingIn} 
        /> : ''}
        { viewingStats ? <Stats /> : ''}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">Let's Practice Scales!</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                { !currUser ?
                <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="Want to keep track of your scores? Register now!"
                onClick={() => {
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
                { currUser ? `Welcome, ${currUser.toLowerCase()}` : 'Welcome, Guest'}
            </span>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar