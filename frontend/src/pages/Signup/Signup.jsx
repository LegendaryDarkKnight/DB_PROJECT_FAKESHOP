import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 body1">
            <div className="bg-white p-3 rounded w-25">
                <h2>SIGN UP</h2>
                <br />

                <form action="">
                    <div className="mb-4 input-container">
                        <input
                            type="text"
                            id="name" // Add unique id
                            placeholder=" "
                            className="form-control rounded-0 input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name">Name</label> {/* Use htmlFor with the corresponding id */}
                    </div>
                    <div className="mb-4 input-container">
                        <input
                            type="email"
                            id="email" // Add unique id
                            placeholder=" "
                            className="form-control rounded-0 input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label> {/* Use htmlFor with the corresponding id */}
                    </div>
                    <div className="mb-4 input-container">
                        <input
                            type="password"
                            id="password" // Add unique id
                            placeholder=" "
                            className="form-control rounded-0 input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label> {/* Use htmlFor with the corresponding id */}
                    </div>
                    <button className="btn btn-success">Sign Up</button>
                    <p>You are agreeing to our terms and conditions</p>
                    <Link
                        to="/login"
                        className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                    >
                        Account exists?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
