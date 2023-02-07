import { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

const LOGIN_URL = "/auth"

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState()
    const [pwd, setPwd] = useState()

    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)

    const [typingTimeout, setTypingTimeout] = useState(null)

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3001/register")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = function () {
            if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText)
            } else {
                setErrMsg(JSON.parse(xhr.response).message)
            }
        }
        xhr.send(JSON.stringify({ username: user, password: pwd }))
    }

    const checkPwd = (value, pwd) => {
        if (value == pwd) {
            setErrMsg("")
        }
        clearTimeout(typingTimeout)
        setTypingTimeout(
            setTimeout(() => {
                if (value != pwd) {
                    setErrMsg("Passwords do not match.")
                } else {
                    setErrMsg("")
                }
            }, 200)
        )
    }

    return (
        <main>
            <div className="bg-gray-50 dark:bg-black text-gray-800 flex flex-col justify-center items-center min-h-screen">
                {/* <div className="w-20 h-20">
                    <img src={logo} className="dark:border rounded-full" />
                </div> */}
                <form className="px-6 py-6 sm:w-96" onSubmit={handleSubmit}>
                    <h1 className="text-2xl dark:text-white font-semibold mb-1">Register new account 🔐</h1>
                    <Link to="/login" className="text-gray-400 hover:underline hover:cursor-pointer">
                        Login instead
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
                                className="border rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white"
                            />
                            <label className="block dark:text-white font-semibold mt-4">Repeat Password</label>
                            <input
                                onChange={(e) => {
                                    checkPwd(e.target.value, pwd)
                                }}
                                type="password"
                                placeholder="passbobhere"
                                className="border rounded-none bg-transparent font-mono dark:border-gray-200 dark:text-white w-full h-5 px-3 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white mb-3"
                            />
                            <div className="text-red-600 h-[19px]">{errMsg}</div>
                            <div className="flex justify-end">
                                <button type="submit" className="mt-3 bg-black dark:bg-white text-white dark:text-black py-2 px-6 font-semibold">
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
