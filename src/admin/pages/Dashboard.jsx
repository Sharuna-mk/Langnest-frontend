import React, { useEffect, useState } from 'react'
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { allUserAPI, chartLineAPI, chartPieAPI } from '../../services/allAPI';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale, LinearScale, PointElement, LineElement
)


function Dashboard() {
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState(
        {
            userCount: 0,
            premiumUser: 0,
        }
    )
    const [totalrevenue, setTotalRevenue] = useState(0)
    const [language, setlanguage] = useState([])
    const [user, setUser] = useState([])

    const getUserData = async () => {

        const reqheaders = {
            authorization: `Bearer ${token}`
        }
        try {
            const response = await allUserAPI(reqheaders);
            console.log(response);
            setUserData(response.data)
            setTotalRevenue(Math.ceil((response.data.premiumUser) * 199))


        } catch (error) {
            console.log(error);

        }
    }

    //chart

    const piechart = async () => {
        const reqheaders = {
            authorization: `Bearer ${token}`
        }
        try {
            const result = await chartPieAPI(reqheaders);
            console.log(result);
            setlanguage(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const Linechart = async () => {
        const reqheaders = {
            authorization: `Bearer ${token}`
        }
        try {
            const result = await chartLineAPI(reqheaders);
            console.log(result);
            setUser(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log("Line labels:", user.map(i => i.month))
    console.log("Line data:", user.map(i => i.users))
    //pie Chart
    const data = {
        labels: language.map(item => item._id.toLowerCase()),
        datasets: [
            {
                data: language.map(item => item.count),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 1
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'

            }
        }
    }

    //line chart



    useEffect(() => {
        const userToken = sessionStorage.getItem("token")

        if (userToken) {
            setToken(userToken)

        }

    }, [])
    useEffect(() => {
        if (token) {
            getUserData()
            piechart()
            Linechart()
        }
    }, [token])


    return (
        <div>
            <div>

                <div>
                    <div className="flex justify-between items-center gap-5 ms-80 me-10 -mt-45 mb-30">
                        <div className="card shadow bg-white w-100 p-3 rounded-lg border border-gray-300">
                            <div className='flex justify-between items-center'>
                                <h5 className='text-gray-500 text-lg font-semibold'>Total Users</h5>
                                <HiMiniUserGroup />
                            </div>
                            <h1 className='text-xl font-bold'>{userData?.userCount}</h1>
                        </div>
                        <div className="card shadow bg-white w-100 p-3 rounded-lg border border-gray-300">
                            <div className='flex justify-between items-center'>
                                <h5 className='text-gray-500 text-lg font-semibold'>Premium Users</h5>
                                <img src="https://static.vecteezy.com/system/resources/previews/016/774/583/large_2x/3d-user-icon-on-transparent-background-free-png.png"
                                    className='w-5'
                                    alt="" />
                            </div>
                            <h1 className='text-xl font-bold'>{userData?.premiumUser}</h1>
                        </div>
                        <div className="card shadow bg-white w-100 p-3 rounded-lg border border-gray-300">
                            <div className='flex justify-between items-center'>
                                <h5 className='text-gray-500 text-lg font-semibold'>Total Revenue</h5>
                                <FaMoneyCheckDollar />
                            </div>
                            <h1 className='text-xl font-bold'>{totalrevenue}</h1>
                        </div>
                        {/*<div className="card shadow bg-white w-100 p-3 rounded-lg border border-gray-300">
                            <div className='flex justify-between items-center'>
                                <h5 className='text-gray-500 text-lg font-semibold'>Today's Revenue</h5>
                                <FaMoneyCheckDollar />
                            </div>
                            <h1 className='text-xl font-bold'>1000</h1>
                        </div>*/}
                    </div>
                </div>
                <div className="">
                    <div className="card shadow bg-white h-[400px] rounded-lg ms-80 -mt-15 border border-gray-300 p-4 me-5 flex gap-6">

                        <div className="flex-1">
                            <Line
                                data={{
                                    labels: user.map(item =>
                                        `${monthNames[item._id.month - 1]} ${item._id.year}`
                                    ),
                                    datasets: [
                                        {
                                            label: "Users",
                                            data: user.map(item => Number(item.users)), // <-- User count
                                            borderColor: "rgb(75, 192, 192)",
                                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                                            tension: 0.4,
                                            fill: true,
                                            pointRadius: 4
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true }
                                    }
                                }}
                            />
                        </div>

                       
                        <div className="w-[220px] border-l pl-4 flex flex-col justify-center">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                User Summary
                            </h2>

                            <p className="text-sm text-gray-500 mb-3">
                                Monthly user growth overview
                            </p>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400">Total Months</p>
                                    <p className="font-bold">{user.length}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Highest Users in a Month</p>
                                    <p className="font-bold">
                                        {Math.max(...user.map(u => u.users))} users
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Latest Month</p>
                                    <p className="font-bold">
                                        {user.length &&
                                            `${monthNames[user[user.length - 1]._id.month - 1]} 
             ${user[user.length - 1]._id.year}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
            <div className="flex justify-between gap-5">
                <div className="card shadow w-200 bg-white  h-110 rounded-lg ms-80 mt-15 border border-gray-300 p-10 mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        <h1 className="text-lg font-semibold text-gray-800">
                            Used by Language
                        </h1>
                    </div>
                    <Pie
                        data={data}
                        options={options}
                    ></Pie>
                </div>
                <div className="card shadow w-150 bg-white h-100 rounded-lg me-10 mt-15 border border-gray-300">

                </div>

            </div>
        </div>
     
    )
}

export default Dashboard
