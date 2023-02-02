import React from "react"
import SideBar from "./Sidebar"

export default function Dashboard() {
    return (
        <main>
            <div className="bg-gray-100 dark:bg-black flex flex-col min-h-screen">
                <SideBar />
                <div className="p-4 mt-10">
                    <h1 className="dark:text-white text-4xl"></h1>
                </div>
            </div>
        </main>
    )
}
