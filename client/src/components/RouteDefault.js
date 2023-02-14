import { useLocation, Navigate } from "react-router-dom"

const RouteDefault = () => {
    const location = useLocation()

    return <Navigate to="/home" state={{ from: location }} replace />
}

export default RouteDefault
