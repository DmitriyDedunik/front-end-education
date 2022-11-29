import {Divider, List, ListItem, ListItemText, IconButton} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import {useState} from "react";
import {useTaskState} from "../hooks/calendarEffect";

const buttonCalendar = {
    border: '1px solid #00000036',
    borderRadius: '6px',
    margin: '4px'
}

const dayWeekStr = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

export function Calendar() {

    const [numbersArr, setNumbersArr] = useState<Date[]>([])
    const [dayForWeek, setDayForWeek] = useState<Date>(new Date())
    const {selectedDay} = useTaskState()

    const today = new Date()
    const dayWeek = today.getDay()
    const firstDayWeekNumber = today.getDate() - dayWeek + 1;

    const numbers = [];
    const daysInWeek = 7
    for (let i = 0; i < daysInWeek; i++) {
        const day = new Date(today.getFullYear(), today.getMonth(), firstDayWeekNumber + i);
        numbers.push(day)
    }

    if (numbersArr.length == 0) {
        setNumbersArr([...numbers])
    }

    const getTimeString = (time: number) => {
        return (time.toString().padStart(2, "0"))
    }

    const handleWeek = (day: Date, weekUp: boolean) => {

        let nextWeekDay

        if (weekUp) {
            nextWeekDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7)
        } else {
            nextWeekDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7);
        }

        const dayWeek = nextWeekDay.getDay()
        const firstDayWeekNumber = nextWeekDay.getDate() - dayWeek + 1;
        const numbers = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(nextWeekDay.getFullYear(), nextWeekDay.getMonth(), firstDayWeekNumber + i);
            numbers.push(day)
        }
        setNumbersArr([...numbers])
        setDayForWeek(nextWeekDay)

    }

    return (
        <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
            <div style={{textAlign: "center"}} onClick={() => handleWeek(dayForWeek, false)}>
                <IconButton>
                    <ExpandLessIcon/>
                </IconButton>
            </div>
            <List component="nav" aria-label="mailbox folders">
                <Divider/>
                {numbersArr.map((day, index) => (
                        <ListItem sx={buttonCalendar} button divider onClick={() => selectedDay(day)}>
                            <ListItemText primary={
                                `${getTimeString(day.getDate())}.${getTimeString(day.getMonth() + 1)}.${day.getFullYear()} ${dayWeekStr[index]}`
                            }/>
                        </ListItem>
                    )
                )}
                <Divider light/>
            </List>
            <div style={{textAlign: "center"}} onClick={() => handleWeek(dayForWeek, true)}>
                <IconButton>
                    <ExpandMoreIcon/>
                </IconButton>
            </div>
        </div>
    )
}