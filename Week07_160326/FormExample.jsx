import { useState } from "react";
function FormExample() {
const [formData, setFormData] = useState({
name: "", email: "", course: "", city: ""
});
const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = () => {
alert(`Submitted: ${formData.name}, ${formData.email}`);
};
return (
<div style={{ border: "1px solid #ccc", padding: "12px", margin: "10px" }}>
<h2>Form Example</h2>
<input name="name" placeholder="Enter name" onChange={handleChange} />
<input name="email" placeholder="Enter email" onChange={handleChange} />
<input name="course" placeholder="Enter course" onChange={handleChange} />
<input name="city" placeholder="Enter city" onChange={handleChange} />
<button onClick={handleSubmit}>Submit Form</button>
</div>
);
}
export default FormExample;
