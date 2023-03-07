import React from "react"
import UseAnimations from "react-useanimations"
import infinity from "react-useanimations/lib/infinity"

const Loading = () => {
	return (
		<div className="flex h-screen items-center justify-center dark:bg-background dark:text-white">
			<UseAnimations animation={infinity} />
		</div>
	)
}

export default Loading
