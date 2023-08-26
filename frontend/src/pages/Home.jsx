import { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import Menu from './Menu';

const Home = () => {
  const { userData, setUserData, walletStatus, setWalletStatus } = useContext(UserContext)
  const profileImageSource = userData ? "../" + userData.rows[0].IMAGE : "";

  useEffect(() => {
    reloadData()
      .then(() => reloadWallet())
      .catch(error => {
        console.error("An error occurred:", error);
      });
  }, []);
  const reloadData = async () => {
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
  return (
    <>
    <Menu></Menu>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">FAKESHOP Profile</h5>
              </div>
              <div className="card-body">
                {userData ? (
                  <div className="d-flex">
                    <img
                      src={profileImageSource}
                      alt="Profile"
                      className="mr-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <div className="d-flex flex-column">
                      <div className="mb-2">
                        <strong>Name:</strong> {userData.rows[0].FIRST_NAME}{' '}
                        {userData.rows[0].LAST_NAME}
                      </div>
                      <div className="mb-2">
                        <strong>Email:</strong> {userData.rows[0].EMAIL_ID}
                      </div>
                      <div className="mb-2">
                        <strong>Contact No:</strong> {userData.rows[0].CONTACT}
                      </div>
                      <div className="mb-2">
                        <strong>Address:</strong> {userData.rows[0].APARTMENT_NUMBER}, {userData.rows[0].AREA}, {userData.rows[0].CITY}
                      </div>
                      {/* Wallet Status */}
                      <div>
                        <strong>Wallet Status:</strong> {walletStatus}
                      </div>
                      <button className="btn btn-success mt-3" >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>No fetched data available</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>My Account</h5>
                <ul className="list-group">
                  {/* Hover Animation */}
                  <li
                    className="list-group-item"
                    style={{
                      background: 'grey',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <a
                      href="#"
                      className="text-light text-decoration-none"
                      style={{ display: 'block' }}
                      onMouseEnter={e => (e.target.style.backgroundColor = 'grey')}
                      onMouseLeave={e =>
                        (e.target.style.backgroundColor = '#303030')
                      }
                    >
                      My Cart
                    </a>
                  </li>
                  {/* Hover Animation */}
                  <li
                    className="list-group-item"
                    style={{
                      background: 'grey',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <a
                      href="#"
                      className="text-light text-decoration-none"
                      style={{ display: 'block' }}
                      onMouseEnter={e => (e.target.style.backgroundColor = '#FFA500')}
                      onMouseLeave={e =>
                        (e.target.style.backgroundColor = '#303030')
                      }
                    >
                      Purchased Products
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;