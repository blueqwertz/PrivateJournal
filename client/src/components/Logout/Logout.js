import { useRef, useState, useEffect } from "react"
import axios from "../../api/axios"
import useAuth from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import Loading from "../Loading"

const Logout = () => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get("/logout", { withCredentials: true })
        setIsLoading(false)
    }, [])
    return isLoading ? <Loading /> : <Navigate to="/login" />
}

export default Logout
