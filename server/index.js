const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const sqlite3 = require("sqlite3").verbose()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

app.use(bodyParser.json())

const db = new sqlite3.Database("auth.sqlite", (error) => {
    if (error) throw error
    console.log("successfully connected to the database")
})

db.run("CREATE TABLE IF NOT EXISTS users (username text, password text)", (error) => {
    if (error) throw error
})

db.run("CREATE TABLE IF NOT EXISTS refresh_tokens (username text, token text)", (error) => {
    if (error) throw error
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const insertQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`
    db.run(insertQuery, (error) => {
        if (error) throw error
        res.json({ message: "User registered successfully" })
    })
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const selectQuery = `SELECT * FROM users WHERE username = '${username}'`
    db.get(selectQuery, async (error, user) => {
        if (error) throw error
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })
                const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN, { expiresIn: "30d" })
                const insertRefreshTokenQuery = `INSERT INTO refresh_tokens (username, token) VALUES ('${username}', '${refreshToken}')`
                db.run(insertRefreshTokenQuery, (error) => {
                    if (error) throw error
                    res.json({ accessToken, refreshToken })
                })
            } else {
                res.status(401).json({ message: "Login failed" })
            }
        } else {
            res.status(401).json({ message: "Login failed" })
        }
    })
})

app.post("/logout", (req, res) => {
    const { refreshToken } = req.body
    const deleteRefreshTokenQuery = `DELETE FROM refresh_tokens WHERE token = '${refreshToken}'`
    db.run(deleteRefreshTokenQuery, (error) => {
        if (error) throw error
        res.json({ message: "Refresh token invalidated" })
    })
})

app.post("/token", (req, res) => {
    const { refreshToken } = req.body
    const selectRefreshTokenQuery = `SELECT * FROM refresh_tokens WHERE token = '${refreshToken}'`
    db.get(selectRefreshTokenQuery, (error, token) => {
        if (error) throw error
        if (token) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, decoded) => {
                if (error) throw error
                const { email } = decoded
                const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: "15m" })
                res.json({ accessToken })
            })
        } else {
            res.status(401).json({ message: "Invalid refresh token" })
        }
    })
})

app.listen(3001, () => {
    console.log("started backend server")
})
