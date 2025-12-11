import { Rate } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetSalonData } from '../../../../store/slice/SalonDataState/SalonApi'


const Header = () => {

    const dispatch = useDispatch()

    const { salonData } = useSelector(state => state.salonData)
    useEffect(() => {
        if (!salonData || salonData.length === 0) {
            dispatch(fetchGetSalonData())
        }
    }, [])
    // console.log(salonData);

    return (
        <header className=''>
            <div className='container flex flex-col gap-6'>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-[48px] font-bold'>{salonData.name}</h1>
                    <div className='flex items-center gap-3 text-[20px]'>
                        <span>5.0</span>
                        <Rate disabled defaultValue={5} />
                        <span>2340</span>
                        <span>.</span>
                        <p>{`Open Until ${salonData.workEnd}`}</p>
                        <p>Gazar Parpetsi St, Yerevan</p>
                        <a href="https://www.google.com/maps?daddr=+9+Ghazar+Parpetsi+St,+8,+Yerevan,+0002" className='text-purple-950'>Get Direction</a>
                    </div>
                </div>
                <div className="grid [grid-template-columns:2fr_1fr] gap-9">
                    <div className="row-span-2">
                        <img
                            src="src/assets/images/c7cc15f7-2ee0-4a05-a82a-e77823944aa3.avif"
                            alt=""
                            className="object-cover rounded-[12px] h-full w-full"
                        />
                    </div>

                    <div>
                        <img
                            src="src/assets/images/3b4560a2-8ad1-4f27-aeb0-1a1aced5d3f4.avif"
                            alt=""
                            className="object-cover rounded-[12px] w-full h-full"
                        />
                    </div>

                    <div>
                        <img
                            src="src/assets/images/32380fd0-8170-4200-90f5-d18c29ebe7d6.avif"
                            alt=""
                            className="object-cover rounded-[12px] w-full h-full"
                        />
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header