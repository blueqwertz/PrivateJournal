import React from "react"

const Writer = ({ title, body }) => {
    return <textarea className="w-full h-56 resize-none rounded-none dark:bg-black px-3 py-2 border outline-none text-white font-mono mb-5 dark:border-gray-400" placeholder="Write about your day..."></textarea>
}

export default Writer
