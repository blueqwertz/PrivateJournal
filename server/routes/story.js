const express = require("express")
const router = express.Router()
const storyController = require("../controllers/storyController")

router.post("/", storyController.readStories)
router.put("/", storyController.submitStory)
router.delete("/", storyController.deleteStory)

module.exports = router
