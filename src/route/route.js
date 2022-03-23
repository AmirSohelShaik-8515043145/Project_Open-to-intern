const express = require("express")
const router = express.Router()

const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")

router.post("/functionup/colleges", collegeController.colleges)
router.post("/functionup/intern", internController.intern)
router.get("/functionup/collegeDetails", collegeController.collegeDetails)


module.exports = router