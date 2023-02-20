import React, { useEffect, useState } from "react"
import SideBar from "../Sidebar"
import { Link, useParams } from "react-router-dom"
import EditorWriter from "./EditorWriter"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { RiArrowLeftLine } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom"
import DatePicker from "../DatePicker"

const Editor = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const id = useParams()?.id
    const [story, setStory] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isDate, setIsDate] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/home"

    useEffect(() => {
        const getStories = async () => {
            const response = await axiosPrivate.post("/story", { user: auth?.user, id })
            const data = JSON.parse(response?.data?.stories[0])
            setStory(data)
            setIsLoading(false)
            setIsDate(data.date)
        }

        getStories()
    }, [])

    const handleStorySumit = async (value) => {
        await axiosPrivate
            .post("/story/save", {
                user: auth?.user,
                id,
                date: isDate,
                body: value,
            })
            .then(() => {
                navigate(from, { replace: true })
            })
    }

    const handleDeleteStory = async () => {
        await axiosPrivate.post("/story/delete", { user: auth?.user, id })
        navigate(from, { replace: true })
    }

    return (
        <main className="bg-gray-50 dark:bg-black flex flex-col min-w-[310px] h-full">
            <div className="flex flex-col min-h-screen min-w-full lg:w-[900px] lg:min-w-0 self-center px-6 pt-5">
                <SideBar />
                <div className="flex">
                    <Link to="/home">
                        <div className="flex items-center justify-left cursor-pointer text-gray-600 dark:text-gray-400 hover:ring-2 px-1 pr-[8px] ring-gray-400 dark:ring-gray-600 rounded transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-800 mb-3">
                            <RiArrowLeftLine />
                            Home
                        </div>
                    </Link>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <DatePicker date={new Date()} />
                        <input className="border-none ring-gray-200 bg-transparent text-2xl dark:ring-gray-400 ring-1 focus:ring-2 dark:text-white w-[180px] transition-all duration-150 h-5 px-2 py-5 mt-2 focus:outline-none focus:ring-gray-500 dark:focus:ring-gray-300 mb-3 font-semibold" value={isDate} onInput={(e) => setIsDate(e.target.value)} />
                        <EditorWriter callback={handleStorySumit} calldelete={handleDeleteStory} body={story.body} />
                    </>
                )}
            </div>
        </main>
    )
}

export default Editor
