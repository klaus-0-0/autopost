import React, { useState } from "react";
import Calendar from "../components/MyCalendar";
import Aiassistant from "./Aiassistant";
import msg from "../assets/comment.png"
import calender from "../assets/paper.png"
import ai from "../assets/artificial-intelligence.png"
import exit from "../assets/exit.png"
import overview from "../assets/research.png"
import setting from "../assets/settings.png"
import { useNavigate } from "react-router-dom";

function Home() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showAi, setShowAi] = useState(false);
    const [overView, setOverview] = useState(true);
    const [activeButton, setActiveButton] = useState("overview"); // Track active button
    const navigate = useNavigate();

    function handleSignout() {
        localStorage.removeItem("user-info");
        navigate("/signup")
    }

    return (
        <div className="min-h-screen bg-emerald-50">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 flex items-center gap-2 font-bold text-gray-700 text-2xl p-6 border-b-2 border-gray-200 bg-emerald-200">
                <img src={ai}
                    className="w-10 h-10" /> AI Social Platform
                <button className="flex items-end text-sm ml-auto cursor-pointer transition-colors" onClick={() => handleSignout()}>
                    <img src={exit}
                        className="w-7 h-7" />Sunny</button>
            </nav>

            {/* Button Navigation */}
            <nav className="sticky top-20 z-50 p-4 bg-emerald-50">
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setOverview(true);
                            setShowAi(false);
                            setShowCalendar(false);
                            setActiveButton("overview");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeButton === "overview"
                            ? "bg-emerald-600 text-white"
                            : "text-black hover:bg-emerald-600"
                            }`}
                    >
                        <img
                            src={overview}
                            alt="Overview"
                            className="w-5 h-5"
                        />
                        Overview
                    </button>
                    <button
                        onClick={() => {
                            setOverview(false);
                            setShowAi(false);
                            setShowCalendar(true);
                            setActiveButton("calendar");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeButton === "calendar"
                            ? "bg-emerald-600 text-white"
                            : "text-black hover:bg-emerald-600"
                            }`}
                    >
                        <img
                            src={calender}
                            alt="Calendar"
                            className="w-5 h-5"
                        />
                        Content Calendar
                    </button>
                    <button
                        onClick={() => {
                            setOverview(false);
                            setShowAi(true);
                            setShowCalendar(false);
                            setActiveButton("ai");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeButton === "ai"
                            ? "bg-emerald-600 text-white"
                            : "text-black hover:bg-emerald-600"
                            }`}
                    >
                        <img
                            src={msg}
                            alt="AI Assistant"
                            className="w-5 h-5"
                        />
                        AI Assistant
                    </button>
                    <button
                        onClick={() => {
                            setOverview(false);
                            setShowAi(false);
                            setShowCalendar(false);
                            setActiveButton("settings");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeButton === "settings"
                            ? "bg-emerald-600 text-white"
                            : "text-black hover:bg-emerald-600"
                            }`}
                    >
                        <img
                            src={setting}
                            alt="Settings"
                            className="w-5 h-5"
                        />
                        Settings
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            {overView && (
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-600 mb-4">
                        Social Media Dashboard
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Manage your social media content efficiently. Open the calendar to view scheduled posts or use the AI assistant to generate content.
                    </p>

                    {/* Dashboard Stats or Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-16">
                            <h3 className="font-semibold">Scheduled Posts</h3>
                            <p className="text-2xl">0</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-16">
                            <h3 className="font-semibold">Connected Accounts</h3>
                            <p className="text-2xl">0</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-16">
                            <h3 className="font-semibold">This Week</h3>
                            <p className="text-2xl">0 posts</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Calendar Modal */}
            {showCalendar && (
                <div className="p-5">
                    <Calendar />
                </div>
            )}

            {/* AI Assistant Modal */}
            {showAi && (
                <div className="bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
                        <div className="flex items-center p-4 border-b">
                            <h2 className="text-xl font-bold">AI Content Assistant</h2>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <Aiassistant />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;