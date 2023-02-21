const User = require("../model/User")
const jwt = require("jsonwebtoken")

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)
	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		return res.sendStatus(403)
	}
	// evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
		const roles = Object.values(foundUser.roles)
		const encryptionKey = foundUser.encryptionKey
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: decoded.username,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "5m" }
		)
		res.json({ user: decoded.username, roles, accessToken, encryptionKey })
	})
}

module.exports = { handleRefreshToken }
