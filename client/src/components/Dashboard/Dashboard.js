import React, { useEffect, useState } from "react"
import SideBar from "../Sidebar"
import Diary from "./Diary"
import Writer from "./Writer"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import { encrypt, decrypt } from "n-krypta"
import { RiArrowRightLine } from "react-icons/ri"
import MoodPicker from "../MoodPicker"
import { Link } from "react-router-dom"

export default function Dashboard() {
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()

	const [stories, setStories] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	function greetingsByTimeOfDay() {
		let currentHour = new Date().getHours()

		if (currentHour >= 4 && currentHour < 12) {
			return "Have a great day!"
		} else if (currentHour >= 12 && currentHour <= 15) {
			return "Enjoy your lunch!"
		} else if (currentHour >= 15 && currentHour < 17) {
			return "Good afternoon, take it easy!"
		} else if (currentHour >= 17 && currentHour < 19) {
			return "Almost done for the day!"
		} else if (currentHour >= 19 && currentHour < 21) {
			return "Enjoy your evening!"
		} else if (currentHour >= 21 && currentHour < 24) {
			return "Good night, sweet dreams!"
		} else {
			return "Keep your eyes open and enjoy the night!"
		}
	}

	useEffect(() => {
		const getStories = async () => {
			const response = await axiosPrivate.post("/story", { user: auth?.user })
			const storiesData = response?.data?.stories
				.map((story) => {
					return JSON.parse(story)
				})
				.map((story) => {
					story.body = decrypt(story.body, localStorage.getItem("encryptionKey"))
					return story
				})
				.sort((a, b) => {
					const dateA = new Date(a.date.split(".").reverse().join("-"))
					const dateB = new Date(b.date.split(".").reverse().join("-"))
					return dateB - dateA
				})
			setStories(storiesData)
		}

		getStories()
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

	async function handleMoodSubmit(value) {
		const id = generateUUID()
		await axiosPrivate.post("/mood/add", {
			id,
			date: new Date().toLocaleDateString("de-de", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
			mood: value,
			user: auth.user,
		})
	}

	async function handleStorySumit(value) {
		const id = generateUUID()
		const encryptedBody = await encrypt(value.trim(), localStorage.getItem("encryptionKey"))
		await axiosPrivate
			.post("/story/add", {
				id,
				date: new Date().toLocaleDateString("de-de", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
				body: encryptedBody,
				user: auth.user,
			})
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
		<main className="flex h-full min-w-[310px] flex-col bg-gray-50 dark:bg-background">
			<div className="flex min-h-screen min-w-full flex-col self-center px-6 pt-5 lg:w-[900px] lg:min-w-0">
				<SideBar />
				<div className="mt-5 py-4">
					<h1 className="text-4xl font-medium dark:text-text">{greeting}</h1>
				</div>
				<span className="mb-3 flex justify-between text-xl dark:text-text">
					<span>Current Mood</span>
					<Link to="/mood">
						<div className="flex cursor-pointer items-center justify-center gap-1 text-lg text-gray-500 hover:underline">
							View history
							<RiArrowRightLine />
						</div>
					</Link>
				</span>
				<MoodPicker callback={handleMoodSubmit} />
				<span className="mb-3 text-xl font-semibold dark:text-text">
					<span>Today's Story</span>
				</span>
				<Writer callback={handleStorySumit} />
				<div className="mb-3 text-xl dark:text-text">
					<span>Previous Stories</span>
				</div>
				<div className="align flex flex-wrap gap-6 pb-10">
					<Diary stories={stories} />
					<div className="w-40 flex-auto p-3"></div>
					<div className="w-40 flex-auto p-3"></div>
				</div>
			</div>
		</main>
	)
}
