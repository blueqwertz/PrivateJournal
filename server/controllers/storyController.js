const User = require("../model/User")

const submitStory = async (req, res) => {
    const { id, user, date, body } = req.body
    if (!id || !user || !date || !body) return res.status(400).json({ message: "Some fields are missing." })

    const foundUser = await User.findOne({ username: user }).exec()
    if (!foundUser) return res.sendStatus(401) //Unauthorized

    const prevStories = foundUser.stories
    foundUser.stories = [JSON.stringify({ id, date, body }), ...prevStories]
    foundUser.save()
    res.status(201).json({ success: `New story created!` })
}

const readStories = async (req, res) => {
    const { user } = req.body
    if (!user) return res.status(400).json({ message: "Some fields are missing." })

    const foundUser = await User.findOne({ username: user }).exec()
    if (!foundUser) return res.sendStatus(401) //Unauthorized

    res.json({ stories: foundUser.stories })
}

module.exports = { submitStory, readStories }
