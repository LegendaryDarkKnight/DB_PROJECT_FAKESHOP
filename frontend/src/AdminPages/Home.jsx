import Sidebar from './Sidebar'
import LoginHistory from './LoginHistory'

const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar></Sidebar>
                    <LoginHistory/>
                </div>
            </div>
        </>
    )
}

export default Home