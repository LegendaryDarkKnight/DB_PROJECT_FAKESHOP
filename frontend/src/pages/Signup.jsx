import {Link} from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>SIGN UP</h2>
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor = "email">Email</label>
                            <input type = "email" placeholder = 'Enter Email' className="form-control rounded-0"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter Password' className="form-control rounded-0" />
                        </div>
                        <button className="btn btn-success">Sign Up</button>
                        <p>You are agreeing to our terms and conditions</p>
                        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Account exists?</Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;