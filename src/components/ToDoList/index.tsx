import React, {FC, useState} from 'react';
import {Grid, Typography} from "@mui/material";

import {TaskList} from "./components/TaskList/TaskList";
import {Calendar} from "./components/Calendar/Calendar";
import {ITask, useMarker, useTaskState} from "./components/hooks/calendarEffect";

const topGrid = {
    marginTop: '100px',
    maxWidth: '1200px',
    margin: 'auto',
    flexWrap: 'nowrap'
}

export const ToDoList: FC = () => {

    const [currentDay, setCurrentDate] = useState<Date>(new Date())
    const {stateTaskArray, setStateTaskArray} = useTaskState()
    const { stateMarkerArray } = useMarker()

    const getCurrentDayTasks = (day: Date): ITask[] => {
        return stateTaskArray.filter(el => {
                const dayEnd = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate(),
                    23,
                    59,
                    59
                )
                return el.dateTask >= day && el.dateTask <= dayEnd
            }
        );
    }

    const tasksByColors = (day: Date): number[] => {

        const currentDayTasks = getCurrentDayTasks(day)

        let colorsArr: number[] = []

        currentDayTasks.forEach(el => {
            if(colorsArr.indexOf(el.idTypeTask) === -1 && !el.done){
                colorsArr.push(el.idTypeTask)
            }
        })

        return colorsArr

    }

    return (
        <>
            <Typography variant="h3" textAlign="center">TodoList</Typography>
            <Grid container spacing={2} sx={topGrid}>
                <Calendar setCurrentDate={setCurrentDate}
                          tasksByColors = {tasksByColors}
                />
                <TaskList currentDay={currentDay}
                          setStateTaskArray={setStateTaskArray}
                          stateTaskArray={stateTaskArray}
                          stateMarkerArray = {stateMarkerArray}
                />
            </Grid>
        </>
    )

}