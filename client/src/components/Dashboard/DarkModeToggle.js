import React, { useEffect, useState } from "react"
import { MoonStarsFill, BrightnessHighFill, Display } from "react-bootstrap-icons"

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const handleDarkModeToggle = (mode) => {
        setDarkMode(mode == "dark" || (mode == "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches))
        localStorage.setItem("theme", mode)
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
        <div className="relative" id="darkmodetoggle">
            <div
                onClick={() => {
                    setShowOptions(!showOptions)
                }}
            >
                <span className={`flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-200"} w-7 h-7 p-[6px] rounded-full border border-gray-300 dark:border-gray-800`}>{darkMode ? <MoonStarsFill className="p-px" /> : <BrightnessHighFill />}</span>
            </div>
            {showOptions && (
                <ul className="absolute right-0 top-full bg-gray-200 dark:bg-gray-900 rounded py-1 mt-2 overflow-hidden">
                    <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("dark")}>
                        <MoonStarsFill className="text-gray-600 dark:text-gray-300" />
                        Dark
                    </li>
                    <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("light")}>
                        <BrightnessHighFill className="text-gray-600 dark:text-gray-300" />
                        Light
                    </li>
                    <li className="py-1 px-3 pr-5 cursor-pointer flex gap-3 justify-left items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200" onClick={() => handleDarkModeToggle("auto")}>
                        <Display className="text-gray-600 dark:text-gray-300" />
                        System
                    </li>
                </ul>
            )}
        </div>
    )
}

export default DarkModeToggle
