const express = require("express")
const router = express.Router()
const storyController = require("../controllers/storyController")

router.post("/", storyController.submitStory)

module.exports = router
