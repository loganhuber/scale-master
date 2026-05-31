import { useState } from 'react'

function Navbar({ currUser, setCurrUser }) {
    const [loggingIn, setLoggingIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [viewingStats, setViewingStats] = useState(false)

    const LoginForm = () => {
        return (
            <div className="message-overlay">
            <h3>Login</h3>
            <form action="" className="d-flex flex-column m-5 gap-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required/>

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

    const RegisterForm = () => {
        return (
            <div className="message-overlay">
            <h3>Create an account</h3>
            <form action="" className="d-flex flex-column m-2 gap-3">

                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required/>
               
                
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" required/>
               
    
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" required />
                
                <button className="btn btn-light">Create Account</button>
            </form>

            <div>
                <button className="btn btn-light m-2" onClick={() => {
                    setIsRegistering(false)
                }}>Close</button>
            </div>
        </div>
        )
    }

    const UserStats = () => {
        return (
            <div className="message-overlay">
                <h2>Stats</h2>
                <p>user name</p>
                <ul>
                    <li>stat 1</li>
                    <li>stat 1</li>
                    <li>stat 1</li>
                    <li>stat 1</li>
                </ul>
                <button className='btn btn-light' onClick={() => {
                    setViewingStats(false)
                }}>Close</button>
            </div>
        )
    }




    return (
        <>
        { loggingIn ? <LoginForm />: ''}
        { isRegistering ? <RegisterForm /> : ''}
        { viewingStats ? <UserStats /> : ''}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Let's Practice Scales!</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                <button className="nav-link" onClick={() => {
                    setIsRegistering(true)
                }}>Register</button>
                </li>
                <li className="nav-item">
                <button className="nav-link" onClick={() => {
                    setLoggingIn(true)
                }}>Login</button>
                </li>
                <li className="nav-item">
                    <button className='nav-link' onClick={() => {
                        setViewingStats(true)
                    }}>View Stats</button>
                </li>
            </ul>
            <span className="navbar-text">
                welcome, user
            </span>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar