import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Menu from './Menu';

const Home = () => {
    const { userData, walletStatus, setWalletStatus } = useContext(UserContext);
    const [editing, setEditing] = useState(false); // Track if editing mode is active
    const profileImageSource = userData ? "../" + userData.rows[0].IMAGE : "";
    const [points, setPoints] = useState(0);
    const [editedUserData, setEditedUserData] = useState({}); // Store edited data
    const [reqMoney, setReqMoney] = useState(0)
    useEffect(() => {
        reloadWallet();
    }, [userData, walletStatus]);

    const reloadWallet = async () => {
        try {
            const response = await fetch("http://localhost:3000/getWalletStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
                return;
            }

            const data = await response.json();
            console.log(data.rows[0].TOTAL_CREDITS);
            setWalletStatus(data.rows[0].TOTAL_CREDITS);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = () => {
        // Set edited data to current user data when entering edit mode
        setEditedUserData(userData.rows[0]);
        setEditing(true);
    };

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            // Handle file upload and set image name
            const imageName = files[0] ? files[0].name : '';
            setEditedUserData((prevData) => ({
                ...prevData,
                IMAGE: imageName,
            }));
        } else {
            // Handle regular input fields
            setEditedUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:3000/updateProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedUserData),
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
                return;
            }

            // Update user data with edited data
            setEditedUserData({});
            setEditing(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const requestMoney = async()=>{
        try {
            const response = await fetch("http://localhost:3000/recharge", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({amount:reqMoney}),
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
                return;
            }
            setReqMoney(0);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <Menu />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">FAKESHOP Profile</h5>
                            </div>
                            <div className="card-body">
                                {userData ? (
                                    <div>
                                        {editing ? (
                                            <div>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="firstName"
                                                            name="FIRST_NAME"
                                                            value={editedUserData.FIRST_NAME || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            name="LAST_NAME"
                                                            value={editedUserData.LAST_NAME || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="contact">Contact</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="contact"
                                                            name="CONTACT"
                                                            value={editedUserData.CONTACT || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="image">Profile Image</label>
                                                        <input
                                                            type="file"
                                                            className="form-control-file mx-2"
                                                            id="image"
                                                            name="IMAGE"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <label htmlFor="apartmentNumber">Apartment Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="apartmentNumber"
                                                            name="APARTMENT_NUMBER"
                                                            value={editedUserData.APARTMENT_NUMBER || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="buildingNumber">Building Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="buildingNumber"
                                                            name="BUILDING_NUMBER"
                                                            value={editedUserData.BUILDING_NUMBER || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="street">Street</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="street"
                                                            name="STREET"
                                                            value={editedUserData.STREET || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="area">Area</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="area"
                                                            name="AREA"
                                                            value={editedUserData.AREA || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="city">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="city"
                                                            name="CITY"
                                                            value={editedUserData.CITY || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="EMAIL_ID"
                                                            value={editedUserData.EMAIL_ID || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="postCode">Post Code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="postCode"
                                                            name="POST_CODE"
                                                            value={editedUserData.POST_CODE || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success mt-2 mx-2"
                                                        onClick={handleSave}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2 mx-2"
                                                        onClick={() => setEditing(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="d-flex">
                                                <img
                                                    src={profileImageSource}
                                                    alt="Profile"
                                                    className="mr-3"
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <div className="mb-2">
                                                        <strong>Name:</strong>{' '}
                                                        {userData.rows[0].FIRST_NAME}{' '}
                                                        {userData.rows[0].LAST_NAME}
                                                    </div>
                                                    <div className="mb-2">
                                                        <strong>Email:</strong>{' '}
                                                        {userData.rows[0].EMAIL_ID}
                                                    </div>
                                                    <div className="mb-2">
                                                        <strong>Contact No:</strong>{' '}
                                                        {userData.rows[0].CONTACT}
                                                    </div>
                                                    <div className="mb-2">
                                                        <strong>Post Code:</strong>{' '}
                                                        {userData.rows[0].POST_CODE}
                                                    </div>
                                                    {/* Display other attributes here */}
                                                    <div>
                                                        <strong>Wallet Status:</strong> {walletStatus}
                                                    </div>
                                                    <button
                                                        className="btn btn-success mt-3"
                                                        onClick={handleEdit}
                                                    >
                                                        Edit Profile
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No fetched data available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Points</h5>
                            </div>
                            <div className="card-body">
                                <div className="progress mb-3">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${points}%` }}
                                        aria-valuenow={points}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        {points}%
                                    </div>
                                </div>
                                <p className="mb-0">Points: {points}</p>
                            </div>
                        </div>

                        {/* Reviews and Ratings Card */}
                        <div className="card mt-4">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Reviews and Ratings</h5>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-success mt-2 mx-4">
                                    Add Review
                                </button>
                                <button className="btn btn-warning mt-2">
                                    Show Review
                                </button>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header bg-warning text-white">
                                <h5 className="mb-0">Recharge Request</h5>
                            </div>
                            <form onSubmit={requestMoney}>
                                <div className="card-body">
                                    <input
                                    type="number"
                                    value={reqMoney} 
                                    style={{
                                        border: "2px",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        fontSize: "16px"
                                    }}
                                    onChange={(e)=>{setReqMoney(e.target.value)}}    
                                    />
                                    <button className="btn btn-warning mt-6 mx-4" type = "submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
