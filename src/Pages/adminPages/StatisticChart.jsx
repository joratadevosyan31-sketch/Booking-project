import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { fetchGetStatisticData } from "../../store/slice/StatisticDataState/StatisticApi";
// import { RechartsDevtools } from 'recharts';


const StatisticChart = () => {

    const dispatch = useDispatch()
    const { statisticData } = useSelector(state => state.statisticData)
    console.log("staistic data:", statisticData);

    useEffect(() => {
        if (!statisticData || statisticData.length === 0) {
            dispatch(fetchGetStatisticData())
        }
    }, [dispatch])

    return (
        <AreaChart
            style={{ width: '100%', maxWidth: '900px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={statisticData}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width="auto" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
            {/* <RechartsDevtools /> */}
        </AreaChart>
    )
}

export default StatisticChart