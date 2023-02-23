import React, { useEffect } from "react"
import { VscWarning } from "react-icons/vsc"
import { Link } from "react-router-dom"

function Alert({ message, isVisible, setIsVisible }) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (!event.target.closest("#deletealert") && !event.target.closest("#usercontrollertoggle")) {
				setIsVisible(false)
			}
		}
		document.addEventListener("click", handleClickOutside)
	}, [])
	return (
		<div id="deletealert" className={`${isVisible ? "" : "pointer-events-none -translate-y-1/2 opacity-0"} fixed z-30 flex flex-col items-center place-self-center border border-gray-300 bg-text p-4 transition-all duration-150 dark:border-gray-500 dark:bg-popup dark:text-text`}>
			<div className="flex items-center justify-center gap-3 font-medium text-red-600">
				<VscWarning className="h-5 w-5" />
				<span>{message}</span>
			</div>
			<div className="flex w-full justify-between">
				<button
					onClick={() => {
						setIsVisible(false)
					}}
					className="mt-5 flex cursor-pointer items-center px-3 py-1 text-gray-700 ring-1 ring-gray-400 transition-all duration-150 hover:bg-gray-200 hover:ring-2 dark:text-gray-400 dark:ring-gray-600 dark:hover:bg-gray-800"
				>
					Cancel
				</button>
				<Link to="/delete">
					<button className="mt-5 flex cursor-pointer items-center bg-red-600 px-3 py-1 text-white ring-1 ring-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-700 hover:ring-2 dark:ring-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-400">Delete</button>
				</Link>
			</div>
		</div>
	)
}

export default Alert
