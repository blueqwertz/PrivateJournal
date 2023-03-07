import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))

const toggleDarkMode = async () => {
	if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
		document.body.classList.add("dark")
		document.body.classList.remove("light")
	} else if (localStorage.theme === "light") {
		document.body.classList.remove("dark")
		document.body.classList.add("light")
	} else if (localStorage.theme === "auto") {
		document.body.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
		document.body.classList.remove(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark")
	} else {
		document.body.classList.add("dark")
	}
}

const run = async () => {
	await toggleDarkMode()
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
}

run()
reportWebVitals()
