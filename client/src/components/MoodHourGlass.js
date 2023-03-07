import React, { useState } from "react"
import { TbHourglassHigh } from "react-icons/tb"

function MoodHourGlass() {
	const [timeRemaining, setTimeRemaining] = useState(0)

	return (
		<>
			{timeRemaining > 0 ? (
				<div className="text-md flex select-none items-center justify-center font-light text-gray-500">
					<TbHourglassHigh />
					<span>01:00</span>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default MoodHourGlass
