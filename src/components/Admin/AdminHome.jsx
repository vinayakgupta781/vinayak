import React from 'react'
import 
{  BsFillGrid3X3GapFill, BsPeopleFill, }
 from 'react-icons/bs'
 import { FaMountain, FaPlaneArrival } from 'react-icons/fa';
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function AdminHome() {

    const data = [
        {
          name: 'Mahabodhi Temple',
          pv: 8,
          uv: 8000,
          amt: 2400,
        },
        {
          name: 'Buddha Statue',
          pv: 4,
          uv: 4000,
          amt: 2210,
        },
        {
          name: 'Tergar Monastery',
          pv: 6,
          uv: 6000,
          amt: 2290,
        },
        {
          name: 'Metta Buddharam Temple',
          pv: 9,
          uv: 9000,
          amt: 2000,
        },
        {
          name: 'Tergar Monastery',
          pv: 8,
          uv: 8000,
          amt: 2181,
        },
        {
          name: 'Glass Bridge',
          pv: 3,
          uv: 3000,
          amt: 2500,
        },
        {
          name: 'Ashokan Pillar',
          pv: 5,
          uv: 5000,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card1'>
                <div className='card-inner'>
                    <h3>Tours</h3>
                    <FaMountain className='card_icon'/>
                </div>
                <h1>30</h1>
            </div>
            <div className='card1'>
                <div className='card-inner'>
                    <h3>Customized Packages</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card1'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card1'>
                <div className='card-inner'>
                    <h3>Tour Booked</h3>
                    <FaPlaneArrival className='card_icon'/>
                </div>
                <h1>30</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default AdminHome

