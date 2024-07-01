// components/InterviewChart.js
"use client"
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InterviewChart = ({ data }) => {

    const [chartData, setData] = useState();
    useEffect(() => {
        setData(data);
    }, [data])

    return (
        <ResponsiveContainer className='flex justify-center items-center' width="100%" height={400}>
            {
                chartData && <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                   
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateCreated" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rating" stroke="#FF7F3E" />
                </LineChart>
            }

        </ResponsiveContainer>
    );
};

export default InterviewChart;