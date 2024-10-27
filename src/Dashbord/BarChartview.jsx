import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function BarChartview({ data }) {


    const useDataValidation = (data) => {
        return Array.isArray(data) && data.length > 0;
    };

    if (!useDataValidation(data)) {
        return <div>No data available.</div>;
    }

    const numberOfCount = data.reduce((acc, curr) => {
        if (curr.Make) {
            acc[curr.Make] = (acc[curr.Make] || 0) + 1;
        }
        return acc;
    }, {});

    const Chart = {
        labels: Object.keys(numberOfCount),
        datasets: [
            {
                label: 'Vehicle Count Based On Their Make',
                data: Object.values(numberOfCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
            }
        ]
        
    };


    return (
        <>
            <h2>Vehicle Make Distribution</h2>
            <div style={{ width: '100%', height: '400px' }}>
                <Bar data={Chart} />
            </div>


        </>
    )
}

export default BarChartview;
