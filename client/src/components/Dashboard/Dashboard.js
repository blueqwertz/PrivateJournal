import React, { useEffect, useState } from "react"
import SideBar from "./Sidebar"
import Diary from "./Diary"
import Writer from "./Writer"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"

export default function Dashboard() {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [stories, setStories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function greetingsByTimeOfDay() {
        let currentHour = new Date().getHours()

        if (currentHour >= 4 && currentHour < 12) {
            return "Have a great day!"
        } else if (currentHour >= 12 && currentHour < 17) {
            return "Good afternoon, take it easy!"
        } else if (currentHour >= 17 && currentHour < 21) {
            return "Enjoy your night!"
        } else if (currentHour >= 21 && currentHour < 24) {
            return "Good night, sweet dreams!"
        } else {
            return "Keep your eyes open and enjoy the night!"
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await axiosPrivate.post("/getstory", { user: auth?.user })
            setStories(
                response?.data?.stories.map((story) => {
                    return JSON.parse(story)
                })
            )
        }

        getUsers()
    }, [])

    function generateUUID() {
        let d = new Date().getTime()
        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            d += performance.now()
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
        })
    }

    function handleStorySumit(value) {
        const id = generateUUID()
        axiosPrivate
            .post(
                "/story",
                {
                    id,
                    date: new Date().toLocaleDateString("de-de", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }),
                    body: value.trim(),
                    user: auth.user,
                },
                { withCredentials: true }
            )
            .then(() => {
                setStories([
                    {
                        id,
                        date: new Date().toLocaleDateString("de-de", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }),
                        body: value.trim(),
                        user: auth.user,
                    },
                    ...stories,
                ])
                setIsLoading(false)
            })
    }

    let greeting = greetingsByTimeOfDay()

    return (
        <main className="bg-gray-50 dark:bg-black flex flex-col min-w-[310px]">
            <div className="flex flex-col min-h-screen min-w-full md:min-w-[80%] lg:w-[900px] lg:min-w-0 self-center px-6 pt-5">
                <SideBar />
                <div className="py-4 mt-5">
                    <h1 className="dark:text-white text-4xl font-medium">{greeting}</h1>
                </div>
                <span className="dark:text-white text-xl mb-3 font-semibold">Todays Story</span>
                <Writer callback={handleStorySumit} />
                <div className="dark:text-white text-xl mb-3">
                    <span>Previous Stories</span>
                </div>
                <div className="flex flex-wrap align gap-6 pb-10">
                    <Diary stories={stories} />
                    <div className="w-40 p-3 flex-auto"></div>
                </div>
            </div>
        </main>
    )
}
