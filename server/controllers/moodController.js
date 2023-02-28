const User = require("../model/User")
const jwt = require("jsonwebtoken")

const submitMood = async (req, res) => {
	try {
		const { id, user, date, mood } = req.body

		jwt.verify(req.cookies?.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err || user !== decoded.username) return res.sendStatus(403)
		})

		if (!id || !user || !date || mood === undefined) return res.status(400).json({ message: "Some fields are missing." })

		const foundUser = await User.findOne({ username: user }).exec()
		if (!foundUser) return res.sendStatus(401) //Unauthorized

		const prevMoods = foundUser.moods
		foundUser.moods = [JSON.stringify({ id, date, mood }), ...prevMoods]
		foundUser.save()
		res.status(201).json({ success: `Mood added to history!` })
	} catch (err) {}
}

const readMood = async (req, res) => {
	try {
		const { user } = req.body

		if (!user) return res.status(400).json({ message: "Some fields are missing." })

		jwt.verify(req.cookies?.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err || user !== decoded.username) return res.sendStatus(403)
		})

		const foundUser = await User.findOne({ username: user }).exec()
		if (!foundUser) return res.sendStatus(401)

		res.json({ moods: foundUser.moods })
	} catch (err) {}
}

module.exports = { submitMood, readMood }
