import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Validation from '../assets/LoginValidation';

const LogIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [responseMessage, setResponseMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await fetch("http://localhost:3000/logindata", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email, password: values.password }),
                });

                if (!response.ok) {
                    console.error("Network response was not ok");
                }

                const data = await response.json();
                console.table(data);
                setResponseMessage(JSON.stringify(data.rows[0][1]) + JSON.stringify(data.rows[0][2]));
                navigate('/home', { state: { fetchedData: data } });

            } catch (error) {
                console.error("Error:", error);
            }
    }
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>LOG IN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input name='email' type="email"
                                onChange={handleInput} placeholder='Enter Email' className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input name='password' type="password"
                                onChange={handleInput} placeholder='Enter Password' className="form-control rounded-0" />
                        </div>
                        <button type='submit' className="btn btn-success">Log in</button>
                        <p>You are agreeing to our terms and conditions</p>
                        <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </>
    );
}
export default LogIn;