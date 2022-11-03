import React, {useState, useEffect} from "react";

export default function ShowColor(){

    const [value, setValue] = useState('white')

    const handleSubmit = (event: any)=> {
        setValue(event.target.value)
    }
    const arrayColor: string[] = ["red", "green", "blue", "yellow", "magenta", "pink", "orange"];

    return(
        <div>
            <div style={{display: "flex"}}>
                <div className="container" style={{background: value}}>color: {value}</div>
                <div>
                    {arrayColor.map((colorEl, index)=>{
                        return(
                            <button value={colorEl} type="submit" key={index} onClick={(event)=> handleSubmit(event)}>{colorEl}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}