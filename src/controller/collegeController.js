const collegeModel = require('../model/collegeModel')
const internModel=require('../model/internModel')
const validator=require('../validator/validator')


 const colleges = async (req, res)=> {
     try {
         let data = req.body
         if (Object.keys(data) == 0){return res.status(400).send({ status: false, msg: "Bad request, No data provided." })};

        const{ name, fullName, logoLink} = data

         // For name required true:
         if (!validator.isValid(name)){ return res.status(400).send({ status: false, msg: "college name is required" }) }
         
         // For name unique true:
         let duplicate  = await collegeModel.findOne({name:data.name})
         if(duplicate){return res.status(400).send({ status:false, msg: "name already exists"})}

         // For fullName required true:
         if (!validator.isValid(fullName)){ return res.status(400).send({ status: false, msg: "fullname of the college is required" })}

         // For logoLink required true:
         if (!validator.isValid(logoLink)){ return res.status(400).send({ status: false, msg: "logoLink is required" })};

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

 const collegeDetails = async (req, res)=> {
    try {
         const collegeName = req.query.collegeName

        // Required CollegeName in Query :
        if (!collegeName) {
             return res.status(400).send({ status: false, msg: 'collegeName required' })
         }

         // Checking College Details according to given query :
         let collegeDetail = await collegeModel.findOne({ name: collegeName , isDeleted: false })
         
         if (!collegeDetail){
              return res.status(400).send({ status: false, msg: 'college name not in the dataBase' })
         }

         // Finding all interns of any particuler college
         let internDetails = await internModel.find({ collegeId: collegeDetail._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
         
        if (internDetails.length === 0) {
            return res.status(201).send({ status: true, msg: 'There is no intern in this college' })
        }
        else{
            let result = {
                name: collegeDetail.name,
                fullName: collegeDetail.fullName,
                logoLink: collegeDetail.logoLink,
                interests: internDetails
            }
            res.status(200).send({status: true, count :"Total interns present in this college : "+internDetails.length, data: result})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.colleges = colleges;
module.exports.collegeDetails = collegeDetails;
