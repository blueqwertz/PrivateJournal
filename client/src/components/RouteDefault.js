import { useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RouteDefault = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return auth?.accessToken ? <Navigate to="/home" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default RouteDefault
