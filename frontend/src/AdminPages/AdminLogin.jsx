import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LogIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await fetch("http://localhost:3000/admin/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email, password: values.password }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.error("Network response was not ok");
                    alert('Wrong User or PassWord');
                    return;
                }

                const data = await response.json();
                {data && console.table(data);}
                // setUserData(data);
                {console.log('here '+data.rows[0].USER_ID);}
                navigate(`/admin`);

            } catch (error) {
                console.error("Error:", error);
            }
    }
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center body1 vh-100">
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
                        <p>Forgot Password</p>
                        <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
                    </form>
                    {/* {responseMessage && <p>{responseMessage}</p>} */}
                </div>
            </div>
        </>
    );
}
export default LogIn;