const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    studentId:{
        type:String,
        required:true,
        unique:true
    },

    department:{
        type:String,
        required:true
    },

    semester:{
        type:String,
        required:true
    },

    cgpa:{
        type:Number,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Student", studentSchema);