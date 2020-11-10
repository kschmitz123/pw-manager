const inquirer = require("inquirer");

console.log("PW-Manager");

const masterpassword = "1234";
const args = process.argv.slice(2);
const method = args[0];
const passwordname = args[1];

const questions = [
  {
    type: "password",
    name: "master",
    message: "Enter your masterpassword",
    mask: "*",
  },
];

const nextQuestion = [
  {
    type: "input",
    name: "whatsNext",
    message: "What do you want to do? (set or get)",
  },
];

// function setPassword() {}

async function validateAccess() {
  const { master } = await inquirer.prompt(questions);
  if (master === masterpassword) {
    console.log("Password is correct");
  } else {
    console.log("WRONG 🤯. Enter correct password or leave.");
    validateAccess();
    return;
  }
}
validateAccess();

// const { whatsNext } = await inquirer.prompt(nextQuestion);
//     if (whatsNext === `set ${passwordname}`) {
//       console.log(`You want to set the password of ${passwordname}`);
//     } else if (whatsNext === `get ${passwordname}`) {
//       console.log(`You want to know the password of ${passwordname}`);
//       if (passwordname === "wifi") {
//         console.log("Password is 123");
//       } else {
//         console.log("Unknown password");
//       }
//     } else {
//       console.log(`Define a method`);
//     }
