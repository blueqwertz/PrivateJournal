import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import { AuthProvider } from "./context/AuthProvider"
import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"

function App() {
    return (
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route element={<RequireAuth />}>
                                <Route path="/home" element={<Dashboard />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
    )
}

export default App
