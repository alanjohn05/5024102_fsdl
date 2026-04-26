const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });
let cart = [];
(function menu() {
rl.question("\n1.Add 2.View 3. Remove 4. Exit\nChoice: ", c=>{
if (c==1)
rl.question("Item: ", n=> rl.question("Price: ", p => (cart.push({n, p: +p)), menu())));
else if (c==2){
let t=0;
cart.forEach ((x,i)=> (console.log( `${i+1}. ${x.n}-7${x.p}-`), t +=x.p));
console.log("Total:", t);
menu();}
else if (c==3)
rl.question("No: ", i => (cart.splice(i-1, 1), menu()));
else rl.close();});})();
