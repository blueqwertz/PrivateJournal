import "./App.css"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
    return (
        <div className="wrapper">
            <Login />
        </div>
    )
}

export default App
