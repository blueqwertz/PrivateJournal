import React from "react"
import { useState } from "react"
import Story from "./Story"

const Diary = () => {
    let [stories, setStories] = useState([
        {
            id: 1,
            title: "02.02.2023",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
    ])
    return stories.map((story) => {
        return <Story key={story.id} title={story.title} body={story.body} />
    })
}

export default Diary
