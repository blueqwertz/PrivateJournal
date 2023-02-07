import { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

const LOGIN_URL = "/auth"

const Login = () => {
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
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3001/login")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                localStorage.setItem("refreshToken", response?.refreshToken)
                localStorage.setItem("accessToken", response?.accessToken)
                console.log(response)
            } else {
                setErrMsg(JSON.parse(xhr.response).message)
            }
        }
        xhr.send(JSON.stringify({ username: user, password: pwd }))
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
                                className="border rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white mb-3"
                            />
                            <div className="text-red-600 h-[19px]">{errMsg}</div>
                            <div className="flex justify-end">
                                <button type="submit" className="mt-3 bg-black dark:bg-white text-white dark:text-black py-2 px-6 font-semibold">
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
