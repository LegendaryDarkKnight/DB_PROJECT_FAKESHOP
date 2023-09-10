import Sidebar from './Sidebar'
import LoginHistory from './LoginHistory'
import LoginChart from './LoginChart'

const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar></Sidebar>
                    <LoginChart/>
                </div>
            </div>
        </>
    )
}

export default Home