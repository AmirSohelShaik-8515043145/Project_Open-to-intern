const express = require("express")
const router = express.Router()

const {colleges,collegeDetails} = require("../controller/collegeController")
const {intern} = require("../controller/internController")

router.post("/functionup/colleges", colleges)
router.post("/functionup/intern", intern)
router.get("/functionup/collegeDetails", collegeDetails)


module.exports = router