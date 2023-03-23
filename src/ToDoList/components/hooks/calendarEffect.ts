import {useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../index";

export interface ITask {
    id: number,
    task: string,
    done: boolean,
    dateTask: Date,
    idTypeTask: number,
}

export interface IMarker {
    id: number,
    typeTask: string,
    colorTask: string
}

const getTasksFireBase = async (taskArray: ITask[]) => {

    const q = query(collection(db, "tasks"));

    const taskArray1: ITask[] = [];

    try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let task = doc.data()

            taskArray1.push(
                {
                    task: task.task,
                    done: task.done,
                    dateTask: new Date(task.dateTask.seconds),
                    id: task.id,
                    idTypeTask: task.idTypeTask,
                }
            )
            //console.log(taskArray1)
        });
    } catch (e) {
        console.error("Error adding tasks: ", e);
    }

    taskArray = [...taskArray1];

    console.log(taskArray)

    //const promiseTaskArray = taskArray1

    // promiseTaskArray.then((value) => {
    //     value.forEach((task) => {
    //         taskArray.push({
    //             task: task.task,
    //             done: task.done,
    //             dateTask: task.dateTask,
    //             id: task.id,
    //             idTypeTask: task.idTypeTask,
    //         })
    //     })
    //     //console.log(taskArray[0])
    // })

    //console.log(taskArray)

}

export function useTaskState() {

    // const taskArray: ITask[] = [
    //     {
    //         id: 0,
    //         task: 'Вынести мусор',
    //         done: true,
    //         dateTask: new Date(),
    //         idTypeTask: 0,
    //     },
    //     {
    //         id: 1,
    //         task: 'Помыть посуду',
    //         done: false,
    //         dateTask: new Date(),
    //         idTypeTask: 1,
    //     }
    // ];

    //const taskArray: ITask[] = []
    // useEffect(() =>{
    //     const taskArray: ITask[] = getTasksFireBase();
    //     setStateTaskArray(taskArray)
    // })
    // const [stateTaskArray , setStateTaskArray] = useState<ITask[]>([])

    //const taskArray = useFireStore('tasks');

    const taskArray: ITask[] = [];

    getTasksFireBase(taskArray);
    //console.log(taskArray)
    const [stateTaskArray, setStateTaskArray] = useState<ITask[]>(taskArray)

    return {stateTaskArray, setStateTaskArray}

}

export function useLastID() {
    const [lastId, setLastId] = useState<number>(2)
    return {lastId, setLastId}
}

export function useMarker() {

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
            id: 2,
            typeTask: 'Саморазвитие',
            colorTask: 'yellow'
        },
    ]

    const [stateMarkerArray, setstateMarkerArray] = useState<IMarker[]>(markerArray)

    return {stateMarkerArray, setstateMarkerArray}

}
