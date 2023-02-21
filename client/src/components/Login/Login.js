import React from "react"
import { useRef, useState, useEffect } from "react"
import axios from "../../api/axios"
import useAuth from "../../hooks/useAuth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"

const LOGIN_URL = "/auth"

const Login = () => {
	const { setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/home"

	const userRef = useRef()

	const [user, setUser] = useState("")
	const [pwd, setPwd] = useState("")
	const [errMsg, setErrMsg] = useState("")

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const salt = "$2a$10$k/WnQ.zNOIHwphvy1vec0O"
		const localSalt = "$2a$10$3irXlDfQUZVI1HtLkIwciO"
		const hashpassword = await bcrypt.hash(pwd, salt)
		const localEncryptionKey = await bcrypt.hash(pwd, localSalt)
		localStorage.setItem("encryptionKey", localEncryptionKey)

		try {
			const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd: hashpassword }), {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})
			const accessToken = response?.data?.accessToken
			const roles = response?.data?.roles
			const encryptionKey = response?.data?.roles
			setAuth({ user, roles, accessToken, encryptionKey })
			setUser("")
			setPwd("")
			navigate(from, { replace: true })
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response")
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password")
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized")
			} else {
				setErrMsg("Login Failed")
			}
		}
	}

	return (
		<main>
			<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800 dark:bg-black">
				{/* <div className="w-20 h-20">
                    <img src={logo} className="dark:border rounded-full" />
                </div> */}
				<form className="px-6 py-6 sm:w-96" onSubmit={handleSubmit}>
					<h1 className="mb-1 text-2xl font-semibold dark:text-white">Log in to your account 🔐</h1>
					<Link to="/register" className="text-gray-400 hover:cursor-pointer hover:underline">
						Register instead
					</Link>
					<div className="mt-3">
						<div className="rounded-b-md">
							<label className="block font-semibold dark:text-white">Username</label>
							<input
								ref={userRef}
								value={user}
								onChange={(e) => {
									setUser(e.target.value)
								}}
								id="user"
								required
								autoComplete="off"
								htmlFor="username"
								type="text"
								placeholder="blobbobuser"
								className="mt-2 h-5 w-full rounded-none border border-gray-300 bg-transparent px-3 py-5 font-mono focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-200 dark:text-white dark:focus:ring-white"
							/>
							<label className="mt-4 block font-semibold dark:text-white">Password</label>
							<input
								ref={userRef}
								value={pwd}
								onChange={(e) => {
									setPwd(e.target.value)
								}}
								id="password"
								required
								htmlFor="password"
								type="password"
								placeholder="passbobhere"
								className="mt-2 mb-3 h-5 w-full rounded-none border border-gray-300 bg-transparent px-3 py-5 font-mono focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-200 dark:text-white dark:focus:ring-white"
							/>
							<div className="h-[19px] text-red-600">{errMsg}</div>
							<div className="flex justify-end">
								<button type="submit" className="mt-3 bg-black py-2 px-6 font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-gray-500 dark:bg-white dark:text-black">
									Login
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</main>
	)
}

export default Login
