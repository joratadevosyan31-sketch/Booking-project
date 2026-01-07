import { Rate } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetSalonData } from "../../../store/slice/SalonDataState/SalonApi";

const BookingSalonInfo = () => {
  const dispatch = useDispatch();
  const { salonData } = useSelector((state) => state.salonData);

  useEffect(() => {
    if (!salonData || salonData.length === 0) {
      dispatch(fetchGetSalonData());
    }
  }, [dispatch, salonData]);



  const isSalonOpen = (start, end) => {
    if (!start || !end) return false

    const now = new Date()

    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)

    const startTime = new Date()
    startTime.setHours(startHour, startMinute, 0)

    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0)

    return now >= startTime && now <= endTime
  }

  const isOpen = isSalonOpen(salonData?.workStart, salonData?.workEnd)


  return (
    <div className="flex items-center gap-5">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewkZtH3IPZPy6nPrOBmwY42zlVFKcZAPSkw&s"
        alt=""
        className="object-cover size-24 rounded-[12px]"
      />
      <div className="flex flex-col gap-2 ">
        <h1 className="text-[24px] font-bold">{salonData.name}</h1>
        <div className="flex flex-col gap-1 text-[20px]">
          <div className="flex items-center gap-1">
            <span>5.0</span>
            <Rate disabled defaultValue={5} />
            <span className="text-purple-600">(2340)</span>
          </div>
          {
            isOpen ? (
              <p className="text-green-700">{`Open until ${salonData.workEnd}`}</p>
            ) : (
              <p className="text-red-500">Closed until {salonData?.workStart}</p>
            )
          }
          <p>{salonData.address}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSalonInfo;
