import {useState} from "react";

export interface ITask{
    id: number,
    task: string,
    done: boolean,
    dateTask: Date,
}

export function useTaskState(){

    const taskArray: ITask[] = [
        {
            id: 0,
            task: 'Вынести мусор',
            done: true,
            dateTask: new Date(),
        },
        {
            id: 1,
            task: 'Помыть посуду',
            done: false,
            dateTask: new Date(),
        }
    ];

    const [stateTaskArray , setStateTaskArray] = useState<ITask[]>(taskArray)
    const [lastId, setLastId] = useState<number>(2)

    // const selectedDay = (day: Date):void =>{
    //     const thatDayTasks = stateTaskArray.filter(el => {
    //             const dayEnd = new Date(
    //                 day.getFullYear(),
    //                 day.getMonth(),
    //                 day.getDate(),
    //                 23,
    //                 59,
    //                 59
    //             )
    //             return el.dateTask >= day && el.dateTask <= dayEnd
    //         }
    //     )
    //
    //     setCurrentDayTasks([...thatDayTasks])
    // }

    return {stateTaskArray, setStateTaskArray, lastId, setLastId }

}