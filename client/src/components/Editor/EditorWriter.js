import React, { useRef, useState } from "react"

const EditorWriter = ({ callback, calldelete, body }) => {
	const [isFocused, setFocused] = useState(true)
	const [storyValue, setStoryValue] = useState(body)
	const userInput = useRef()
	return (
		<div className="sticky top-2 z-10">
			<textarea
				ref={userInput}
				onFocus={() => {
					setFocused(true)
				}}
				className={`h-[42px] w-full transition-all duration-200 ${isFocused ? "h-56" : ""} mb-3 resize-none rounded-none border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-400  dark:text-white dark:focus:ring-white sm:mb-5`}
				placeholder="Write something about your day..."
				value={storyValue}
				onInput={(e) => {
					setStoryValue(e.target.value)
				}}
			></textarea>
			<div className="flex w-full justify-between">
				<button
					onClick={(e) => {
						if (userInput.current.value.length === 0) {
							return
						}
						calldelete()
						userInput.current.value = ""
						setFocused(false)
					}}
					type="submit"
					className={`mb-5 rounded-none bg-red-600 py-2 px-6 font-semibold text-white transition-all duration-200 hover:cursor-pointer focus:ring-2 focus:ring-gray-300 dark:bg-red-800 dark:focus:ring-white`}
				>
					Delete
				</button>
				<button
					onClick={(e) => {
						if (userInput.current.value.length === 0) {
							return
						}
						callback(userInput.current.value)
						userInput.current.value = ""
						setFocused(false)
					}}
					type="submit"
					className={`mb-5 rounded-none border bg-white bg-transparent py-2 px-6 font-semibold text-black transition-all duration-200 hover:cursor-pointer focus:ring-2 focus:ring-gray-300 dark:border-gray-400 dark:bg-gray-800 dark:text-white dark:focus:ring-white`}
				>
					Save
				</button>
			</div>
		</div>
	)
}

export default EditorWriter
