import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, deleteDoc, updateDoc, doc, setDoc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_Y-BuatEn_60zZioRb-86wxjpWe0IdI8",
    authDomain: "todolist-85181.firebaseapp.com",
    projectId: "todolist-85181",
    storageBucket: "todolist-85181.appspot.com",
    messagingSenderId: "558994121248",
    appId: "1:558994121248:web:7ad8ebae26fda157179245"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(appFirebase);

const addTaskFireBase = async () =>{
    try {
        const taskRef = await setDoc(doc(db, "tasks", '2'), {
            id: 2,
            task: 'Помыть посуду',
            done: false,
            dateTask: new Date(),
            idTypeTask: 1,
        });
        console.log("tasks written");
    } catch (e) {
        console.error("Error adding tasks: ", e);
    }
}

const updateTaskFireBase = async () =>{
    try {

        const taskRef = await doc(db, "tasks", '2');

        let done = false;

        await updateDoc(taskRef, {
            done: true
        })
        console.log("tasks written");

    } catch (e) {
        console.error("Error adding tasks: ", e);
    }
}

const deleteTaskFireBase = async () =>{
    try {
        await deleteDoc(doc(db, "tasks", "2"));
    }catch (e) {
        console.error("Error adding tasks: ", e);
    }
}

const getTasksFireBase = async () =>{

    const q = query(collection(db, "tasks"));

    try {
        const querySnapshot = await getDocs(q);
        debugger
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let task = doc.data()

            console.log(task.task,);
            console.log(task.id,);
        });
    }catch (e) {
        console.error("Error adding tasks: ", e);
    }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <button
          onClick={() => addTaskFireBase()}>Add task FireBase
      </button>
      <button
          onClick={() => updateTaskFireBase()}>Update task FireBase
      </button>
      <button
          onClick={() => deleteTaskFireBase()}>Delete task FireBase
      </button>
      <button
          onClick={() => getTasksFireBase()}>Get tasks FireBase
      </button>
    <App />
  </React.StrictMode>
);