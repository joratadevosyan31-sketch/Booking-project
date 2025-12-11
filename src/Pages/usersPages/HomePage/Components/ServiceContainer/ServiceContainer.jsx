
import Services from './Components/Services'
import ServiceCard from './Components/ServiceCard'

const ServiceContainer = () => {
    return (
        <div className="container flex gap-6 pt-7">
            <div className="w-3/5 overflow-y-auto ">
                <Services />
            </div>
            <div className="w-2/5 sticky top-28 h-fit">
                <ServiceCard />
            </div>
        </div>
    )
}

export default ServiceContainer