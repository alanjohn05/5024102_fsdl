import React from "react";
class ClassComponent extends React.Component {
constructor(props) {
super(props);
this.state = { salary: 50000, rating: 4 };
}
render() {
const { teacher, subject, experience } = this.props;
return (
<div style={{ border: "1px solid #ccc", padding: "12px", margin: "10px" }}>
<h2>Class Component</h2>
<p>Teacher: {teacher}</p>
<p>Subject: {subject}</p>
<p>Experience: {experience} years</p>
<p>Salary: {this.state.salary}</p>
<p>Rating: {this.state.rating}</p>
<button onClick={() => this.setState({ salary: this.state.salary + 5000 })}>
Increase Salary
</button>
<button onClick={() => this.setState({ rating: this.state.rating + 1 })}>
Increase Rating
</button>
</div>
);
}
}
export default ClassComponent;
