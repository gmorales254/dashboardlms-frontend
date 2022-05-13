import React from 'react';
import "./Graphic.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  interface Propies{
    labels: Array<string|undefined>,
    datasets: Array<number|string|undefined>,
    title: string,
    size: object
  }
  
  const Graphic = ({labels, datasets, title, size}:Propies) => {

    const options = {
      aspectRatio: 1,
      responsive: true,
      scaleOverride:false,
      scaleSteps:9,
      maintainAspectRatio: false,
      backgroundColor: "#B4D455",
      color: "#B4D455",
      plugins: {
        legend: {
          position: 'top' as const,
          display: true,
          labels: {
            color: "#B4D455"
          }
        },
        title: {
          display: false,
          text: title,
          color: "#B4D455"
        },
          subtitle: {
              display: true,
              text: 'Custom Chart Subtitle'
          }
      },
    };
    
    
     const data = {
      labels,
      animation: false,
      datasets: [
        {
          label: title,
          data: datasets,
        },
      ],
    };

    return(
      <div className='ChartContainer' style={size}>
        <Bar options={options} data={data} />
      </div>
    )
  }

  

  export default Graphic;