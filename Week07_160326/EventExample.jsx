import { useState } from "react";
function EventExample() {
const [counter, setCounter] = useState(0);
const [msg, setMsg] = useState("");
const handleIncrease = () => setCounter(counter + 1);
const handleDecrease = () => setCounter(counter - 1);
const handleShow = () => setMsg(`Counter value is: ${counter}`);
return (
<div style={{ border: "1px solid #ccc", padding: "12px", margin: "10px" }}>
<h2>Event Example</h2>
<p>Counter: {counter}</p>
<button onClick={handleIncrease}>Increase</button>
<button onClick={handleDecrease}>Decrease</button>
<button onClick={handleShow}>Show Message</button>
{msg && <p>{msg}</p>}
</div>
);
}
export default EventExample;
