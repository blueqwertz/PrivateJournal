import React, { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../Alert"
import DarkModeToggle from "./DarkModeToggle"
import UserController from "./UserController"

const SideBar = () => {
	const [showDeleteAlert, setShowDeleteAlert] = useState(false)
	return (
		<>
			<div className="flex h-16 w-full items-center justify-between dark:text-text">
				<Link to="/home" className="hover:cursor-pointer">
					<div className="flex text-2xl">
						<span className="font-light text-accent">Private</span>
						<span className="font-semibold">Journal 📕</span>
					</div>
				</Link>
				<div className="flex items-center justify-center gap-3">
					<DarkModeToggle />
					<UserController setAlert={setShowDeleteAlert} />
				</div>
			</div>
			<Alert message={"Are you sure, you want to delete your account?"} isVisible={showDeleteAlert} setIsVisible={setShowDeleteAlert} />
		</>
	)
}

export default SideBar
