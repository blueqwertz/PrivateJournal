import React from "react"
import logo from "../../img/yin-yang-symbol.png"

const SideBar = () => {
    return (
        <div className="w-full h-16 bg-black flex items-center justify-between p-4 text-gray-50 md:px-10">
            <div className=" text-2xl font-semibold">Journal 📕</div>
            <div>
                <a href="/logout" className="hover:underline hover:cursor-pointer">
                    Logout
                </a>
            </div>
        </div>
    )
}

export default SideBar
