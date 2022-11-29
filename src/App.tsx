import React, {useState} from 'react';
import './App.css'
import {Calculator} from "./components/Calculator";
import {Others} from "./components/Others";
import Quiz from "./components/Quiz";
import ShowColor from "./components/ShowColor";
import {ToDoList} from "./components/ToDoList";
import {MuiTest} from "./components/MuiTest";
import {Timer} from "./components/Timer";

function App() {
  const [showComponent, setShowComponent] = useState<String>();
  return (
    <div>
        <button onClick={() => setShowComponent('Calculator')}>Калькулятор</button>
        <button onClick={() => setShowComponent('Others')}>Другое</button>
        <button onClick={() => setShowComponent('Quiz')}>Квиз</button>
        <button onClick={() => setShowComponent('ShowColor')}>Показать цвет</button>
        <button onClick={() => setShowComponent('ToDoList')}>Лист задач</button>
        <button onClick={() => setShowComponent('MuiTest')}>MuiTest</button>
        <button onClick={() => setShowComponent('Timer')}>Timer</button>

        { showComponent === 'Calculator' ? <Calculator /> : null }
        { showComponent === 'Others' ? <Others /> : null }
        { showComponent === 'Quiz' ? <Quiz /> : null }
        { showComponent === 'ShowColor' ? <ShowColor /> : null }
        { showComponent === 'ToDoList' ? <ToDoList /> : null }
        { showComponent === 'MuiTest' ? <MuiTest /> : null }
        { showComponent === 'Timer' ? <Timer /> : null }
    </div>
  );
}

export default App;
