const readline = require("readline");
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout});
rl.question("Press Enter to see current date and time: ", (() =>{
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
String(now.getMonth() + 1).padStart(2, "0") + "-" +
String(now.getDate()).padStart(2, "0") + " " +
String(now.getHours()).padStart(2, "0") + ":" +
String(now.getMinutes()).padStart(2, "0") + ":" +
String(now.getSeconds()).padStart(2, "0");
console.log("Current Date & Time:", formattedDate);
rl.close();});
