import { useEffect } from "react"
import { useSelector } from "react-redux"
import { fetchGetBookings } from "../../store/slice/BookingsDataState/BookingsDataApi"

const BookingTable = () => {

    const { bookingsData } = useSelector(state => state.bookingsData)


    useEffect(() => {
        if (!bookingsData) {
            dispatchEvent(fetchGetBookings())
        }
    }, [])

    console.log(bookingsData);
    return (
        <div>
            <div>
                {
                    bookingsData?.map((book, ind) => (
                        <div key={ind}>
                            booking data
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default BookingTable