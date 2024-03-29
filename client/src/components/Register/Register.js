import React from "react"
import { useRef, useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import bcrypt from "bcryptjs"
import useAuth from "../../hooks/useAuth"

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/
const PWD_REGEX = /^\S{8,}$/
const REGISTER_URL = "/register"
const LOGIN_URL = "/auth"

const Register = () => {
	const { setAuth } = useAuth()

	const userRef = useRef()

	const [user, setUser] = useState("")
	const [validName, setValidName] = useState(false)

	const [pwd, setPwd] = useState("")
	const [validPwd, setValidPwd] = useState(false)

	const [matchPwd, setMatchPwd] = useState("")
	const [validMatch, setValidMatch] = useState(false)

	const [errMsg, setErrMsg] = useState("")

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/home"

	useEffect(() => {
		setValidName(USER_REGEX.test(user))
	}, [user])

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd))
		setValidMatch(pwd === matchPwd)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd, matchPwd])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const v1 = USER_REGEX.test(user)
		const v2 = PWD_REGEX.test(pwd)
		const v3 = pwd === matchPwd

		if (!v1) {
			setErrMsg("Username Not Allowed")
			return
		} else if (!v2) {
			setErrMsg("Password Has To Have At Least 8 Characters")
			return
		} else if (!v3) {
			setErrMsg("Passwords Do Not Match")
			return
		}

		setErrMsg("")

		try {
			const salt = "$2a$10$k/WnQ.zNOIHwphvy1vec0O"
			const localSalt = "$2a$10$3irXlDfQUZVI1HtLkIwciO"
			const hashpassword = await bcrypt.hash(pwd, salt)
			const localEncryptionKey = await bcrypt.hash(pwd, localSalt)
			localStorage.setItem("encryptionKey", localEncryptionKey)

			await axios.post(REGISTER_URL, JSON.stringify({ user, pwd: hashpassword }), {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})

			const login_response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd: hashpassword }), {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})
			const accessToken = login_response?.data?.accessToken
			const roles = login_response?.data?.roles

			setAuth({ user, pwd, roles, accessToken })

			setUser("")
			setPwd("")
			setMatchPwd("")

			navigate(from, { replace: true })
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response")
			} else if (err.response?.status === 409) {
				setErrMsg("Username Already Taken")
			} else {
				setErrMsg("Registration Failed")
			}
		}
	}

	return (
		<main>
			<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800 dark:bg-background">
				{/* <div className="w-20 h-20">
                    <img src={logo} className="dark:border rounded-full" />
                </div> */}
				<form className="px-6 py-6 sm:w-96" onSubmit={handleSubmit}>
					<h1 className="mb-1 text-2xl font-semibold dark:text-white">Register new account 🔐</h1>
					<Link to="/login" className="text-gray-400 hover:cursor-pointer hover:underline">
						Login instead
					</Link>
					<div className="mt-3">
						<div className="rounded-b-md">
							<label className="block font-semibold dark:text-white">Username</label>
							<input
								ref={userRef}
								onChange={(e) => {
									setUser(e.target.value)
								}}
								value={user}
								id="user"
								required
								autoComplete="off"
								htmlFor="user"
								type="text"
								placeholder="blobbobuser"
								className="mt-2 h-5 w-full rounded-none border border-gray-300 bg-transparent px-3 py-5 font-mono focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-200 dark:text-white dark:focus:ring-white"
							/>
							<label className="mt-4 block font-semibold dark:text-white">Password</label>
							<input
								ref={userRef}
								onChange={(e) => {
									setPwd(e.target.value)
								}}
								aria-invalid={validPwd ? "false" : "true"}
								value={pwd}
								id="password"
								htmlFor="password"
								type="password"
								placeholder="passbobhere"
								className="mt-2 h-5 w-full rounded-none border border-gray-300 bg-transparent px-3 py-5 font-mono focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-200 dark:text-white dark:focus:ring-white"
							/>
							<label className="mt-4 block font-semibold dark:text-white">Repeat Password</label>
							<input
								value={matchPwd}
								onChange={(e) => {
									setMatchPwd(e.target.value)
								}}
								aria-invalid={validMatch ? "false" : "true"}
								type="password"
								placeholder="passbobhere"
								className="mt-2 mb-3 h-5 w-full rounded-none border border-gray-300 bg-transparent px-3 py-5 font-mono focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-200 dark:text-white dark:focus:ring-white"
							/>
							<div className="h-[19px] text-red-600">{errMsg}</div>
							<div className="flex justify-end">
								<button type="submit" className="mt-3 bg-black py-2 px-6 font-semibold text-white dark:bg-white dark:text-black">
									Register
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</main>
	)
}

export default Register
