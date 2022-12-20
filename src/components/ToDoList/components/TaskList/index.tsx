import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {useLastID, ITask, IMarker} from "../hooks/calendarEffect";
import styled from "styled-components";
import BookmarkIcon from '@mui/icons-material/Bookmark';

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

type Props = {
    currentDay: Date,
    setStateTaskArray: Dispatch<SetStateAction<ITask[]>>,
    stateTaskArray: ITask[]
    stateMarkerArray: IMarker[]
}

const TaskText = styled(Typography) <{ $isTaskDone: boolean }>`
  font-size: 14px;
  flex: 1 0;
  text-decoration: ${({$isTaskDone}) => ($isTaskDone ? 'line-through' : "none")}`

export function TaskList({currentDay, setStateTaskArray, stateTaskArray, stateMarkerArray}: Props) {

    const {lastId, setLastId} = useLastID()
    //const {lastMarkerID, setLastMarkerID} = useLastMarker()
    const [lastMarkerID, setLastMarkerID] = useState<number>(0)
    const [textValue, setTextValue] = useState<string>('')
    const [stateEditTask, setStateEditTask] = useState<boolean>(false)
    const [indexTask, setIndexTask] = useState<number>(0)
    console.log(lastMarkerID);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.currentTarget.value)
    }

    const handleSubmit = () => {
        if (stateEditTask) {
            const newTaskArr = stateTaskArray.map((el) => el.id === indexTask ? {...el, task: textValue} : el)
            setStateTaskArray(newTaskArr)
            setTextValue('')
            setStateEditTask(false)
        } else {
            stateTaskArray.push({task: textValue, done: false, dateTask: currentDay, id: lastId, idTypeTask: lastMarkerID})
            debugger
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
        const currentTask = stateTaskArray.find((el) => el.id === id)?.task ?? ""
        setTextValue(currentTask)
        setIndexTask(id)
        setStateEditTask(true)
    }

    const setCheckboxStatus = (index: number) => {
        stateTaskArray[index].done = !stateTaskArray[index].done;
        setStateTaskArray([...stateTaskArray])
    }

    const handleChange = (event: SelectChangeEvent<number>) => {
        setLastMarkerID(event.target.value as number);
    };

    return (
        <Grid item xs={9}>
            <Box sx={addTaskContainerSX}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lastMarkerID}
                        label="Тип"
                        onChange={handleChange}
                    >
                        {stateMarkerArray.map((marker) => (
                            <MenuItem key={marker.id} sx={{display: "flex", alignItems: "center"}} value={marker.id}><BookmarkIcon sx={{color: marker.colorTask}}/>{marker.typeTask}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
                <TextField
                    placeholder="Enter task..."
                    sx={addTaskInputSX} type="text"
                    value={textValue}
                    onChange={changeHandler}
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
                        return <Grid item xs={12} sx={taskCellSX} key={task.id}>
                            <Checkbox checked={task.done} onChange={() => setCheckboxStatus(task.id)}/>
                            <TaskText
                                variant="h5"
                                $isTaskDone={task.done}
                            >
                                {task.task}
                            </TaskText>
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