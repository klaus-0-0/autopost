import { useEffect, useState } from "react";
import axios from "axios"
import config from "../config";
import twitter from "../assets/twitter.png"
function MyCalendar() {
  const [offset, setOffset] = useState(0);
  const [handleNewPost, sethandleNewPost] = useState(false);
  const [POST, setPost] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // Generate 7 days based on offset
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + offset + i);
    return d;
  });

  const getDayName = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short" });

  const handlePost = async () => {
    console.log("Posting content:", POST);

    if (!POST.trim()) {
      alert("Please enter some content to post");
      return;
    }

    try {
      const res = await axios.post(`${config.apiUrl}/twitter`,
        { content: POST },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        alert(res.data.message || "Post successful ✅");
        sethandleNewPost(false);
        setPost(""); // Clear the input
      } else {
        alert("Error posting ❌ " + res.data.error);
      }
    } catch (err) {
      console.error("Post error:", err);

      // Show specific error message
      if (err.response?.data?.error) {
        alert("Error: " + err.response.data.error);
      } else if (err.response?.status === 500) {
        alert("Server error - check backend console for details");
      } else {
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="flex items-center p-5">
        <h2 className="text-xl font-bold text-neutral-700">Content Calendar</h2>
        <button className="flex ml-auto px-6 py-2 bg-emerald-500 rounded-md cursor-pointer hover:bg-emerald-600 transition-colors" onClick={() => sethandleNewPost(true)}>
          [̲̅+] New Post
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-10 mb-6">
        <button
          className="px-3 py-2 border rounded-md shadow hover:bg-emerald-500"
          onClick={() => setOffset(offset - 7)}
        >
          Previous
        </button>
        <button
          className="px-3 py-2 border rounded-md shadow hover:bg-emerald-500"
          onClick={() => setOffset(offset + 7)}
        >
          Next
        </button>
      </div>

      {handleNewPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl relative">
            {/* Close button */}
            <button
              onClick={() => sethandleNewPost(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <h1 className="text-2xl font-bold text-emerald-700 mb-4">
              Create and Schedule Post
            </h1>

            {/* Content */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Post Content
            </label>
            <textarea
              value={POST}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-4"
              rows="4"
              placeholder="Write your post here..."
              onChange={(e) => setPost(e.target.value)}
            />

            {/* Platform */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Platform
            </label>
            <select className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400" onChange={(e) => setPlatform(e.target.value)}>
              <option value="twitter"><img src={twitter} className="h-5 w-5" />Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>

            {/* Schedule Date */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Schedule Date
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Schedule Time */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Schedule Time
            </label>
            <input
              type="time"
              className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              onChange={(e) => setTime(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => sethandleNewPost(false)}
                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                onClick={() => handlePost()}>
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Calendar Days */}
      <div className="p-10 flex gap-4 flex-wrap justify-center">
        {days.map((day, i) => {
          const isToday =
            day.toDateString() === today.toDateString();
          return (
            <div
              key={i}
              className={`w-45 h-45 flex flex-col items-center justify-center bg-emerald-100 font-semibold rounded-lg shadow-lg hover:shadow-2xl cursor-pointer
              ${isToday ? "border-4 border-black" : ""}`}
            >
              <span className="text-lg">{getDayName(day)}</span>
              <span className="text-2xl">{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyCalendar;
