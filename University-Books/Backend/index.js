import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { createRandomID } from "./utility.js";
import * as books from "./books/books.model.js";
import * as users from "./users/users.model.js"

const app = express();
const PORT = 3001; // fetch url: localhost:3001

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.post("/upload", (request, response) => {
  // Get the file that was set to our field named "image"
  console.log(request.files);
  const file = request.files && request.files.file;

  // If no image submitted, exit
  if (!file) return response.sendStatus(400);

  // Move the uploaded image to our upload folder
  const fileName = createRandomID("book") + file.name;
  file.mv("./images/" + fileName);
  response.send(
    JSON.stringify({
      status: 200,
      body: { imagePath: `http://localhost:${PORT}/images/${fileName}` },
    })
  );
});

// vJERES KODE HERv

app.get("/", async (request, response) => {
  try {
    const result = await books.getAll();
    response.status(200).send(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    response.sendStatus(500); // Send appropriate error response
  }
});

app.get("/books/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const book = await books.getByID(id);
    if (book) {
      response.status(200).send(book);
    } else {
      response.status(404).send("Book not found");
    }
  } catch (err) {
    response.status(500).send("Error retrieving book");
  }
});

app.get("/users", async(req, res) =>{
  console.log("users called");
  try {
    const result = await users.getAll();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).send("Error fetching users");
  }
});

app.get("/user/:email", async(request, response) => {
  const { email } = request.params;
  try {
    const user = await users.getByID(email);
    if (user) {
      response.status(200).send(user);
    } else {
      response.status(404).send("user not found");
    }
  } catch (err) {
    response.status(500).send("Error retrieving user");
  }
})

app.post("/user", async (req, res) => {
  console.log("creating user...");
  try {
  const newUser = req.body;
  await users.add(newUser);
  res.status(201).send(newUser);
  } catch (error){
    console.error("Error creating user", error);
    res.sendStatus(500);
  }
});
app.post("/book", async (request, response) => {
  try {
    const newBook = request.body;
    await books.add(newBook);
    response.sendStatus(201); // Send success response
  } catch (error) {
    console.error("Error creating book:", error);
    response.sendStatus(500); // Send appropriate error response
  }
});

app.post("/updateuser", async (request, response) => {
  try {
    const { email, user } = request.body;
    await users.update(email, user);
    response.sendStatus(204); // Send success response
  } catch (error) {
    console.error("Error updating user:", error);
    response.sendStatus(500); // Send appropriate error response
  }
});

app.post("/updatebook", async (request, response) => {
  try {
    const { bookId, book } = request.body;
    await books.update(bookId, book);
    response.sendStatus(204); // Send success response
  } catch (error) {
    console.error("Error updating user:", error);
    response.sendStatus(500); // Send appropriate error response
  }
});

app.delete("/books/:id", async (request, response) => {
  try {
    const bookid = request.params.id;
    console.log(bookid)
    await books.remove(bookid);
    response.sendStatus(204); // Send success response
  } catch (error) {
    console.error("Error updating user:", error);
    response.sendStatus(500); // Send appropriate error response
  }
});

// ^JERES KODE HER^

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});