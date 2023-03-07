import React from "react"
import { useState, useEffect } from "react"
import axios from "../../api/axios"
import { Navigate } from "react-router-dom"
import Loading from "../Loading"

const Logout = () => {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const logoutUser = async () => {
			localStorage.removeItem("encryptionKey")
			await axios.post("/logout", { withCredentials: true })
			setIsLoading(false)
		}
		logoutUser()
	}, [])
	return isLoading ? <Loading /> : <Navigate to="/login" />
}

export default Logout
