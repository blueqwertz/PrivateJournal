import React, { useRef, useState } from "react"

const Writer = ({ callback }) => {
	const [isFocused, setFocused] = useState()
	const userInput = useRef()

	return (
		<div className="z-10">
			<textarea
				ref={userInput}
				onFocus={() => {
					setFocused(true)
				}}
				className={`h-[42px] w-full transition-all duration-200 ${isFocused ? "h-56" : ""} mb-3 resize-none rounded-none border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-400 dark:bg-black dark:text-white dark:focus:ring-white sm:mb-5`}
				placeholder="Write something about your day..."
			></textarea>
			<div className="flex w-full justify-end">
				<button
					onClick={(e) => {
						if (userInput.current.value.length == 0) {
							return
						}
						callback(userInput.current.value)
						userInput.current.value = ""
						setFocused(false)
					}}
					type="submit"
					className={`mb-5 border bg-white py-2 px-6 font-semibold text-black transition-all duration-200 hover:cursor-pointer focus:ring-2 focus:ring-gray-300 dark:border-gray-400 dark:bg-black dark:text-white dark:focus:ring-white`}
				>
					Submit
				</button>
			</div>
		</div>
	)
}

export default Writer
