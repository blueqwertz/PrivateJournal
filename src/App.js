import "./App.css"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Dashboard />} />
                {/* <Route path="/api" element={<Api />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
