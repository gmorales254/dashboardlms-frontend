import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useResize";
import Graphic from "../Graphic/Graphic";
import "./GraphicView.scss"

interface Props{
 data: any|undefined
}

const GraphicView = ({data}:Props)=>{
    //data = Specfic screen selected and loaded | typeOf = Object
    const [resize, setResize] = useState({
        width: '600px',
        height: '400px'
    })
    const windowSize = useWindowSize();

    useEffect(()=>{
        console.log(windowSize)
        let widthResize: string = "600px";
        let heightResize: string = "400px";
        let chartCount = Object.keys(data).length
        if(windowSize.width < 1000){
            console.log('tablet o celular');
        }else if(windowSize.width >= 1000 && windowSize.width <= 2400){
            console.log('tamaño PC');
            if(chartCount === 1){
                widthResize = "100%";
                heightResize = "100%";
                
            }else if(chartCount <= 6){
                widthResize = `${windowSize.width / chartCount}px`;
                heightResize = `100%`;
            }else if(chartCount > 6 && chartCount <= 12){
                let div = windowSize.width / 6;
                widthResize = `${div}px`;
                heightResize = `${(windowSize.height / 2) - 50 /*50px = Header height buttons, 2 = number of rows*/}px`
            }else{
                widthResize = `260px`
                heightResize = '200px'//`${(windowSize.height / 2) - 50 /*50px = Header height buttons*/}px`
            }

        }else if(windowSize.width > 2400){
            if(chartCount === 1){
                widthResize = "100%";
                heightResize = "100%";
                
            }else if(chartCount <= 6){
                widthResize = `${windowSize.width / chartCount}px`;
                heightResize = `100%`;
            }else if(chartCount > 6 && chartCount <= 12){
                let div = windowSize.width / 6;
                widthResize = `${div}px`;
                heightResize = `${(windowSize.height / 2) - 50 /*50px = Header height buttons, 2 = number of rows*/}px`
            }else{
                widthResize = `260px`
                heightResize = '200px'//`${(windowSize.height / 2) - 50 /*50px = Header height buttons*/}px`
            }

        }

        setResize({
            width: widthResize,
            height: heightResize
        })
    },[data, windowSize])

    
    console.log(data)
    
            return(
                <div className="ChartViewContainer">
                    {data &&
                        <>{Object.keys(data).map((item, inx)=>{
                            return <Graphic labels={data[item].labels} key={inx} title={item} datasets={data[item].datasets} size={resize}/>
                        })}</>
                    }
                </div>
            )
               
}

export default GraphicView