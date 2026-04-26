import { useState } from "react";
import "./App.css";
import FunctionComponent from "./components/FunctionComponent";
import ClassComponent from "./components/ClassComponent";
import EventExample from "./components/EventExample";
import FormExample from "./components/FormExample";
function App() {
const [appClicks, setAppClicks] = useState(0);
return (
<div>
<h1>React Components Demo</h1>
<button onClick={() => setAppClicks(appClicks + 1)}>
App Clicks: {appClicks}
</button>
<hr />
<FunctionComponent
name="Alan" course="Computer Science" year="3" college="XYZ Engineering"
/>
<ClassComponent
teacher="Prof. Verma" subject="React Development" experience="8"
/>
<EventExample />
<FormExample />
</div>
);
}
export default App;
