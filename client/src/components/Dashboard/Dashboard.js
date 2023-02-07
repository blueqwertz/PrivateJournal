import React from "react"
import SideBar from "./Sidebar"
import Diary from "./Diary"
import Writer from "./Writer"

export default function Dashboard({ name }) {
    function randomGreetingByName(name) {
        let today = new Date()
        let currentHour = today.getHours()

        let morningGreetings = [`Good morning, ${name}!`, `Rise and shine, ${name}!`, `Start fresh, ${name}!`]

        let afternoonGreetings = [`Good afternoon, ${name}!`, `Stay productive, ${name}!`, `Hi, ${name}!`]

        let eveningGreetings = [`Good evening, ${name}!`, `Relax, ${name}!`, `Hi, ${name}!`]

        if (currentHour < 12) {
            return morningGreetings[Math.floor(Math.random() * morningGreetings.length)]
        } else if (currentHour < 17) {
            return afternoonGreetings[Math.floor(Math.random() * afternoonGreetings.length)]
        } else {
            return eveningGreetings[Math.floor(Math.random() * eveningGreetings.length)]
        }
    }

    function handleStorySumit(value) {
        console.log(value)
    }

    let greeting = randomGreetingByName(name)

    return (
        <main className="bg-gray-50 dark:bg-black flex flex-col min-w-[310px]">
            <div className="flex flex-col min-h-screen max-w-3xl min-w-full sm:min-w-[70%] lg:w-[800px] lg:min-w-0 self-center px-6 pt-5">
                <SideBar />
                <div className="py-4 mt-5">
                    <h1 className="dark:text-white text-4xl">{greeting}</h1>
                </div>
                <span className="dark:text-white text-xl mb-3 font-semibold">Todays Story</span>
                <Writer callback={handleStorySumit} />
                <span className="dark:text-white text-xl mb-3">Previous Stories</span>
                <div className="flex flex-wrap align gap-6 pb-10">
                    <Diary />
                    <div className="w-40 p-3 flex-auto"></div>
                </div>
            </div>
        </main>
    )
}
