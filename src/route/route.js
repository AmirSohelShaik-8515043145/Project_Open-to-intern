const express = require("express")
const router = express.Router()

const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.internCreate)
router.get("/functionup/collegeDetails", collegeController.getInternList)


module.exports = router