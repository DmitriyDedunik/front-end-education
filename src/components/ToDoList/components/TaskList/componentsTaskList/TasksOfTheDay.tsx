import {Button, Checkbox, Grid, Typography} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React from "react";
import {IMarker, ITask} from "../../hooks/calendarEffect";
import styled from "styled-components";

const TaskText = styled(Typography) <{ $isTaskDone: boolean }>`
  font-size: 14px;
  flex: 1 0;
  text-decoration: ${({$isTaskDone}) => ($isTaskDone ? 'line-through' : "none")}`

const taskCellSX = {
    border: '1px solid #00000036',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '5px',
    alignItems: 'center',
    paddingTop: '0px!important'
}

const buttonTask = {
    margin: '5px'
}

type Props = {
    stateTaskArray: ITask[],
    currentDay: Date,
    stateMarkerArray: IMarker[],
    setCheckboxStatus: (id: number) => void,
    editTask: (id: number) => void,
    deleteTask: (id: number) => void,
}
export function TasksOfTheDay(props: Props){
    return(
        <Grid container sx={{width: '100%', margin: '20px'}} spacing={2}>
            {props.stateTaskArray.map((task) => {
                const dayEnd = new Date(
                    props.currentDay.getFullYear(),
                    props.currentDay.getMonth(),
                    props.currentDay.getDate(),
                    23,
                    59,
                    59)
                if (task.dateTask >= props.currentDay && task.dateTask <= dayEnd) {
                    return <Grid item xs={12} sx={taskCellSX} key={task.id}>
                        <BookmarkIcon sx={{color: props.stateMarkerArray[task.idTypeTask].colorTask}}/>
                        <Checkbox checked={task.done} onChange={() => props.setCheckboxStatus(task.id)}/>
                        <TaskText
                            variant="h5"
                            $isTaskDone={task.done}
                        >
                            {task.task}
                        </TaskText>
                        <span>
                                <Button variant="contained" sx={buttonTask} color="warning"
                                        onClick={() => props.editTask(task.id)}>Edit</Button>
                                <Button variant="contained" sx={buttonTask} color="error"
                                        onClick={() => props.deleteTask(task.id)}>Delete</Button>
                                </span>
                    </Grid>
                }
                return null
            })}
        </Grid>
    )
}