import { useRef, useState, useEffect } from "react"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState()
    const [pwd, setPwd] = useState()
    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd])

    return (
        <main>
            <div className="light:bg-gray-100 dark:bg-slate-900 text-gray-800 flex flex-col justify-center items-center min-h-screen">
                <form className="sm:w-96 shadow-xl">
                    <h1 className="text-2xl dark:text-white text-center font-semibold">Log in to your account 🔐</h1>
                    <div className="mt-4 bg-white dark:bg-slate-800 shadow-md rounded-lg">
                        <div className="py-1 bg-blue-400 dark:bg-blue-500 rounded-t-md"></div>
                        <div className="px-6 py-6 rounded-b-md">
                            <label className="block dark:text-slate-400 font-semibold">Username</label>
                            <input htmlFor="user" type="text" placeholder="blobbobuser" className="border dark:bg-slate-700 dark:border-slate-500 dark:text-white w-full h-5 px-3 py-5 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
                            <label className="block dark:text-slate-400 font-semibold mt-4">Password</label>
                            <input htmlFor="password" type="password" placeholder="passbobhere" className="border dark:bg-slate-700 dark:border-slate-500 dark:text-white w-full h-5 px-3 py-5 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
                            <div className="flex justify-center items-center">
                                <button type="submit" className="mt-5 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
                                    Submit
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
