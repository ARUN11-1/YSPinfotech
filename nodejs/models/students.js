const { BatchType } = require("mongodb");
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already registered"]
    },
    phone:{
        type:Number,
        maxlength:10,
        minlength:10,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;