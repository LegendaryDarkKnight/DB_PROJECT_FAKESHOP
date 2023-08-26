import { Link } from "react-router-dom";
import '../styles/Menu.css'
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
export default function Menu() {
    const {userData,setUserData} = useContext(UserContext);
    const reloadUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getUserData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("Error:", error);
    }

  }
    useEffect(() => {
        reloadUserData();
      },[])
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
        // Clear the user data context
        setUserData(null);
        // Redirect to a desired route after logging out
        // Redirect to the home page
    };
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>
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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0" role="search">
                            
                        </div>
                        <ul className="navbar-nav d-flex ">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`}>
                                    Search Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`}>
                                    Top Deals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`}>
                                    Shops
                                </Link>
                            </li>
                            {!userData && <li className="nav-item">
                                <Link className="nav-link" to={`/login`} >
                                    Login/Register
                                </Link>
                            </li>}
                            {userData && <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={`/`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {userData.rows[0].EMAIL_ID}
                                </Link>
                                 <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/home`}>
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/`}>
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
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}