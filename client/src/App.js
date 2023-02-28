import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import { AuthProvider } from "./context/AuthProvider"
import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"
import Logout from "./components/Logout/Logout"
import RouteDefault from "./components/RouteDefault"
import Editor from "./components/Editor/Editor"
import Delete from "./components/Delete/Delete"
import MoodDashboard from "./components/Mood/Mood"

function App() {
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

	return (
		<React.StrictMode>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="" element={<RouteDefault />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/delete" element={<Delete />} />
							<Route element={<PersistLogin />}>
								<Route element={<RequireAuth />}>
									<Route path="/home" element={<Dashboard />} />
									<Route path="/mood" element={<MoodDashboard />} />
									<Route path="/story/:id" element={<Editor />} />
								</Route>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</React.StrictMode>
	)
}

export default App
