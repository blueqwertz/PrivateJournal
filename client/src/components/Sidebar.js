import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import DarkModeToggle from "./DarkModeToggle"
import UserController from "./UserController"

const SideBar = () => {
	return (
		<div className="flex h-16 w-full items-center justify-between dark:text-text">
			<Link to="/home" className="hover:cursor-pointer">
				<div className="flex text-2xl">
					<span className="font-light text-accent">Private</span>
					<span className="font-semibold">Journal 📕</span>
				</div>
			</Link>
			<div className="flex items-center justify-center gap-3">
				<DarkModeToggle />
				<UserController />
			</div>
		</div>
	)
}

export default SideBar
