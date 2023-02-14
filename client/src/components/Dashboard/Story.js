import React from "react"
import { Link } from "react-router-dom"

const Story = ({ id, title, body }) => {
    return (
        <Link to={`/story/${id}`} className="flex-auto w-40">
            <div className="h-full font-mono bg-white p-3 dark:bg-black border dark:border-gray-400 overflow-hidden hover:cursor-pointer">
                <h3 className="text-xl text-black dark:text-white tracking-tight">{title}</h3>
                <p className="transition ease-in-out duration-100 text-slate-500 max-h-36 dark:text-gray-300 mt-2 text-sm blur-sm hover:blur-none overflow-x-hidden">{body}</p>
            </div>
        </Link>
    )
}

export default Story
