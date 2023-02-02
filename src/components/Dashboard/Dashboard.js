import React from "react"
import SideBar from "./Sidebar"

export default function Dashboard() {
    return (
        <main className="bg-gray-100 dark:bg-black flex flex-col">
            <div className="flex flex-col min-h-screen max-w-3xl min-w-[70%] self-center">
                <SideBar />
                <div className="p-4 mt-10">
                    <h1 className="dark:text-white text-4xl"></h1>
                </div>
            </div>
        </main>
    )
}
