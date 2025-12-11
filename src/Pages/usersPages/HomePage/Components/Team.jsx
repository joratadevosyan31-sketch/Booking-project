import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetEmployeesData } from "../../../../store/slice/EmployeesDataState/EmployeeApi"


const Team = () => {

    const dispatch = useDispatch()

    const { employeesData } = useSelector(state => state.employeesData)

    useEffect(() => {
        if (!employeesData || employeesData.length === 0) {
            dispatch(fetchGetEmployeesData())
        }
    }, [dispatch])


    return (
        <div className="py-10" id="team">
            <div className="container">
                <div className="mb-8">
                    <h2 className="text-[48px] font-bold">Team</h2>
                </div>
                <div className="grid grid-cols-6 items-start  justify-between gap-9">
                    {
                        employeesData.map((emp, ind) => (
                            <div key={ind} className="flex flex-col items-center justify-center gap-2">
                                <img src={`${emp.img}`} className="size-18 object-cover rounded-full" />
                                <h4 className="text-[20px] font-bold">{emp.name}</h4>
                                <p className="text-[18px]">{emp.profession}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Team