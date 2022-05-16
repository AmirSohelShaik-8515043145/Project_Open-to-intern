const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
        trim:true
        
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    collegeId:{
        type:ObjectId,
        required:true,
        ref: 'Project2_colleges'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{ timestamps: true})

module.exports = mongoose.model("Project2_interns", internSchema)

