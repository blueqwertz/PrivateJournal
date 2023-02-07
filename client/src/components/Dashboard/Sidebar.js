import React from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className="w-full h-16 dark:bg-black flex items-center justify-between dark:text-gray-50">
            <div className="text-2xl flex">
                <span className="text-gray-400 font-light">Private</span>
                <span className="font-semibold">Journal 📕</span>
            </div>
            <div>
                <Link to="/logout" className="hover:underline hover:cursor-pointer">
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default SideBar
