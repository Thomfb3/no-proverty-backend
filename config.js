// "use strict";
/** Shared config for application; can be required many places. */
require("dotenv").config();
require("colors");

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "development" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = process.env.PORT || 3000;

// // Speed up bcrypt during tests, since the algorithm safety isn't being tested
// //
// // WJB: Evaluate in 2021 if this should be increased to 13 for non-test use

function getDatabaseUrl() {
  return (process.env.NODE_ENV === "test")
      ? "no_poverty_test"
      : process.env.DATABASE_URL || "no_poverty";
}


console.log("NoPoverty Config:".green);
console.log("SECRET_KEY:".red, SECRET_KEY);
console.log("PORT:".blue, PORT.toString());
console.log("BCRYPT_WORK_FACTOR:".white, BCRYPT_WORK_FACTOR);
console.log("DATABASE:".yellow, getDatabaseUrl());
console.log("-------End of Config------");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUrl
};
