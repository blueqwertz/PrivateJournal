import "./App.css"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"

function App() {
    try {
        const { refreshToken, accessToken } = localStorage
        console.log(refreshToken, accessToken)
        const xhr = new XMLHttpRequest()
        xhr.open("GET", "http://localhost:3001/check-token")
        xhr.setRequestHeader("x-access-token", accessToken)
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
            } else {
                console.error(xhr.responseText)
            }
        }
        xhr.send()
    } catch {}
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Dashboard name="Tim" />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
