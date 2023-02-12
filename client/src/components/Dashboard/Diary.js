import React, { useEffect } from "react"
import Story from "./Story"

const Diary = ({ stories }) => {
    return stories?.length > 0 ? (
        stories.map((story) => {
            return <Story key={story.id} title={story.date} body={story.body} />
        })
    ) : (
        <p className="dark:text-gray-400">Nothing here...</p>
    )
}

export default Diary
