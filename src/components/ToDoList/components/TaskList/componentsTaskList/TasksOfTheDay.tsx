import { Button, Checkbox, Grid, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IMarker, ITask } from "../../hooks/calendarEffect";
import styled from "styled-components";

const TaskText = styled(Typography) <{ $isTaskDone: boolean }>`
  font-size: 14px;
  flex: 1 0;
  text-decoration: ${({ $isTaskDone }) => ($isTaskDone ? 'line-through' : "none")}`

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
    setStateTaskArray: Dispatch<SetStateAction<ITask[]>>,
}
export function TasksOfTheDay(props: Props) {

    const [firstId, setFirstId] = useState<number>(0)
    // function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: number) {
    //     console.log(card)
    // }

    // function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    //     console.log('leave')
    // }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>, card: number) {
        console.log('end')
        console.log(card)
        moveElements(card)
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        console.log(e.target)
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, card: number) {
        e.preventDefault();
        setFirstId(card)
        console.log('firstId')
        console.log(card)
    }

    function moveElements(endId: number) {
        const newArrayTask = [...props.stateTaskArray]
        if (endId > firstId) {
            newArrayTask.splice(firstId, 0, newArrayTask[endId])
            newArrayTask.splice(endId + 1, 1)
        }
        else {
            newArrayTask.splice(firstId + 1, 0, newArrayTask[endId])
            newArrayTask.splice(endId, 1)
        }

        props.setStateTaskArray([...newArrayTask])
    }

    return (
        <Grid container sx={{ width: '100%', margin: '20px' }} spacing={2}>
            {props.stateTaskArray.map((task, index) => {
                const dayEnd = new Date(
                    props.currentDay.getFullYear(),
                    props.currentDay.getMonth(),
                    props.currentDay.getDate(),
                    23,
                    59,
                    59)
                if (task.dateTask >= props.currentDay && task.dateTask <= dayEnd) {
                    return <Grid
                        draggable="true"
                        //onDragStart={e => dragStartHandler(e, task.id)}
                        //onDragLeave={e => dragLeaveHandler(e)}
                        onDragEnd={e => dragEndHandler(e, index)}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropHandler(e, index)}
                        item xs={12}
                        sx={taskCellSX}
                        key={task.id}
                    >
                        <BookmarkIcon sx={{ color: props.stateMarkerArray[task.idTypeTask].colorTask }} />
                        <Checkbox checked={task.done} onChange={() => props.setCheckboxStatus(task.id)} />
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