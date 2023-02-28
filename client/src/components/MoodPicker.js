import React, { useState } from "react"
import Mood from "./Mood"

function MoodPicker({ callback }) {
	const [currentMood, setCurrentMood] = useState(undefined)
	return (
		<>
			<div className="mb-3 grid grid-cols-3 gap-3 dark:text-text sm:mb-5 md:grid-cols-6">
				<Mood mood={0} key={0} currentMood={currentMood} setCurrentMood={setCurrentMood} />
				<Mood mood={1} key={1} currentMood={currentMood} setCurrentMood={setCurrentMood} />
				<Mood mood={2} key={2} currentMood={currentMood} setCurrentMood={setCurrentMood} />
				<Mood mood={3} key={3} currentMood={currentMood} setCurrentMood={setCurrentMood} />
				<Mood mood={4} key={4} currentMood={currentMood} setCurrentMood={setCurrentMood} />
				<Mood mood={5} key={5} currentMood={currentMood} setCurrentMood={setCurrentMood} />
			</div>
			<div className="flex w-full justify-end">
				<button
					onClick={() => {
						if (currentMood) {
							callback(currentMood)
						}
						setCurrentMood(undefined)
					}}
					className={`mb-5 rounded-none border  bg-transparent py-2 px-6 font-semibold text-black transition-all duration-200 hover:cursor-pointer focus:ring-2 focus:ring-gray-300 dark:border-gray-400 dark:text-white dark:focus:ring-white`}
				>
					Save
				</button>
			</div>
		</>
	)
}

export default MoodPicker
