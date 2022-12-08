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

    return { stateTaskArray, setStateTaskArray }

}

export function useLastID() {
    const [lastId, setLastId] = useState<number>(2)
    return { lastId, setLastId }
}