import { useState } from "react";
function FunctionComponent({ name, course, year, college }) {
const [likes, setLikes] = useState(0);
return (
<div style={{ border: "1px solid #ccc", padding: "12px", margin: "10px" }}>
<h2>Function Component</h2>
<p>Student Name: {name}</p>
<p>Course: {course}</p>
<p>Year: {year}</p>
<p>College: {college}</p>
<p>Likes: {likes}</p>
<button onClick={() => setLikes(likes + 1)}>Like Student</button>
</div>
);
}
export default FunctionComponent;
