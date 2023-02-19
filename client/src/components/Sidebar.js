import React from "react"
import { Link } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"

const SideBar = () => {
    return (
        <div className="w-full h-16 dark:bg-black flex items-center justify-between dark:text-gray-50">
            <Link to="/home" className="hover:cursor-pointer">
                <div className="text-2xl flex">
                    <span className="text-gray-400 font-light">Private</span>
                    <span className="font-semibold">Journal 📕</span>
                </div>
            </Link>
            <div className="flex gap-4 items-center justify-center">
                <DarkModeToggle />
                <Link to="/logout" className="hover:underline hover:cursor-pointer">
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default SideBar
