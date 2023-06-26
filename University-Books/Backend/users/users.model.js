import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
const USER_FILE = "./users/users.json";

// return all users from file
export async function getAll() {
  try {
    let usersText = await fs.readFile(USER_FILE);
    let users = JSON.parse(usersText);
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      console.log("No users found, returning empty array");
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of users to file
async function save(users = []) {
  let userText = JSON.stringify(users);
  await fs.writeFile(USER_FILE, userText);
}

// helper function for userEmail
function findUser(userArray, userEmail) {
  return userArray.findIndex((currentuser) => currentuser.email === userEmail);
}

// get user by ID
export async function getByID(userEmail) {
  let userArray = await getAll();
  let index = findUser(userArray, userEmail);
  if (index === -1) throw new Error(`user with email '${userEmail}' doesn't exist`);
  else return userArray[index];
}

// create a new user
export async function add(newUser) {
  console.log(newUser);
  let user = newUser;
  user.books = [];
  user.orders = [];
  user.bookings = [];
  user.favorites = [];
  let userArray = await getAll();
  if (findUser(userArray, newUser.email) !== -1)
    throw new Error(`user with email:${newUser.email} already exists`);
  userArray.push(newUser);
  await save(userArray);
  return user
}

// update existing user
export async function update(userEmail, user) {
  let userArray = await getAll();
  let index = findUser(userArray, userEmail); // findIndex
  if (index === -1) throw new Error(`User with ID:${userEmail} does not exist`);
  else {
    userArray[index] = user;
    await save(userArray);
  }
}

// delete existing user
export async function remove(userEmail) {
  let userArray = await getAll();
  let index = findUser(userArray, userEmail); // findIndex
  if (index === -1) throw new Error(`user with ID:${userEmail} does not exist`);
  else {
    userArray.splice(index, 1); // remove user from array
    await save(userArray);
  }
}