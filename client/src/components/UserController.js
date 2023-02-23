import React, { useEffect, useState } from "react"
import { RiUser3Fill, RiDeleteBin4Line } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const UserController = ({ setAlert }) => {
	const [showOptions, setShowOptions] = useState(false)
	const { auth } = useAuth()

	useEffect(() => {
		function handleClickOutside(event) {
			if (!event.target.closest("#usercontrollertoggle")) {
				setShowOptions(false)
			}
		}
		document.addEventListener("click", handleClickOutside)
	}, [])

	return (
		<div className="relative z-20" id="usercontrollertoggle">
			<div
				className="hover:cursor-pointer"
				onClick={() => {
					setShowOptions(!showOptions)
				}}
			>
				<span className={`flex h-7 w-7 items-center justify-center bg-gray-200 p-[6px] text-slate-500 ring-2 ring-gray-300 transition-all duration-100 dark:bg-popup dark:text-slate-400 dark:ring-gray-800 ${showOptions ? "rounded-md" : "rounded-lg"}`}>
					<RiUser3Fill />
				</span>
			</div>

			<ul className={`${showOptions ? "scale-100" : "pointer-events-none scale-90 opacity-0"} absolute right-0 top-full mt-2 origin-top-right overflow-hidden rounded-none border border-gray-300 bg-gray-100 py-1 text-slate-700 transition-all duration-100 dark:border-gray-700 dark:bg-popup dark:text-gray-500`}>
				<li className="justify-left flex cursor-pointer items-center gap-3 border-b border-gray-300 py-1 px-3 pr-5 pb-2 transition-all duration-200 hover:cursor-pointer dark:border-gray-700 dark:text-gray-400">
					<RiUser3Fill />
					{auth.user}
				</li>
				<li>
					<Link to="/logout" className="justify-left mt-1 flex cursor-pointer items-center gap-3 py-1 px-3 pr-5 transition-all duration-200 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
						<TbLogout />
						Logout
					</Link>
				</li>
				<li
					onClick={() => {
						setAlert(true)
						setShowOptions(false)
					}}
					className="justify-left flex cursor-pointer items-center gap-3 py-1 px-3 pr-5 text-red-500 transition-all duration-200 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
				>
					<RiDeleteBin4Line />
					Delete
				</li>
			</ul>
		</div>
	)
}

export default UserController
