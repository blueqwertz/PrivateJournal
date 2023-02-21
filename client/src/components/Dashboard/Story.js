import React from "react"
import { Link } from "react-router-dom"

const Story = ({ id, title, body }) => {
	return (
		<Link to={`/story/${id}`} className="w-40 flex-auto">
			<div className="group h-full overflow-hidden rounded-none border bg-transparent p-3 hover:cursor-pointer dark:border-gray-400 dark:bg-popup">
				<h3 className="text-2xl tracking-tight text-black dark:text-white">{title}</h3>
				<p className="text-md mt-1 max-h-36 overflow-x-hidden text-gray-500 blur-sm transition duration-100 ease-in-out group-hover:blur-none dark:text-gray-300">{body}</p>
			</div>
		</Link>
	)
}

export default Story
