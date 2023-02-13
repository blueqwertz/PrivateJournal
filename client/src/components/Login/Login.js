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
        const hashpassword = await bcrypt.hash(pwd, salt)
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd: hashpassword }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({ user, roles, accessToken })
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
            <div className="bg-gray-50 dark:bg-black text-gray-800 flex flex-col justify-center items-center min-h-screen">
                {/* <div className="w-20 h-20">
                    <img src={logo} className="dark:border rounded-full" />
                </div> */}
                <form className="px-6 py-6 sm:w-96" onSubmit={handleSubmit}>
                    <h1 className="text-2xl dark:text-white font-semibold mb-1">Log in to your account 🔐</h1>
                    <Link to="/register" className="text-gray-400 hover:underline hover:cursor-pointer">
                        Register instead
                    </Link>
                    <div className="mt-3">
                        <div className="rounded-b-md">
                            <label className="block dark:text-white font-semibold">Username</label>
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
                                className="border border-gray-300 rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white"
                            />
                            <label className="block dark:text-white font-semibold mt-4">Password</label>
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
                                className="border border-gray-300 rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white mb-3"
                            />
                            <div className="text-red-600 h-[19px]">{errMsg}</div>
                            <div className="flex justify-end">
                                <button type="submit" className="mt-3 bg-black dark:bg-white text-white dark:text-black py-2 px-6 font-semibold focus:ring-2 focus:ring-gray-500 transition-all duration-200">
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
