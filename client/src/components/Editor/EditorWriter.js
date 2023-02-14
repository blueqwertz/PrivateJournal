import React, { useRef, useState } from "react"

const EditorWriter = ({ callback, body }) => {
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
                className={`w-full h-[42px] transition-all duration-200 ${isFocused ? "h-56" : ""} resize-none rounded-none dark:bg-black px-3 py-2 border outline-none dark:text-white mb-3 sm:mb-5 dark:border-gray-400 focus:ring-2 focus:ring-gray-300 dark:focus:ring-white`}
                placeholder="Write something about your day..."
                value={storyValue}
                onInput={(e) => {
                    setStoryValue(e.target.value)
                }}
            ></textarea>
            <div className="w-full flex justify-between">
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
                    className={`mb-5 hover:cursor-pointer bg-red-600 dark:bg-red-800 text-white py-2 px-6 font-semibold focus:ring-2 focus:ring-gray-300 dark:focus:ring-white transition-all duration-200`}
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
                    className={`mb-5 hover:cursor-pointer border dark:border-gray-400 bg-white dark:bg-black text-black dark:text-white py-2 px-6 font-semibold focus:ring-2 focus:ring-gray-300 dark:focus:ring-white transition-all duration-200`}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditorWriter
