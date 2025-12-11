import Navigation from "../../../Components/usersComponents/Navigation/Navigation"
import About from "./Components/About"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import ServiceContainer from "./Components/ServiceContainer/ServiceContainer"
import Team from "./Components/Team"

const Home = () => {

    return (
        <div>
            <Navigation />
            <Header />
            <ServiceContainer />
            <Team />
            <About />
            <Footer />
        </div>
    )
}

export default Home