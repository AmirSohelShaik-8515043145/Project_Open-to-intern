const collegeModel = require('../model/collegeModel')

const isValid = function (value) {
     if (typeof (value) === undefined || typeof (value) === null) { return false }
     if (typeof (value).trim().length == 0) { return false }
     if (typeof (value) === "string" && (value).trim().length > 0) { return true }
 }


 const createCollege = async (req, res)=> {
     try {
         let data = req.body
         if (Object.keys(data) == 0){return res.status(400).send({ status: false, msg: "Bad request, No data provided." })};

         const{ name, fullName, logoLink} = data

         // For name required true:
         if (!isValid(name)){ return res.status(400).send({ status: false, msg: "college name is required" }) }
         
         // For name unique true:
         let duplicate  = await collegeModel.findOne({name:data.name})
         if(duplicate){return res.status(400).send({ status:false, msg: "name already exists"})}

         // For fullName required true:
         if (!isValid(fullName)){ return res.status(400).send({ status: false, msg: "fullname of the college is required" })}

         // For logoLink required true:
         if (!isValid(logoLink)){ return res.status(400).send({ status: false, msg: "logoLink is required" })};

         // For a valid logoLink:
         if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(data.logoLink))){
              return res.status(400).send({ status:false, msg: 'Not a valid logoLink'})
         }

         // Checking all the condition and creating collegeModel
         let savedData = await collegeModel.create(data)
         return res.status(201).send({ msg: savedData })
     }

     catch (error) {
         return res.status(500).send({ msg: error.message })
     }
 }

module.exports.createCollege = createCollege;
