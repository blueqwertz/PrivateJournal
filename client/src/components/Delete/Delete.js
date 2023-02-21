import React from "react"
import { useState, useEffect } from "react"
import axios from "../../api/axios"
import { Navigate } from "react-router-dom"
import Loading from "../Loading"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Delete = () => {
	const [isLoading, setIsLoading] = useState(true)
	const axiosPrivate = useAxiosPrivate()
	useEffect(() => {
		const logoutUser = async () => {
			localStorage.removeItem("encryptionKey")
			await axiosPrivate.get("/delete")
			setIsLoading(false)
		}
		logoutUser()
	}, [])
	return isLoading ? <Loading /> : <Navigate to="/login" />
}

export default Delete
