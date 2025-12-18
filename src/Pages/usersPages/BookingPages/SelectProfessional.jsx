import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetEmployeesData } from "../../../store/slice/EmployeesDataState/EmployeeApi"
import { setProfessional } from "../../../store/slice/BookingCardDataState/BookingCardDataSlice"
import CheckedIcon from "../../../Components/icons/CheckedIcon"

const SelectProfessional = () => {

    const dispatch = useDispatch()

    const { subServices, employee } = useSelector(state => state.bookingCardData)
    const { employeesData } = useSelector(state => state.employeesData)

    useEffect(() => {
        if (!employeesData || employeesData.length === 0) {
            dispatch(fetchGetEmployeesData())
        }
    }, [dispatch])

    console.log(employeesData);

    const matchedEmployee = employeesData.filter(emp => {
        if (!subServices || subServices.length === 0) {
            return false;
        }
        return subServices.every(selectedSub =>
            emp.subServices.some(empSub => empSub._id === selectedSub._id)
        );
    });

    const handleSelectProfesional = (prof) => {
        dispatch(setProfessional(prof))
    }

    return (
        <div>
            <div>
                <div>
                    <h2 className='text-[48px] font-bold mb-6'>Select Professional</h2>
                </div>
                <div className='flex flex-col gap-4'>
                    {/* <div className='flex items-center justify-between border-[2px] border-gray p-6 rounded-[18px]'>
                        <div className='flex items-center  gap-3'>
                            <div>
                                <svg className='size-16' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.6 18.8a1 1 0 0 1-1.4-.2A6.45 6.45 0 0 0 24 16a1 1 0 0 1 0-2 3 3 0 1 0-2.905-3.75 1 1 0 0 1-1.937-.5 5 5 0 1 1 8.217 4.939 8.5 8.5 0 0 1 3.429 2.71A1 1 0 0 1 30.6 18.8m-6.735 7.7a1 1 0 1 1-1.73 1 7.125 7.125 0 0 0-12.27 0 1 1 0 1 1-1.73-1 9 9 0 0 1 4.217-3.74 6 6 0 1 1 7.296 0 9 9 0 0 1 4.217 3.74M16 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7-7a1 1 0 0 0-1-1 3 3 0 1 1 2.905-3.75 1 1 0 0 0 1.938-.5 5 5 0 1 0-8.218 4.939 8.5 8.5 0 0 0-3.425 2.71A1 1 0 1 0 2.8 18.6 6.45 6.45 0 0 1 8 16a1 1 0 0 0 1-1"></path></svg>
                            </div>
                            <img src="" alt="" className='size-20 rounded-full' />
                            <div className='flex flex-col gap-2'>
                                <h3>Any Professional</h3>
                                <span>for maximum availablility</span>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className={`py-3 px-5 rounded-[25px] border-[1px] boder-gray bg-white `}
                            >
                                Select
                            </button>
                        </div>
                    </div> */}

                    {
                        matchedEmployee.map((emp, ind) => {
                            const isSelected = employee && employee._id === emp._id
                            return (
                                <div
                                    key={ind}
                                    className={`flex items-center justify-between border-[2px] border-gray p-6 rounded-[18px] ${isSelected ? 'border-purple-800' : 'border-gray'}`}
                                >
                                    <div className='flex items-center  gap-3'>
                                        {/* <div>
                                        <svg className='size-16' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.6 18.8a1 1 0 0 1-1.4-.2A6.45 6.45 0 0 0 24 16a1 1 0 0 1 0-2 3 3 0 1 0-2.905-3.75 1 1 0 0 1-1.937-.5 5 5 0 1 1 8.217 4.939 8.5 8.5 0 0 1 3.429 2.71A1 1 0 0 1 30.6 18.8m-6.735 7.7a1 1 0 1 1-1.73 1 7.125 7.125 0 0 0-12.27 0 1 1 0 1 1-1.73-1 9 9 0 0 1 4.217-3.74 6 6 0 1 1 7.296 0 9 9 0 0 1 4.217 3.74M16 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7-7a1 1 0 0 0-1-1 3 3 0 1 1 2.905-3.75 1 1 0 0 0 1.938-.5 5 5 0 1 0-8.218 4.939 8.5 8.5 0 0 0-3.425 2.71A1 1 0 1 0 2.8 18.6 6.45 6.45 0 0 1 8 16a1 1 0 0 0 1-1"></path></svg>
                                    </div> */}
                                        <img src={emp.img} alt="" className='size-20 rounded-full' />
                                        <div className='flex flex-col gap-2'>
                                            <h3>{emp.name}</h3>
                                            <span>{emp.profession}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSelectProfesional(emp)
                                            }}
                                            type="button"
                                            className={`p-3 rounded-[16px] border-[1px] ${isSelected ? 'bg-purple-800 border-white' : 'boder-gray'}`}
                                        >
                                            {
                                                isSelected ? (
                                                    <CheckedIcon />
                                                ) : (
                                                    <span>Select</span>
                                                )
                                            }

                                        </button>
                                    </div>
                                </div>
                            )

                        })

                    }
                </div>
            </div>
        </div >
    )
}

export default SelectProfessional