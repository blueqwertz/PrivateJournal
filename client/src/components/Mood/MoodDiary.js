import React from "react"
import { LineChart, Line, XAxis, Label, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts"

function MoodDiary({ history }) {
	const moodNames = ["Happy", "Relaxed", "Tired", "Nervous", "Sad", "Angry"]
	const moodColor = ["#84cc15", "#3779e4", "#8b5cf6", "#f97315", "#6b7280", "#ea4243"]
	return (
		<ResponsiveContainer width={"100%"} height={350}>
			<LineChart
				data={history.map((history) => {
					const historyTemp = {
						date: new Date(history.date).toLocaleDateString("de-de", { day: "2-digit", month: "2-digit" }).replace(/\//g, "."),
						longDate: new Date(history.date).toLocaleDateString("de-de", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "."),
						mood: 6.5 - history.mood,
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
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
						{history.map((mood, index) => {
							return <stop offset={`${(index / (history.length - 1)) * 100}%`} stopColor={moodColor[mood.mood]} />
						})}
					</linearGradient>
				</defs>
				<Tooltip
					formatter={(value) => {
						return moodNames[6.5 - value]
					}}
				/>
				<Line type="monotone" dataKey="mood" stroke="url(#gradient)" strokeWidth={3} isAnimationActive={false} dot={false} />
				<XAxis stroke="#5E6572" dataKey="date">
					<Label value="Date" position="bottom" />
				</XAxis>
				{/* <YAxis>
						<Label value="Mood" angle={-90} />
					</YAxis> */}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default MoodDiary
