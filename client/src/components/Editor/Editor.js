import React, { useEffect, useState } from "react"
import SideBar from "../Sidebar"
import { Link, useParams } from "react-router-dom"
import EditorWriter from "./EditorWriter"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { RiArrowLeftLine } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom"
import DatePicker from "../DatePicker"
import { decrypt } from "n-krypta"

const Editor = () => {
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()

	const id = useParams()?.id
	const [story, setStory] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [isDate, setIsDate] = useState(new Date())

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/home"

	useEffect(() => {
		const getStories = async () => {
			const response = await axiosPrivate.post("/story", { user: auth?.user, id })
			const data = JSON.parse(response?.data?.stories[0])
			console.log(data.body)
			data.body = decrypt(data.body, localStorage.getItem("encryptionKey"))
			setStory(data)
			setIsLoading(false)
			setIsDate(new Date(data.date.split(".")[2], data.date.split(".")[1] - 1, data.date.split(".")[0]))
		}

		getStories()
	}, [])

	const handleStorySumit = async (value) => {
		await axiosPrivate
			.post("/story/save", {
				user: auth?.user,
				id,
				date: isDate.toLocaleDateString("de-de", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
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
		<main className="flex h-full min-w-[310px] flex-col bg-gray-50 dark:bg-black">
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
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div>
						<DatePicker
							storyDate={isDate}
							setStoryDate={(value) => {
								setIsDate(value)
							}}
						/>
						<EditorWriter callback={handleStorySumit} calldelete={handleDeleteStory} body={story.body} />
					</div>
				)}
			</div>
		</main>
	)
}

export default Editor
