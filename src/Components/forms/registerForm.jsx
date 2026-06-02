import { createNewUser } from "../../context/auth";

function RegisterForm({ setIsRegistering }) {

    function handleNewAccount(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = {
            "username" : formData.get('username'),
            "email" : formData.get('email'),
            "pw_hash" : formData.get('password')
        }
        createNewUser(userData);
        setIsRegistering(false)

        // TODO show some message thanking for creating an account
    };

    return (
        <div className="message-overlay">
        <h3>Create an account</h3>
        <form onSubmit={handleNewAccount} className="d-flex flex-column m-2 gap-3">

                <label htmlFor="username">Username</label>
                <input type="text" name="username" required/>
            
            
                <label htmlFor="name">Email</label>
                <input type="email" name="email" required/>
            

                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
            
            <button type="submit" className="btn btn-light">Create Account</button>
        </form>

        <div>
            <button className="btn btn-light m-2" onClick={() => {
                setIsRegistering(false)
            }}>Close</button>
        </div>
    </div>
    )
}

export default RegisterForm