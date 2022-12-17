import {useState} from "react";

export interface ITask{
    id: number,
    task: string,
    done: boolean,
    dateTask: Date,
    typeTask:string,
}

export interface IMarker{
    id: number,
    typeTask: string,
    colorTask: string
}
export function useTaskState(){

    const taskArray: ITask[] = [
        {
            id: 0,
            task: 'Вынести мусор',
            done: true,
            dateTask: new Date(),
            typeTask: 'Работа',
        },
        {
            id: 1,
            task: 'Помыть посуду',
            done: false,
            dateTask: new Date(),
            typeTask: 'Работа',
        }
    ];

    const [stateTaskArray , setStateTaskArray] = useState<ITask[]>(taskArray)

    return { stateTaskArray, setStateTaskArray }

}

export function useLastID() {
    const [lastId, setLastId] = useState<number>(2)
    return { lastId, setLastId }
}

export function useMarker(){

    const markerArray: IMarker[] = [
        {
            id: 0,
            typeTask: 'Работа',
            colorTask: 'green'
        },
        {
            id: 1,
            typeTask: 'Бытовые задачи',
            colorTask: 'blue'
        },
        {
            id: 3,
            typeTask: 'Саморазвитие',
            colorTask: 'yellow'
        },
    ]

    const [stateMarkerArray , setstateMarkerArray] = useState<IMarker[]>(markerArray)

    return { stateMarkerArray, setstateMarkerArray }

}