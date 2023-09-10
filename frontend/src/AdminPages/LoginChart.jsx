import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LoginChart = () => {
  // State to store data from the backend

  const [data, setData] = useState();
  const fetchdata = async()=>{
    try {
      const response = await fetch('http://localhost:3000/admin/dailylogin',{
        method: "GET",
        headers:
        {
          "Content-type": "application/json",
        },
        credentials: 'include',
      })
      if(response.ok){
        const data1 = await response.json();
        setData(data1.rows);
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    // Fetch data from your backend API
    fetchdata();
  }, []);

  return (
    <div>
        <br/>
      <h2>Login Count Over Time</h2>
         <br/>   
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="LOGIN_DATE" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="LOGIN_COUNT" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default LoginChart;