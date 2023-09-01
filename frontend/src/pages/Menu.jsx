import { Link, useNavigate } from "react-router-dom";
import '../styles/Menu.css'
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
const NavLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "#74ee15" }}
        >
            {children}
        </Link>
    );
};
export default function Menu() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    // const reloadUserData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/getUserData`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: 'include',
    //         });

    //         if (!response.ok) {
    //             console.error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         setUserData(data);
    //     } catch (error) {
    //         console.log("Error:", error);
    //     }

    // }
    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/getUserData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }).then(res => res.json())
            .then((userData) => {
                if (isCurrent) {
                    setUserData(userData);
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the fetch request
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                isCurrent = false; // Make sure to set isCurrent to false in the finally block
            });

        return () => {
            isCurrent = false; // Set isCurrent to false when the effect cleanup is performed
        };
        // reloadUserData();
        // console.log(userData.rows[0].USER_TYPE)
    }, [])
    const handleLogout = async () => {
        // Perform any additional logout actions here
        // For example, clearing local storage, sending API requests, etc.


        try {
            const response = await fetch(`http://localhost:3000/logout`, {
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
        navigate('/');
    };
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg " style={{ backgroundColor: "black" }} >
                <div className="container-fluid" >
                    <Link className="navbar-brand" to={`/`} style={{ color: "white" }}>
                        FakeSHOP
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <div className="navbar-nav me-auto mb-2 mb-lg-0" role="search" >

                        </div>
                        <ul className="navbar-nav d-flex " >
                            <li className="nav-item" >
                                <Link className="nav-link" aria-current="page" to={`/`} style={{ color: "white" }}>
                                    Search Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`} style={{ color: "white" }}>
                                    Top Deals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`} style={{ color: "white" }}>
                                    Shops
                                </Link>
                            </li>
                            {!userData && <li className="nav-item">
                                <Link className="nav-link" to={`/login`} style={{ color: "white" }}>
                                    Login/Register
                                </Link>
                            </li>}
                            {userData && userData.rows[0].USER_TYPE == 'CUSTOMER' && <li className="nav-item dropdown">
                                {/* <Link
                                    className="nav-link dropdown-toggle"
                                    to={`/`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {userData.rows[0].EMAIL_ID}
                                </Link> */}
                                <NavLink to='/'>{userData.rows[0].EMAIL_ID}</NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/home`}>
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/order`}>
                                            My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/cart`}>
                                            My Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/`} onClick={handleLogout}>
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </li>}
                            {/*  */}
                            {userData && userData.rows[0].USER_TYPE == 'SHOP' && <li className="nav-item dropdown">
                                {/* <Link
                                    className="nav-link dropdown-toggle"
                                    to={`/`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {userData.rows[0].EMAIL_ID}
                                </Link> */}
                                <NavLink to='/'>{userData.rows[0].EMAIL_ID}</NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/home`}>
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/myShop`}>
                                            My Shop
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/myProducts`}>
                                            My Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/cart`}>
                                            Track Purchases
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/`} onClick={handleLogout}>
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </li>}
                            {/*  */}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}