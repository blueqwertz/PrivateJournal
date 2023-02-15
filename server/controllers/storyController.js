const User = require("../model/User")
const jwt = require("jsonwebtoken")

const submitStory = async (req, res) => {
    try {
        const { id, user, date, body } = req.body

        jwt.verify(req.cookies?.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user !== decoded.username) return res.sendStatus(403)
        })

        if (!id || !user || !date || !body) return res.status(400).json({ message: "Some fields are missing." })

        const foundUser = await User.findOne({ username: user }).exec()
        if (!foundUser) return res.sendStatus(401) //Unauthorized

        const prevStories = foundUser.stories
        foundUser.stories = [JSON.stringify({ id, date, body }), ...prevStories]
        foundUser.save()
        res.status(201).json({ success: `New story created!` })
    } catch (err) {}
}

const readStories = async (req, res) => {
    try {
        const { user, id } = req.body

        console.log(user, id)

        jwt.verify(req.cookies?.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user !== decoded.username) return res.sendStatus(403)
        })

        if (!user) return res.status(400).json({ message: "Some fields are missing." })

        const foundUser = await User.findOne({ username: user }).exec()
        if (!foundUser) return res.sendStatus(401) //Unauthorized
        if (id === undefined) {
            res.json({ stories: foundUser.stories })
        } else {
            res.json({
                stories: foundUser.stories.filter((story) => {
                    return JSON.parse(story).id === id
                }),
            })
        }
    } catch (err) {}
}

const deleteStory = async (req, res) => {
    try {
        const { user, id } = req.body

        jwt.verify(req.cookies?.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user !== decoded.username) return res.sendStatus(403)
        })

        if (!user || !id) return res.status(400).json({ message: "Some fields are missing." })

        const foundUser = await User.findOne({ username: user }).exec()
        if (!foundUser) return res.sendStatus(401)
        foundUser.stories = foundUser.stories.filter((story) => {
            return story.id != id
        })
    } catch (err) {}
}

module.exports = { submitStory, readStories, deleteStory }
