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

        if(windowSize.width < 1000){
            console.log('tablet o celular');
        }else if(windowSize.width >= 1000 && windowSize.width <= 2400){
            console.log('tamaño PC');
            if(data.length === 1){
                widthResize = "100%";
                heightResize = "100%";
                
            }else if(data.length <= 6){
                widthResize = `${windowSize.width / data.length}px`
                heightResize = `100%`
            }else if(data.length > 6 && data.length <= 12){
                //let div = windowSize.width / 6;
                widthResize = `${240/*6 charts per row*/}px`
                heightResize = `${(windowSize.height / 2) - 50 /*50px = Header height buttons, 2 = number of rows*/}px`
            }else{
                widthResize = `${windowSize.width / data.length}px`
                heightResize = `${(windowSize.height / 2) - 50 /*50px = Header height buttons*/}px`
            }
        }else if(windowSize.width > 2400){
            console.log('TV')
        }
        setResize({
            width: widthResize,
            height: heightResize
        })
    },[windowSize])

    
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