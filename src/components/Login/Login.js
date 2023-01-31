import React from "react"

const Login = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault()

        let email = e.target.elements.email?.value
        let password = e.target.elements.password?.value

        console.log(email, password)
    }
    return (
        <div>
            <div className="bg-gray-100 text-gray-800 flex flex-col justify-center items-center min-h-screen">
                <form>
                    <h1 className="text-2xl font-light text-center">Log in to your account 🔐</h1>
                    <div className="mt-4 bg-white shadow-md rounded-lg">
                        <div className="py-2 bg-indigo-400 rounded-t-md"></div>
                        <div className="px-6 py-8 rounded-b-md">
                            <label className="block font-semibold">Username</label>
                            <input type="text" placeholder="blobbobuser" className="border w-full h-5 px-3 py-5 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                            <label className="block font-semibold mt-3">Password</label>
                            <input type="password" placeholder="bobwordhere" className="border w-full h-5 px-3 py-5 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
