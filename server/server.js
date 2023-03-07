require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")
const credentials = require("./middleware/credentials")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// custom middleware logger
app.use(logger)

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

// routes
app.use("/api/", require("./routes/root"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/register", require("./routes/register"))
app.use("/api/refresh", require("./routes/refresh"))
app.use("/api/logout", require("./routes/logout"))

// authorized routes
app.use(verifyJWT)
app.use("/api/employees", require("./routes/api/employees"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/story", require("./routes/story"))
app.use("/api/mood", require("./routes/mood"))
app.use("/api/delete", require("./routes/delete"))

app.use(errorHandler)

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB")
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
