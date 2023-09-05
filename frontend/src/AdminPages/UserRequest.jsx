import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
function UserRequest() {
    const [requestData, setRequestData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from your API and update the state
        fetch('http://localhost:3000/admin/getRechargeOrder', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setRequestData(data.rows);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        console.log(requestData)
    }, []); // Empty dependency array to ensure the effect runs only once

    const handleApproveClick = async (id, event) => {
        event.preventDefault(); // Prevent the default form submission
        // Implement logic to handle the "Approve" button click for the specific user
        // You can make another API request or update the state as needed
        const response = await fetch('http://localhost:3000/admin/acceptrecharge',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id}),
            credentials: 'include'
        });
        if(!response.ok){
            alert('Failed');
            return;
        }
        alert(`Granted`);
        // navigate('/admin/userrequests');
        window.location.reload();
    };

    return (
        <div style={{maxHeight: "100vh", maxWidth:"80vw",overflowX: "auto",overflowY: "auto"}}>
            <h1>User Request Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>USER_ID</th>
                        <th>REQUEST_TIME</th>
                        <th>REQUEST_AMOUNT</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.USER_ID}</td>
                            <td>{item.REQUEST_TIME}</td>
                            <td>{item.REQUEST_AMOUNT}</td>
                            <td>
                                <form onSubmit={(event) => handleApproveClick(item.REQUEST_ID, event)}>
                                    <button type="submit" className="btn-success">
                                        Approve
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
function TableBody(){
    return (
      <>
          <div className="container-fluid">
              <div className="row flex-nowrap">
                  <Sidebar></Sidebar>
                  <UserRequest/>
              </div>
          </div>
      </>
  )
  }
export default TableBody;
