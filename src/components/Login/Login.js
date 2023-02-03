import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import axios from "../../api/axios"

const LOGIN_URL = "/auth"

const Login = () => {
    const { setAuth } = useContext(AuthContext)

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState()
    const [pwd, setPwd] = useState()

    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({ user, pwd, roles, accessToken })
            setUser("")
            setPwd("")
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status == 400) {
                setErrMsg("Missing Username or Password")
            } else if (err.response?.status == 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg("An error occurred")
            }
            errRef.current.focus()
        }
    }

    return (
        <main>
            <div className="bg-gray-50 dark:bg-black text-gray-800 flex flex-col justify-center items-center min-h-screen">
                {/* <div className="w-20 h-20">
                    <img src={logo} className="dark:border rounded-full" />
                </div> */}
                <form className="px-6 py-6 sm:w-96" onSubmit={handleSubmit}>
                    <h1 className="text-2xl dark:text-white font-semibold">Log in to your account 🔐</h1>
                    <div className="mt-6">
                        <div className="rounded-b-md">
                            <label className="block dark:text-white font-semibold">Username</label>
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
                                className="border rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white"
                            />
                            <label className="block dark:text-white font-semibold mt-4">Password</label>
                            <input
                                ref={userRef}
                                onChange={(e) => {
                                    setPwd(e.target.value)
                                }}
                                value={pwd}
                                id="password"
                                htmlFor="password"
                                type="password"
                                placeholder="passbobhere"
                                className="border rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white"
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="mt-6 border text-black dark:text-white py-2 px-6 font-semibold">
                                    Register
                                </button>
                                <button type="submit" className="mt-6 bg-black dark:bg-white text-white dark:text-black py-2 px-6 font-semibold">
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
