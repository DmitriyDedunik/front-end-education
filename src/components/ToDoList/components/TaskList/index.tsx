import React, {useState} from "react";
import {Box, Button, Checkbox, Grid, TextField, Typography} from "@mui/material";
import {useTaskState} from "../hooks/calendarEffect";
import styled from "styled-components";

const addTaskContainerSX = {
    display: 'flex',
    margin: 'auto',
    width: '500px',
}

const addTaskInputSX = {
    width: '100%',
    marginRight: '20px'
}

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

export function TaskList({currentDay}: any) {

    const {stateTaskArray, setStateTaskArray, lastId, setLastId} = useTaskState()
    const [textValue, setTextValue] = useState('')
    const [stateEditTask, setStateEditTask] = useState(false)
    const [indexTask, setIndexTask] = useState<number>(0)

    const changeHandler = (event: any) => {
        setTextValue(event.currentTarget.value)
    }

    const handleSubmit = () => {
        if (stateEditTask) {
            const newTaskArr = stateTaskArray.map(el => el.id === indexTask ? {...el, task: textValue} : el)
            setStateTaskArray(newTaskArr)
            setTextValue('')
            setStateEditTask(false)
        } else {
            stateTaskArray.push({task: textValue, done: false, dateTask: currentDay, id: lastId})
            setStateTaskArray([...stateTaskArray])
            setTextValue('')
            setLastId(lastId + 1)
        }
    }

    const deleteTask = (id: number) => {
        const taskArray = [...stateTaskArray].filter(el => el.id !== id) //копировать(деструктуризация) массив
        // taskArray.splice(id, 1) // удаление строки по индексу из массива
        setStateTaskArray([...taskArray])
    }

    const editTask = (id: number) => {
        const currentTask = stateTaskArray.find(el => el.id === id)?.task ?? ""
        setTextValue(currentTask)
        setIndexTask(id)
        setStateEditTask(true)
    }

    const setCheckboxStatus = (index: number) => {
        stateTaskArray[index].done = !stateTaskArray[index].done;
        setStateTaskArray([...stateTaskArray])
    }


    return (
        <Grid item xs={9}>
            <Box sx={addTaskContainerSX}>
                <TextField
                    placeholder="Enter task..."
                    sx={addTaskInputSX} type="text"
                    value={textValue}
                    onChange={(e) => changeHandler(e)}
                />
                <Button
                    variant="contained"
                    color={stateEditTask ? "warning" : "success"}
                    onClick={() => handleSubmit()}>{stateEditTask ? "Save" : "Add"}
                </Button>
            </Box>
            <Grid container sx={{width: '100%', margin: '20px'}} spacing={2}>
                {stateTaskArray.map((task) => {
                    const dayEnd = new Date(
                        currentDay.getFullYear(),
                        currentDay.getMonth(),
                        currentDay.getDate(),
                        23,
                        59,
                        59)
                    if (task.dateTask >= currentDay && task.dateTask <= dayEnd) {
                        return <Grid item xs={12} sx={taskCellSX}>
                            <Checkbox checked={task.done} onChange={() => setCheckboxStatus(task.id)}/>
                            <Typography
                                variant="h5"
                                sx={{
                                    flex: '1 0',
                                    textDecoration: task.done ? 'line-through' : "none"
                                }}
                                fontSize={'14px'}
                            >
                                {task.task}
                            </Typography>
                            <span>
                              <Button variant="contained" sx={buttonTask} color="warning"
                                      onClick={() => editTask(task.id)}>Edit</Button>
                              <Button variant="contained" sx={buttonTask} color="error"
                                      onClick={() => deleteTask(task.id)}>Delete</Button>
                        </span>
                        </Grid>
                    }
                    return null
                })}
            </Grid>
        </Grid>
    )

}