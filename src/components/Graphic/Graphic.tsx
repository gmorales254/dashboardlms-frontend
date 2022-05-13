import React, {useState, useEffect} from 'react';
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

  interface Size{
    width: string,
    height: string
  }
  
  const Graphic = ({labels, datasets, title, size}:Propies) => {

    const options = {
      aspectRatio: 1,
      responsive: true,
      scaleOverride:false,
      scaleSteps:9,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          display: true,
          labels: {
            color: "#f0f8ff"
          }
        },
        title: {
          display: false,
          text: title,
          color: "#f0f8ff"
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