import { Link } from "react-router-dom";
import '../styles/Menu.css'
import { useState } from "react";
export default function Menu() {
    const [logged,changelog] = useState(false);
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>
                        FAkeshOP
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
                        <form className="navbar-nav me-auto mb-2 mb-lg-0" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <ul className="navbar-nav d-flex">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/`}>
                                    Shops
                                </Link>
                            </li>
                            {!logged && <li className="nav-item">
                                <Link className="nav-link" to={`/login`} >
                                    Login
                                </Link>
                            </li>}
                            {logged &&<li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={`/`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </Link>
                                 <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/`}>
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/`}>
                                            Another action
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/`}>
                                            Something else here
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