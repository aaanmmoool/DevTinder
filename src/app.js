const express = require('express');
const connectdb = require('./config/database.js');
const app = express();
const User = require('./models/user');


app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "Virat",
      lastName: "kohli",
      email: "viratkohli@gmail.com", // unique email for each test
      password: "12345678",
      age: 37,
      gender: "male",
      bio: "I am a cricketer",
    });

    const savedUser = await user.save();
    console.log("User saved:", savedUser);
    res.send("User created successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error creating user: " + err.message);
  }
});


connectdb().then(() => {
  console.log("Database connected successfully");
  app.listen(3000, ()=>{
    console.log("server is running on Port 3000");
});
}).catch((err) => {
  console.error("Database connection failed:", err);
});

