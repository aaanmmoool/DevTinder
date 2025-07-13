const express = require('express');
const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from the server")
});
app.use("/login",(req,res)=>{
    res.send("Logged in successfully")
});
app.use((req,res)=>{
    res.send("Running")
});

app.listen(3000, ()=>{
    console.log("server is running on Port 3000");
});