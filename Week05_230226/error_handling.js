const readline = require("readline");
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout));
function login(username, password) {
try {
if (!username || !password) {
throw new Error("All fields are required");}
if (password.length < 6) {
throw new Error("Password too short");}
console.log("Login successful");
} catch (err) {
console.log("Login Error:", err.message);}}
rl.question("Enter username: ", function (username) {
rl.question("Enter password: ", function (password) {
login(username, password);
rl.close();});});
