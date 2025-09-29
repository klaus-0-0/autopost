import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import MyCalendar from "./components/MyCalendar"
import Aiassistant from "./pages/Aiassistant"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Aiassistant />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calander" element={<MyCalendar />} />
      </Routes>
    </Router>
  )
}

export default App
