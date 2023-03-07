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
	return (
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
	)
}

export default App
