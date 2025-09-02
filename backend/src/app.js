const express = require('express');
const connectdb = require('./config/database.js');
const app = express();
const User = require('./models/user.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser())

app.get("/profile",async (req,res)=>{
   const cookies = req.cookies;
   const {token} = cookies;
     if(!token){
      throw new Error("Token not found");
     }
   const decoded = jwt.verify(token,"Anmol@123");
   const user = await User.findById(decoded._id);
   if(!user){
    throw new Error("User not found");
   }
   res.send(user);
   
})
app.post("/login", async (req,res)=>{
  try{
     const {email, password} = req.body;
     const user = await User.findOne({email:email});
     if(!user){
       throw new Error("Invalid credentials");
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);
     if(isPasswordValid){
       const token = jwt.sign({_id:user._id},"Anmol@123");
       res.cookie("token",token);

    }
     else{
       throw new Error("Invalid credentials");
     }
    
    res.send("Login successful");

  }
  catch(err){
    console.error("Error logging in:", err);
    res.status(500).send("Error logging in: " + err.message);
  }
})

app.post("/signup", async (req, res) => {
    try{
       const {password,firstName,lastName,email,age,gender,bio,photoUrl,skills} = req.body;
       const passwordHash = await bcrypt.hash(password,10);
       const user = new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        age,
        gender,
        bio,
        photoUrl,
        skills
       })
       const savedUser = await user.save();
       res.send(savedUser);
    }
    catch(err){
      console.error("Error saving user:", err);
      res.status(500).send("Error creating user: " + err.message);
    }
});

app.delete("/user/:userId", async (req,res)=>{
    const userId = req.params.userId;
   try{
    const user = await User.findByIdAndDelete({_id:userId});
    if(!user){
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  }
  catch(err){
   }

})


app.get("/feed",async (req,res)=>{
  try{
    const user = await User.find({});
    if(!user){
      return res.status(404).send("No users found");
    }    res.send(user);
  }
  catch(err){
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users: " + err.message);
  }

})

app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params.userId;
  const updateData = req.body;
  try{
    // Available Feild Updates
    const AVAILABLE_UPDATES = ["firstName","lastName","age","gender","bio","skills"];
    const allowedUpdates = Object.keys(updateData).every((key)=>AVAILABLE_UPDATES.includes(key));
      if(!allowedUpdates){
        throw new Error("Invalid update fields");
      }

    // Skills Count Verification
    const skillscount = updateData.skills.length;

     if(skillscount > 5){
      throw new Error("You can only add up to 5 skills");
     }
     // Password Validation
     if(updateData.password){
      const password = updateData.password;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!passwordRegex.test(password)){
        throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
     } 
     }

     // Age Validation
     if(updateData.age < 11 || updateData.age > 100){
      throw new Error("Age must be between 11 and 100");
     }

    const user = await User.findByIdAndUpdate({_id:userId},updateData);
    if(!user){   
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
    runValidators:true;
  }
  catch(err){
    res.send("error updating user")
    console.error("Error updating user:", err);
}})

app.post("/cast",async (req,res)=>{
  try{
    const rawData = {firstName:"John",lastName:"Doe",email:"john@example.com",password:123456,age:"25",gender:"male",bio:"I am a software engineer"};
  const CastedData =await User.castObject(rawData);
  const newUser = new User(CastedData);
  const savedUser = await newUser.save();
  
  res.send(CastedData);
  }
  catch(err){
    console.error("Error casting user:", err);
    res.status(500).send("Error casting user: " + err.message);
  }
  
})




connectdb().then(() => {
  console.log("Database connected successfully");
  app.listen(3000, ()=>{
    console.log("server is running on Port 3000");
});
}).catch((err) => {
  console.error("Database connection failed:", err);
});

