const express = require("express")
const router = express.Router()
const storyController = require("../controllers/storyController")

router.post("/", storyController.readStories)
router.post("/add", storyController.submitStory)
router.post("/delete", storyController.deleteStory)
router.post("/save", storyController.saveStory)

module.exports = router
