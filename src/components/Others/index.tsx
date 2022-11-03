import Timer from "./Timer";
import React, {useState} from "react";

export const Others = () => {
  const [name, setName] = useState('Anton')

  return(
      <div>
          <h1 className="borderByRezuan">My App</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, quo.</p>
          <p>asdsad {name} awdaw</p>
          <button onClick={() => setName(prev => prev + 1)}>Click</button>
          <Timer name={name} sername="Vasilchenko" getName={() => name} />
      </div>
  )
}