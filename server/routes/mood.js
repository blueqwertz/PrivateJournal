const express = require("express")
const router = express.Router()
const moodController = require("../controllers/moodController")

router.post("/", moodController.readMood)
router.post("/add", moodController.submitMood)

module.exports = router
