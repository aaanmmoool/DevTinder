const express = require('express');
const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');
app.use("/admin",adminAuth);

app.post("user/login" , (req,res)=>{
    res.send("User Logged In");
})
app.post("/user", userAuth, (req, res) => {
    res.send("User data sent");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent")
});
app.get("/admin/deletedUser",(req,res)=>{
    res.send("Delted users")
})



app.listen(3000, ()=>{
    console.log("server is running on Port 3000");
});