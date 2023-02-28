import React from "react"
import { LineChart, Line, XAxis, Label, ResponsiveContainer, Tooltip } from "recharts"

function MoodDiary({ history }) {
	const moodNames = ["Happy", "Relaxed", "Tired", "Sad", "Nervous", "Angry"]
	return (
		<div>
			<ResponsiveContainer width={"100%"} height={350}>
				<LineChart
					data={history.map((history) => {
						const historyTemp = {
							date: history.date.split(".").slice(0, -1).join("."),
							mood: 5 - history.mood,
							pv: 5,
							amt: 5,
						}
						return historyTemp
					})}
					margin={{
						top: 10,
						right: 30,
						left: 20,
						bottom: 30,
					}}
				>
					<Tooltip
						formatter={(value, name) => {
							return moodNames[5 - value]
						}}
					/>
					<Line type="monotone" dataKey="mood" stroke="#4DA6FF" strokeWidth={3} isAnimationActive={false} />
					<XAxis stroke="#5E6572" dataKey="date">
						<Label value="Date" position="bottom" />
					</XAxis>
					{/* <YAxis>
						<Label value="Mood" angle={-90} />
					</YAxis> */}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default MoodDiary
