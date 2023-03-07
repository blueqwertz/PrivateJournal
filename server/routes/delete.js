const express = require("express")
const router = express.Router()
const logoutController = require("../controllers/logoutController")

router.post("/", logoutController.handleDelete)

module.exports = router
