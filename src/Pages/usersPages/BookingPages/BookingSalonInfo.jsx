import { Rate } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetSalonData } from '../../../store/slice/SalonDataState/SalonApi'

const BookingSalonInfo = () => {

    const dispatch = useDispatch()
    const { salonData } = useSelector(state => state.salonData)

    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData())
        }
    }, [dispatch])

    return (
        <div className='flex items-center gap-5'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewkZtH3IPZPy6nPrOBmwY42zlVFKcZAPSkw&s" alt="" className='object-cover size-24 rounded-[12px]' />
            <div className='flex flex-col gap-2 '>
                <h1 className='text-[24px] font-bold'>{salonData.name}</h1>
                <div className='flex flex-col gap-1 text-[20px]'>
                    <div className='flex items-center gap-1'>
                        <span>5.0</span>
                        <Rate disabled defaultValue={5} />
                        <span className='text-purple-600'>(2340)</span>
                    </div>
                    <p className='text-green-700'>{`Open until ${salonData.workEnd}`}</p>
                    <p>{salonData.address}</p>
                </div>
            </div>
        </div>
    )
}

export default BookingSalonInfo