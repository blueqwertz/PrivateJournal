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
	}, [])

	return (
		<div className="relative z-50" id="darkmodetoggle">
			<div
				className="hover:cursor-pointer"
				onClick={() => {
					setShowOptions(!showOptions)
				}}
			>
				<span className={`flex h-7 w-7 items-center justify-center bg-gray-200 p-[6px] text-slate-500 ring-2 ring-gray-300 transition-all duration-100 dark:bg-popup dark:text-slate-400 dark:ring-gray-800 ${showOptions ? "rounded-md" : "rounded-lg"}`}>{isAuto ? darkMode ? <RiMoonClearLine /> : <RiSunLine /> : darkMode ? <RiMoonClearFill /> : <RiSunFill />}</span>
			</div>

			<ul className={`${showOptions ? "scale-100" : "pointer-events-none scale-90 opacity-0"} absolute right-0 top-full mt-2 origin-top-right overflow-hidden rounded-none border border-gray-400 bg-gray-100 py-1 text-slate-700 transition-all duration-100 dark:border-gray-700 dark:bg-popup dark:text-gray-400`}>
				<li className="justify-left flex cursor-pointer items-center gap-3 py-1 px-3 pr-5 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => handleDarkModeToggle("dark")}>
					<RiMoonClearLine />
					Dark
				</li>
				<li className="justify-left flex cursor-pointer items-center gap-3 py-1 px-3 pr-5 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => handleDarkModeToggle("light")}>
					<RiSunLine />
					Light
				</li>
				<li className="justify-left flex cursor-pointer items-center gap-3 py-1 px-3 pr-5 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => handleDarkModeToggle("auto")}>
					<RiComputerLine />
					System
				</li>
			</ul>
		</div>
	)
}

export default DarkModeToggle
