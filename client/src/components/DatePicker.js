import React, { useState, useEffect } from "react"
import "dayjs"
import { generateDate } from "../utils/calendar"
import { RiArrowLeftLine, RiArrowRightLine, RiCalendarLine } from "react-icons/ri"

export default function DatePicker({ storyDate, setStoryDate }) {
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [dateLocal, setDateLocal] = useState(storyDate)

	const [month, setMonth] = useState(storyDate.getMonth())
	const [year, setYear] = useState(storyDate.getFullYear())

	const days = ["M", "T", "W", "T", "F", "S", "S"]

	const monthBack = () => {
		if (month == 0) {
			setMonth(11)
			setYear(year - 1)
		} else {
			setMonth(month - 1)
		}
	}

	const monthForward = () => {
		if (month == 11) {
			setMonth(0)
			setYear(year + 1)
		} else {
			setMonth(month + 1)
		}
	}

	const monthYearToday = () => {
		setMonth(dateLocal.getMonth())
		setYear(dateLocal.getFullYear())
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (!event.target.closest("#datepickertoggle")) {
				setShowDatePicker(false)
			}
		}
		document.addEventListener("click", handleClickOutside)
	}, [])

	return (
		<div className="relative">
			<div className="flex">
				<div
					id="datepickertoggle"
					className="mb-5 cursor-pointer select-none border border-gray-300 px-2 py-1 text-lg dark:border-gray-500 dark:text-white"
					onClick={() => {
						setShowDatePicker(!showDatePicker)
					}}
				>
					{dateLocal.toLocaleDateString("de-de", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					})}
				</div>
			</div>
			<div id="datepickertoggle" className={`${showDatePicker ? "scale-100" : "pointer-events-none scale-90 opacity-0"} absolute top-10 z-50 mt-2 w-96 origin-top-left border border-gray-400 bg-white transition-all duration-200 dark:border-gray-400 dark:bg-black dark:text-white`}>
				<div className="flex h-10 font-extralight">
					<div className="flex grow items-center justify-around">
						<div className="p-3 hover:cursor-pointer" onClick={monthBack}>
							<RiArrowLeftLine />
						</div>
						<p className="w-20 text-center">
							{month + 1}/{year}
						</p>
						<div className="p-3 hover:cursor-pointer" onClick={monthForward}>
							<RiArrowRightLine />
						</div>
					</div>
					<div className="flex items-center p-3 hover:cursor-pointer" onClick={monthYearToday}>
						<RiCalendarLine />
					</div>
				</div>
				<div className="grid w-full grid-cols-7">
					{days.map((day, index) => {
						return (
							<div key={index} className="grid h-10 place-content-center border-t border-gray-400 text-sm font-bold italic text-gray-600 dark:text-gray-200">
								{day}
							</div>
						)
					})}
				</div>
				<div className="grid w-full grid-cols-7">
					{generateDate(dateLocal, month, year).map(({ date, currentMonth, selected, previousMonth, nextMonth }, index) => {
						return (
							<div
								key={index}
								className={`grid h-14 cursor-pointer place-content-center border-t border-gray-400 ${currentMonth ? "" : "text-gray-400"}`}
								onClick={() => {
									currentMonth && (setStoryDate(date.toDate()) || setDateLocal(date.toDate()) || setShowDatePicker(false))
									if (previousMonth) {
										monthBack()
									} else if (nextMonth) {
										monthForward()
									}
								}}
							>
								<div
									className={`transition-background grid h-10 w-10 select-none place-content-center rounded-full font-light transition-bg  ${
										selected ? (currentMonth ? "bg-sky-200 hover:bg-sky-300 active:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600 dark:active:bg-sky-700" : "bg-gray-300 dark:bg-gray-500") : currentMonth ? "hover:bg-gray-200 active:bg-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-500" : ""
									}`}
								>
									{date.date()}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
