import React, { useEffect, useState } from "react"
import SideBar from "../Sidebar"
import { Link, useParams } from "react-router-dom"
import EditorWriter from "./EditorWriter"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { RiArrowLeftLine } from "react-icons/ri"

const Editor = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const id = useParams()?.id
    const [story, setStory] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isDate, setIsDate] = useState(new Date(0))

    useEffect(() => {
        const getStories = async () => {
            const response = await axiosPrivate.post("/getstory", { user: auth?.user, id })
            const data = JSON.parse(response?.data?.stories[0])
            setStory(data)
            setIsLoading(false)
            console.log(data.date)
            let parts = data.date.split(".")
            let year = parts[2]
            let month = parts[1] - 1
            let day = parts[0]
            setIsDate(new Date(year, month, day))
            console.log(isDate, year, month, day)
        }

        getStories()
    }, [])

    return (
        <main className="bg-gray-50 dark:bg-black flex flex-col min-w-[310px] h-full">
            <div className="flex flex-col min-h-screen min-w-full md:min-w-[80%] lg:w-[900px] lg:min-w-0 self-center px-6 pt-5">
                <SideBar />
                <div className="flex">
                    <Link to="/home">
                        <div className="flex items-center justify-left cursor-pointer text-gray-600 dark:text-gray-400 hover:ring-2 px-1 pr-[8px] ring-gray-400 dark:ring-gray-600 rounded transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-800">
                            <RiArrowLeftLine />
                            Home
                        </div>
                    </Link>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="text-3xl mb-5 mt-3 font-semibold dark:text-white">{story.date}</div>
                        <EditorWriter body={story.body} />
                    </>
                )}
            </div>
        </main>
    )
}

export default Editor
