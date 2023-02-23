import React from "react"
import { BiHappy, BiHappyBeaming, BiHappyHeartEyes, BiSad, BiAngry, BiSleepy } from "react-icons/bi"
import { TbMoodNervous } from "react-icons/tb"

function Mood({ mood, currentMood, setCurrentMood }) {
	const moodNames = ["Happy", "Relaxed", "Tired", "Sad", "Nervous", "Angry"]
	const moodColor = ["lime", "blue", "violet", "gray", "orange", "red"]
	const moodIcons = {
		0: <BiHappyBeaming className="text-3xl" />,
		1: <BiHappy className="text-3xl" />,
		2: <BiSleepy className="text-3xl" />,
		3: <BiSad className="text-3xl" />,
		4: <TbMoodNervous className="text-3xl" />,
		5: <BiAngry className="text-3xl" />,
	}
	return (
		<div
			onClick={() => {
				setCurrentMood(mood)
			}}
			className={
				currentMood === mood
					? `flex cursor-pointer flex-col items-center justify-center rounded-none px-3 py-2 text-white ring-1 ring-gray-400 transition-all duration-150 ease-in-out hover:ring dark:text-${moodColor[mood]}-300  bg-${moodColor[mood]}-500`
					: `flex cursor-pointer flex-col items-center justify-center rounded-none px-3 py-2 text-${moodColor[mood]}-500 ring-1 ring-gray-400 transition-all duration-150 ease-in-out  hover:text-white hover:ring dark:text-${moodColor[mood]}-300 dark:hover:text-white hover:bg-${moodColor[mood]}-500`
			}
		>
			{moodIcons[mood]}
			{moodNames[mood]}
		</div>
	)
}

export default Mood
