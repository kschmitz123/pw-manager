const inquirer = require("inquirer");
const fs = require("fs");

console.log("PW-Manager");

const questions = [
  {
    type: "password",
    name: "master",
    message: "Enter your masterpassword",
    mask: "*",
  },
];
try {
  const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  validateAccess(passwordSafe);
} catch (err) {
  console.error(err);
}

async function validateAccess(passwordSafe) {
  const { master } = await inquirer.prompt(questions);
  if (master !== passwordSafe.masterpassword) {
    console.log("WRONG 🤯. Enter correct password or leave.");
    validateAccess(passwordSafe);
    return;
  }
  const args = process.argv.slice(2);
  //   const method = args[0];
  const passwordName = args[0];

  const password = passwordSafe[passwordName];
  if (password) {
    console.log(`Password is ${password}`);
  } else {
    console.log("Unknown password");
  }
}

//     if (method === `set ${passwordName}`) {
//       console.log(`You want to set the password of ${passwordName}`);
//     } else if (method === `get ${passwordName}`) {
//       console.log(`You want to know the password of ${passwordName}`);
//       if (passwordName === "wifi") {
//         console.log("Password is 123");
//       } else {
//         console.log("Unknown password");
//       }
//     } else {
//       console.log(`Define a method`);
//
