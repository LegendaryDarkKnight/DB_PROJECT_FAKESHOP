import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSpeedometer2, BsPeople, BsPerson, BsGear, BsBoxArrowRight, BsClockHistory } from 'react-icons/bs'; // Import React Bootstrap icons
// Import LoginHistory component

const Sidebar = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://localhost:3000/admin/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
            }
        } catch (error) {
            console.log("Error:", error);
        }
        setUserData(null);
        navigate('/admin');
    };

    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/admin/getAdminData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then((data) => {
                if (isCurrent) {
                    setUserData(data.rows);
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                isCurrent = false;
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-start px-3 pt-2 text-white min-vh-100 sticky-top">
                    <Link to="/admin" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">Home</span>
                    </Link>
                    <br />
                    <br />
                    {userData && userData[0].ROLE == 'ADMIN' && (
                        <>
                            <Link to="/admin/transaction" className="nav-link px-0">
                                <div className="d-flex align-items-center">
                                    <BsSpeedometer2 /> <span className="ms-1 d-none d-sm-inline">Transactions</span>
                                </div>
                            </Link>
                            <br />
                            <Link to="/admin/userrequests" className="nav-link px-0">
                                <div className="d-flex align-items-center">
                                    <BsPeople /> <span className="ms-1 d-none d-sm-inline">User Requests</span>
                                </div>
                            </Link>
                            <br />
                            <Link to="/admin/loginhistory" className="nav-link px-0">
                                <div className="d-flex align-items-center">
                                    <BsClockHistory /> <span className="ms-1 d-none d-sm-inline">Login History</span>
                                </div>
                            </Link>
                            <br />
                            {/* <Link to="/admin/add-customer-care" className="nav-link px-0">
                                <div className="d-flex align-items-center">
                                    <span className="ms-1 d-none d-sm-inline">Add Customer Care</span>
                                </div>
                            </Link> */}
                            <br />
                            <hr />
                        </>
                    )}
                    {userData && userData[0].ROLE == 'COURIER' &&
                        <>
                            <Link to="/admin/courier-service" className="nav-link px-0">
                                <div className="d-flex align-items-center">
                                    <span className="ms-1 d-none d-sm-inline">Show Pending Deliveries</span>
                                </div>
                            </Link>
                        </>
                    }
                    {userData && userData[0].ROLE == 'CUSTOMER_CARE' &&
                        <Link to="/admin/customer-care" className="nav-link px-0">
                            <div className="d-flex align-items-center">
                                <span className="ms-1 d-none d-sm-inline">Show Return Requests </span>
                            </div>
                        </Link>
                    }
                    <br />
                    <br />
                    {!userData && (
                        <div className="nav-item">
                            <Link className="nav-link" to="/admin/login" style={{ color: "white" }}>
                                Login
                            </Link>
                        </div>
                    )}

                    {userData && (
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="d-none d-sm-inline mx-1">{userData[0].EMAIL_ID}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li>
                                    <Link className="dropdown-item" to="/admin/profile">
                                        <BsPerson /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                                        <BsBoxArrowRight /> Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Add Login History component */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
