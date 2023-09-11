import Sidebar from './Sidebar'
import Dashboard from '../pages/Test'
import LoginChart from './LoginChart'
import { useEffect , useState} from 'react';
const Home = () => {
  const [someData, setSomeData] = useState(null);
  useEffect(() => {
    let isCurrent = true;

        fetch(`http://localhost:3000/admin/somedata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then((data) => {
                if (isCurrent) {
                    setSomeData(data.rows);
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
  }, [])
  
    return (
      <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <Sidebar></Sidebar>
            <div className="main-content">
              <LoginChart />
              <br/>
              <br/>
              {someData && <Dashboard totalProducts={someData[0].TOTAL_PRODUCTS} totalUsers={someData[0].TOTAL_USERS} totalShops={someData[0].TOTAL_SHOPS}/>}
            </div>
          </div>
        </div>
      </>
    );
  };
  
export default Home;
