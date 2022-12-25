import React, {Dispatch, SetStateAction, useState} from "react";
import {Grid} from "@mui/material";
import {useLastID, ITask, IMarker} from "../hooks/calendarEffect";
import {FormForMarker} from "./componentsTaskList/FormForMarker";
import {BoxAddTask} from "./componentsTaskList/BoxAddTask";
import {TasksOfTheDay} from "./componentsTaskList/TasksOfTheDay";

type Props = {
    currentDay: Date,
    setStateTaskArray: Dispatch<SetStateAction<ITask[]>>,
    stateTaskArray: ITask[]
    stateMarkerArray: IMarker[]
}

export function TaskList({currentDay, setStateTaskArray, stateTaskArray, stateMarkerArray}: Props) {

    const {lastId, setLastId} = useLastID()
    const [lastMarkerID, setLastMarkerID] = useState<number>(0)
    const [textValue, setTextValue] = useState<string>('')
    const [stateEditTask, setStateEditTask] = useState<boolean>(false)
    const [indexTask, setIndexTask] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleSubmit = (): void => {
        if (stateEditTask) {
            const newTaskArr = stateTaskArray.map((el) => {
                return el.id === indexTask ? {
                    ...el,
                    task: textValue,
                    idTypeTask: lastMarkerID,
                } : el;
            })
            setStateTaskArray(newTaskArr)
            setTextValue('')
            setStateEditTask(false)
            setLastMarkerID(0)
        } else {
            stateTaskArray.push({
                task: textValue,
                done: false,
                dateTask: currentDay,
                id: lastId,
                idTypeTask: lastMarkerID
            })
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

    const handleSubmitMarker = () => {
        setOpenModal(prev => !prev)
    }

    return (
        <Grid item xs={9}>
            <BoxAddTask
                lastMarkerID={lastMarkerID}
                setLastMarkerID={setLastMarkerID}
                stateMarkerArray={stateMarkerArray}
                setTextValue={setTextValue}
                textValue={textValue}
                stateEditTask={stateEditTask}
                handleSubmit={handleSubmit}
                handleSubmitMarker={handleSubmitMarker}
            />
            <FormForMarker
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
            <TasksOfTheDay
                stateTaskArray={stateTaskArray}
                currentDay={currentDay}
                stateMarkerArray={stateMarkerArray}
                setCheckboxStatus={setCheckboxStatus}
                editTask={editTask}
                deleteTask={deleteTask}
            />
        </Grid>
    )

}