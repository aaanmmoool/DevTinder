const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
   firstName:{
    type:String,
    required:true,
    minlength:[2,'First name must be at least 3 characters long'],
    validate(value){
        const inv = /^[a-zA-Z]+$/;
        if(!inv.test(value)){
            throw new Error('First name must contain only letters');
        }
    }
   },
   lastName :{
    type:String,
    required:false,
    validate(value){
        const inv = /^[a-zA-Z]+$/;
        if(!inv.test(value)){
            throw new Error('Last name must contain only letters');
        }
    }
   },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be at least 8 characters long'],
        validate(value){
           if(validator.isStrongPassword(value)){
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
           }
        }
    },
    age:{
        type:Number,
        required:true,
        min:[11,'Age must be at least 18'],
        max:[100,'Age must be less than 100'],
        required:false
    },
    gender:{
        type:String,
        validate(value){
            if(value !== 'male' && value !== 'female' && value!== 'others'){
                throw new Error('Invalid gender');
            }
        },
        required:false
    },
    bio:{
        type:String,
        default:"enter about yourself",
        required:false,
        maxlength:[500,'Bio must be less than 500 characters']
    },
    photoUrl:{
        type:String,
        required:false,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid photo URL');
            }
        }
    },
    skills:{
        type: [String],
        default:[],
        required:false
    }
   
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);