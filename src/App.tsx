import React, {useState} from 'react';
import './App.css'
import {Calculator} from "./components/Calculator";
import {Others} from "./components/Others";
import Quiz from "./components/Quiz";
import ShowColor from "./components/ShowColor";

function App() {
  const [showComponent, setShowComponent] = useState<String>();
  return (
    <div>
        <button onClick={() => setShowComponent('Calculator')}>Калькулятор</button>
        <button onClick={() => setShowComponent('Others')}>Другое</button>
        <button onClick={() => setShowComponent('Quiz')}>Квиз</button>
        <button onClick={() => setShowComponent('ShowColor')}>Показать цвет</button>

        { showComponent === 'Calculator' ? <Calculator /> : null }
        { showComponent === 'Others' ? <Others /> : null }
        { showComponent === 'Quiz' ? <Quiz /> : null }
        { showComponent === 'ShowColor' ? <ShowColor /> : null }
    </div>
  );
}

export default App;
