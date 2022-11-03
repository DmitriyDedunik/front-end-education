import React, {useEffect, useState} from "react";

export const Calculator = () => {
  const [fieldValue, setFieldValue] = useState('');
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const operations = ['-', '+', '/', '*']

  const clickHandler = (event: any): void => {
      setFieldValue(prev => prev + event.target.textContent)
  }

  const resultHandler = () => {
    try {
      const result = eval(fieldValue)
      setFieldValue(result)
    } catch (e) {
      setFieldValue('error')
    }
  }

  useEffect(() => {
    console.log('вызывается при любой отрисовке компонента')
  })

  useEffect(() => {
    console.log('вызывается один раз при первичной отрисовке компонента')
  }, [])

  useEffect(() => {
    console.log('вызывается при изменении fieldValue')
  }, [fieldValue])

  return (
      <div>
        <input type="text" value={fieldValue}/>
        <div>
          { operations.map((el, index) => <button key={index} onClick={clickHandler}>{el}</button>) }
        </div>
        <button onClick={resultHandler}>=</button>
        <div>
          { numbers.map((el, index) => <button key={index} onClick={clickHandler}>{el}</button>) }
        </div>
      </div>
  )
}