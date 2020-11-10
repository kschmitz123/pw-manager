const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

console.log("PW-Manager");

const masterQst = [
  {
    type: "password",
    name: "master",
    message: "Enter your masterpassword",
    mask: "*",
  },
];

const methodQst = [
  {
    type: "input",
    name: "method",
    message: "Do you want to set or get a password?",
  },
];
const passwordQst = [
  {
    type: "input",
    name: "password",
    message: "Which passwort do you need?",
  },
];

async function validateAccess() {
  const { master } = await inquirer.prompt(masterQst);
  const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  if (master !== passwordSafe.masterpassword) {
    console.log(chalk.red("WRONG 🤯. Enter correct password or leave."));
    validateAccess();
    return;
  }
  getMethod(passwordSafe);
}
validateAccess();

async function getMethod(passwordSafe) {
  await inquirer.prompt(methodQst).then((answers) => {
    method = answers["method"];
    if (method === "get") {
      getPassword(passwordSafe);
    } else {
      console.log("The password set function is not available yet");
    }
  });
}
async function getPassword(passwordSafe) {
  await inquirer.prompt(passwordQst).then((answers) => {
    passwordName = answers["password"];
    const password = passwordSafe[passwordName];
    if (password) {
      console.log(`Password is ${password}`);
    } else {
      console.log("Unknown password");
    }
  });
}

// const args = process.argv.slice(2);
// //   const method = args[0];
// const passwordName = args[0];
