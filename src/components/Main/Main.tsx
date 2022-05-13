import React, { useState, useEffect, useMemo}  from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MonitorIcon from '@mui/icons-material/Monitor';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GraphicView from '../GraphicView/GraphicView';
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import './Main.scss';


const Main = ()=>{
    const [monitor, setMonitor] = useState(String);
    const [epicdata, setEpicData] = useState(Object);
    const epicdataScreens = useMemo(()=> sortingEpicDataScreens(epicdata), [epicdata])
    useEffect(()=>{
        const interval = setInterval(()=>{

            var targetUrl = `${process.env.REACT_APP_UCENV}/forms/DashboardLMS/data.json`

            fetch(targetUrl, {
                method: 'GET', 
                cache: 'no-cache', 
                
            }).then(async (response) =>{ 
                return response.json()
            })
            .then(data=>{
                setEpicData(data)
            });
        }, 10000)
        return ()=> clearInterval(interval);
        

      }, [])

    
    return(
        <>
            {
                Object.keys(epicdata).length ? 
                <>
                    <div className="dashboard__navegation_container">
                        <Box sx={{ width: 500 }}>
                            <BottomNavigation
                                showLabels
                                value={monitor}
                                onChange={(event, newValue) => {
                                let monitorSelected = Object.keys(epicdata).sort()[newValue];
                                setMonitor(monitorSelected);
                                }}
                            >   

                                {epicdataScreens.map((item, index) =>{
                                return <BottomNavigationAction key={item} label={item} icon={<MonitorIcon />} /> 
                                })}
                            </BottomNavigation>
                        </Box>
                        <BottomNavigation>
                                <BottomNavigationAction label="Darkmode" icon={<DarkModeIcon/>} />
                        </BottomNavigation>
                    </div>
                    <div className="dashboard__Graphics_container">
                        <>
                        {
                            monitor ?
                            <GraphicView data={epicdata[monitor] ? epicdata[monitor] : {}}/> : 
                            <div className="nodata-message">
                                <h1>Click on the screen you want to show!</h1>
                            </div>
                        }
                        
                        </>
                    </div>
            </>
                :
            <LinearProgress />
            }
            
        </>
    )
}

export default Main;

function sortingEpicDataScreens(obj: object) {
    return Object.keys(obj).sort();
}
