const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
        
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    logoLink:{
        type:String,
        required:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},
{ timestamps: true} )

module.exports = mongoose.model('Project2_colleges', collegeSchema)