const mongoose = require('mongoose');
const connectdb = async ()=>{
  await mongoose.connect('mongodb+srv://anmolsinghtron123:5KpPvXakWHp3ZuMZ@cluster0.ihrzmk1.mongodb.net/devTinder');
};


module.exports = connectdb;


