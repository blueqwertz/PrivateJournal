import React, { useEffect, useState } from "react"
import { RiMoonClearLine, RiMoonClearFill, RiSunLine, RiSunFill, RiComputerLine } from "react-icons/ri"

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [isAuto, setIsAuto] = useState(false)

    const handleDarkModeToggle = (mode) => {
        setDarkMode(mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches))
        localStorage.setItem("theme", mode)
        setIsAuto(mode === "auto")
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.body.classList.add("dark")
            document.body.classList.remove("light")
        } else if (localStorage.theme === "light") {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        } else if (localStorage.theme === "auto") {
            document.body.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            document.body.classList.remove(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark")
        } else {
            document.body.classList.add("dark")
        }
        setShowOptions(false)
    }

    useEffect(() => {
        handleDarkModeToggle(localStorage.theme)
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest("#darkmodetoggle")) {
                setShowOptions(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative z-50" id="darkmodetoggle">
            <div
                className="hover:cursor-pointer"
                onClick={() => {
                    setShowOptions(!showOptions)
                }}
            >
                <span className={`flex items-center text-slate-500 dark:text-slate-400 justify-center bg-gray-200 dark:bg-gray-900 w-7 h-7 p-[6px] rounded-full border border-gray-300 dark:border-gray-800`}>{isAuto ? darkMode ? <RiMoonClearLine /> : <RiSunLine /> : darkMode ? <RiMoonClearFill /> : <RiSunFill />}</span>
            </div>

            <ul className={`${showOptions ? "scale-100" : "scale-90 opacity-0 pointer-events-none"} border border-gray-400 dark:border-gray-700 origin-top-right transition-all duration-100 text-slate-700 dark:text-gray-400 absolute right-0 top-full bg-gray-200 dark:bg-gray-900 rounded-md py-1 mt-2 overflow-hidden`}>
                <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("dark")}>
                    <RiMoonClearLine />
                    Dark
                </li>
                <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("light")}>
                    <RiSunLine />
                    Light
                </li>
                <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("auto")}>
                    <RiComputerLine />
                    System
                </li>
            </ul>
        </div>
    )
}

export default DarkModeToggle
