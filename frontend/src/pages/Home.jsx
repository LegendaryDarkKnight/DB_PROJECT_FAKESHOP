import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  // Check if fetchedData is available in location state
  const fetchedData = location.state && location.state.fetchedData;
  const profileImageSource = fetchedData ? "../" + fetchedData.rows[0][6] : "";
  const [walletStatus, setWalletStatus] = useState(fetchedData ? fetchedData.rows[0][11] : '');

  // Function to reload wallet status
  const reloadWallet = async () => {
    try {
      const response = await fetch("http://localhost:3000/getWalletStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: fetchedData.rows[0][0] }),
      });

      if (!response.ok) {
        console.error("Network response was not ok");
        return;
      }

      const data = await response.json();
      setWalletStatus(data.rows[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">FAKESHOP Profile</h5>
            </div>
            <div className="card-body">
              {fetchedData ? (
                <div className="d-flex">
                  <img
                    src={profileImageSource}
                    alt="Profile"
                    className="mr-3"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <strong>Name:</strong> {fetchedData.rows[0][1]}{' '}
                      {fetchedData.rows[0][2]}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {fetchedData.rows[0][13]}
                    </div>
                    <div className="mb-2">
                      <strong>Contact No:</strong> {fetchedData.rows[0][5]}
                    </div>
                    <div className="mb-2">
                      <strong>Address:</strong> {fetchedData.rows[0][9]}, {fetchedData.rows[0][8]}, {fetchedData.rows[0][10]}
                    </div>
                    {/* Wallet Status */}
                    <div>
                      <strong>Wallet Status:</strong> {walletStatus}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={reloadWallet}>
                      Reload Wallet
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
                    background: '#303030',
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
                    My Cart
                  </a>
                </li>
                {/* Hover Animation */}
                <li
                  className="list-group-item"
                  style={{
                    background: '#303030',
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
  );
};

export default Home;
