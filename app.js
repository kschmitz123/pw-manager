console.log("PW-Manager");

const args = process.argv.slice(2);
const passwordname = args[0];
console.log(`You want to know the password of ${passwordname}`);

if (passwordname === "wifi") {
  console.log("Password is 123");
} else {
  console.log("Unknown password");
}
