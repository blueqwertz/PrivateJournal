import React from "react"

const SideBar = () => {
    return (
        <div className="w-full h-16 dark:bg-black flex items-center justify-between dark:text-gray-50">
            <div className="text-2xl font-semibold">Journal 📕</div>
            <div>
                <a href="/logout" className="hover:underline hover:cursor-pointer">
                    Logout
                </a>
            </div>
        </div>
    )
}

export default SideBar
