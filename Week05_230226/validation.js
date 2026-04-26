const readline = require("readline");
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout));
function validate Password(password) {
if (password.length < 6) {
return "Password must be at least 6 characters";}
return "Valid Password";}
rl.question("Enter password: ", function(password) {
let result = validate Password(password);
console.log(result);
rl.close();});
