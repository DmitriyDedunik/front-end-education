import React, {useEffect, useState} from "react";
import {Typography, Button} from "@mui/material";

export function Timer(){

    const [timer, setTimer] = useState(0)
    const [keepCount, setKeepCount] = useState(false)

    useEffect(()=> {

        if (!keepCount) return;

        const interval = setInterval(() => {
            setTimer(timer + 1);
        }, 1000);

        return () => clearInterval(interval);

    });

    const handleStart = () =>{
        setKeepCount(true)
    }

    const handleStop = () =>{
        setKeepCount(false)
    }

    const handleReset = () =>{
        setTimer(0)
        setKeepCount(false)
    }

    const getTimeString = (time: number) => {
        return(time.toString().padStart(2, "0"))
    }

    const minute = getTimeString(Math.floor(timer / 60));
    const minuteCount = Math.floor(timer / 60);
    const second = getTimeString(timer - minuteCount * 60);

    return(
        <div>
            <Typography variant="h3" textAlign="center">Timer</Typography>
            <div style={{textAlign: "center", fontSize: 120}}>
                <span>{minute}</span>
                <span>:</span>
                <span>{second}</span>
            </div>
            <div style={{textAlign: "center"}}>
                <Button variant="contained" color="success" style={{margin: 10}} onClick={()=> handleStart()}>Start</Button>
                <Button variant="contained" color="error" style={{margin: 10}} onClick={()=> handleStop()}>Stop</Button>
                <Button variant="contained" style={{margin: 10}} onClick={()=> handleReset()}>Reset</Button>
            </div>
        </div>

    )
}