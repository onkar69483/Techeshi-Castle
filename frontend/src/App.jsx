import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { Analytics } from "@vercel/analytics/react";
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import CreateTeam from './pages/CreateTeam';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-game-dark text-white font-space">
                <Navbar />
                <Analytics />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/create-team" element={
                        <ProtectedRoute>
                            <CreateTeam />
                        </ProtectedRoute>
                    } />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
