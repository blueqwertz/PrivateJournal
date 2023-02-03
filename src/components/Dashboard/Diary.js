import React from "react"
import Story from "./Story"

const Diary = () => {
    let stories = [
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space. The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
        { title: "02/02/2023", body: "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space." },
    ]
    return stories.map((story) => {
        return <Story title={story.title} body={story.body} />
    })
}

export default Diary
