const express = require('express');
const connectdb = require('./config/database.js');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req);
 
  try {
    const user = new User(req.body);

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

