import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css'

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact , setContact] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('Customer');
    const [city, setCity] = useState('Customer');
    const [zip, setZip] = useState('Customer');
    const [message, setMessage] = useState('');
    const onFormSubmit = async() => {
        event.preventDefault();
        console.log(firstName + ' ' + lastName + ' ' + email + ' '+ contact + ' ' + password + ' ' + address + ' ' + city + ' ' + type + ' ' + zip);
        const splitted = address.split(',');
        console.log(splitted);
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            contact: contact,
            type: type,
            password: password,
            apartment: splitted[0],
            building: splitted[1],
            street: splitted[2],
            area: splitted[3],
            postcode: zip,
            city: city
        };
        console.log(data);
        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (!response.ok) {
                console.error("Network response was not ok");
            }


        } catch (error) {
            console.error("Error:", error);
        }
    }
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 body1 ">
            <div className='col-md-2'>
                    <h1 style={{color:"#9B2335"}}>Sign Up</h1>
                    <br></br>
                    <h6 style={{color:"#1B2445"}}>Back to Main Page</h6>
                    <Link  className="nav-link" aria-current="page" to={`/`}>Click Here</Link>
            </div>
            <div className="bg-white p-4 rounded w-50 col-md-10">

                {message != ' ' && message && < div className="alert alert-danger" role="alert">
                    {message}
                </div>}
                <form className="row g-3" onSubmit={onFormSubmit}>
                    <div className="form-floating col-md-6">
                        <input
                            type="name"
                            className="form-control"
                            id="first-name"
                            placeholder="Somik"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="first-name" className="form-label">
                            First Name
                        </label>
                    </div>
                    <div className="form-floating col-md-6">
                        <input
                            type="name"
                            className="form-control"
                            id="last-name"
                            placeholder="Dasgupta"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="last-name" className="form-label">
                            Last Name
                        </label>
                    </div>
                    <div className="form-floating col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="name@example.com"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                    </div>
                    <div className="form-floating col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            placeholder="01XXX"
                            onChange={(e) => {
                                setContact(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="contact" className="form-label">
                            Contact
                        </label>
                    </div>
                    <div className="form-floating col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPass"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="inputPass" className="form-label">
                            Password
                        </label>
                    </div>
                    <div className="form-floating col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="conPass"
                            placeholder="Password"
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setMessage(' ')
                                }
                                else if (password == '') {
                                    setMessage('First set and then Confirm');
                                }
                                else if (e.target.value != password)
                                    setMessage(`Password Don't match`);
                                else
                                    setMessage(` `);
                            }}
                            required
                        />
                        <label htmlFor="conPass" className="form-label">
                            Confirm Password
                        </label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="inputAddress" className="form-label">
                            Address(apartment,building,street,area)
                        </label>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            City
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">
                            Type
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={(e) => {
                                setType(e.target.value);

                            }}
                            required
                        >
                            <option selected="">CUSTOMER</option>
                            <option>SHOP</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputZip" className="form-label">
                            Zip(Number)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            onChange={(e) => {
                                setZip(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="col-12">

                    </div>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                <button type="submit" className="btn btn-lg btn-primary">Sign up</button>
                            </div>
                            <div className="col mt-2">
                                <strong>Already have an account?</strong>
                                <button
                                    type="button"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => { navigate('/login') }}
                                    className="btn  btn-link"
                                >
                                    Click
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    );
}

export default Signup;
