const rl = require("readline").createInterface({
input: process.stdin,
output: process.stdout));
rl.question("Enter your username: ", name =>{
let cleanName = name.trim(); // remove spaces
if (cleanName.length < 3) {
console.log("Username too short");
} else {
console.log("Original:", name);
console.log("Formatted:", cleanName.toLowerCase());
console.log("Uppercase:", cleanName.toUpperCase());}
rl.close();});
