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
    width: '80%',
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
    const [lastMarkerID, setLastMarkerID] = useState<number>(0)
    const [textValue, setTextValue] = useState<string>('')
    const [stateEditTask, setStateEditTask] = useState<boolean>(false)
    const [indexTask, setIndexTask] = useState<number>(0)

    const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setTextValue(event.currentTarget.value)
    }

    const handleSubmit = (): void => {
        if (stateEditTask) {
            const newTaskArr = stateTaskArray.map((el) => {
                return el.id === indexTask ? {...el,
                    task: textValue,
                    idTypeTask: lastMarkerID,
                } : el;
            })
            setStateTaskArray(newTaskArr)
            setTextValue('')
            setStateEditTask(false)
            setLastMarkerID(0)
        } else {
            stateTaskArray.push({task: textValue, done: false, dateTask: currentDay, id: lastId, idTypeTask: lastMarkerID})
            setStateTaskArray([...stateTaskArray])
            setTextValue('')
            setLastId(lastId + 1)
        }
    }

    const deleteTask = (id: number): void => {
        const taskArray = [...stateTaskArray].filter(el => el.id !== id) //копировать(деструктуризация) массив
        setStateTaskArray([...taskArray])
    }

    const editTask = (id: number): void => {
        const currentElement = stateTaskArray.find((el) => el.id === id)
        const currentTask = currentElement?.task ?? ""
        const currentMarkerID = currentElement?.idTypeTask ?? 0
        setTextValue(currentTask)
        setIndexTask(id)
        setStateEditTask(true)
        setLastMarkerID(currentMarkerID)
    }

    const setCheckboxStatus = (index: number): void => {
        stateTaskArray[index].done = !stateTaskArray[index].done;
        setStateTaskArray([...stateTaskArray])
    }

    const handleChange = (event: SelectChangeEvent<number>): void => {
        setLastMarkerID(event.target.value as number);
    };

    return (
        <Grid item xs={9}>
            <Box sx={addTaskContainerSX}>
                    <FormControl fullWidth style={{display: "flex", flex: '0 2 auto'}}>
                        <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lastMarkerID}
                            label="Тип"
                            onChange={handleChange}
                            sx={{'#demo-simple-select':{display: "flex"}}}
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
                            <BookmarkIcon sx={{color: stateMarkerArray[task.idTypeTask].colorTask}}/>
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