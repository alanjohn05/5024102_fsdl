import React, { useState } from "react"; [cite: 129]

function App() { [cite: 130]
  const [count, setCount] = useState(0); [cite: 131]

  return ( [cite: 132]
    <div style={{ textAlign: "center", marginTop: "50px" }}> [cite: 133]
      <h1>React Counter App</h1> [cite: 134]
      <h2>{count}</h2> [cite: 135]
      
      <button onClick={() => setCount(count + 1)}> [cite: 136, 139]
        Increase [cite: 137]
      </button> [cite: 138]
      
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}> [cite: 140]
        Decrease [cite: 141]
      </button> [cite: 142]
      
      <button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}> [cite: 143]
        Reset [cite: 144]
      </button> [cite: 145]
    </div> [cite: 146]
  ); [cite: 147]
} [cite: 148]

export default App; [cite: 149]
