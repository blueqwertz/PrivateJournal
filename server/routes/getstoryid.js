const express = require("express")
const router = express.Router()
const storyController = require("../controllers/storyController")
router.post("/", storyController.readStoriesID)

module.exports = router
