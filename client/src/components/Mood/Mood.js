import React, { useEffect, useState } from "react"
import SideBar from "../Sidebar"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import MoodDiary from "./MoodDiary"
import { Link } from "react-router-dom"
import { RiArrowLeftLine } from "react-icons/ri"

export default function MoodDashboard() {
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()

	const [moods, setMoods] = useState([])

	useEffect(() => {
		const getMoods = async () => {
			const response = await axiosPrivate.post("/mood", { user: auth?.user })
			const moodData = response?.data?.moods.sort((a, b) => {
				const dateA = new Date(a.date)
				const dateB = new Date(b.date)
				return dateA - dateB
			})
			setMoods(moodData)
		}

		getMoods()
	}, [])

	return (
		<main className="flex h-full min-w-[310px] flex-col bg-gray-50 dark:bg-background">
			<div className="flex min-h-screen min-w-full flex-col self-center px-6 pt-5 lg:w-[900px] lg:min-w-0">
				<SideBar />
				<div className="flex">
					<Link to="/home">
						<div className="justify-left mb-3 flex cursor-pointer items-center rounded px-1 pr-[8px] text-gray-600 ring-gray-400 transition-all duration-150 hover:bg-gray-200 hover:ring-2 dark:text-gray-400 dark:ring-gray-600 dark:hover:bg-gray-800">
							<RiArrowLeftLine />
							Home
						</div>
					</Link>
				</div>
				{moods.length > 0 ? <MoodDiary history={moods} /> : <p className="mt-3 text-gray-500 dark:text-gray-400">Nothing here...</p>}
			</div>
		</main>
	)
}
