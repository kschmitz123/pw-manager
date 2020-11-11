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
const getPasswordQst = [
  {
    type: "input",
    name: "password",
    message: "Which passwort do you need?",
  },
];
const setPasswordTitle = [
  {
    type: "input",
    name: "passwordTitle",
    message: "What's the password for?",
  },
];
const setPasswordName = [
  {
    type: "input",
    name: "passwordName",
    message: "What should the password be?",
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
      setPassword(passwordSafe);
    }
  });
}
async function getPassword(passwordSafe) {
  await inquirer.prompt(getPasswordQst).then((answers) => {
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
async function setPassword(passwordSafe) {
  const { passwordTitle } = await inquirer.prompt(setPasswordTitle);
  const { passwordName } = await inquirer.prompt(setPasswordName);

  const addedPassword = { [passwordTitle]: passwordName };

  const newPassword = Object.assign(passwordSafe, addedPassword);
  const data = JSON.stringify(newPassword, null, 2);

  fs.writeFileSync("./db.json", data);
}
