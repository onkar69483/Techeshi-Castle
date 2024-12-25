import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-game-dark text-white font-space">
                <Navbar />
                <Analytics />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
