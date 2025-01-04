import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Edit, Trash2, Check } from "lucide-react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success | error

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    setFilteredTeams(teams);
  }, [teams]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teams`);
      const fetchedTeams = response.data.map(team => ({
        id: team._id,
        teamName: team.team_name,
        challenge1Score: team.challenge_1_score,
        challenge2Score: team.challenge_2_score,
        challenge3Score: team.challenge_3_score,
        totalScore: team.total_score,
      }));
      setTeams(fetchedTeams);
    } catch (error) {
      showSnackbar("Error fetching teams", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredTeams(teams);
      return;
    }

    const filtered = teams.filter(team =>
      team.teamName.toLowerCase().includes(query) ||
      team.id.toString().includes(query) ||
      team.challenge1Score.toString().includes(query) ||
      team.challenge2Score.toString().includes(query) ||
      team.challenge3Score.toString().includes(query) ||
      team.totalScore.toString().includes(query)
    );

    setFilteredTeams(filtered);
  };

  const handleEdit = (team) => {
    setEditingTeam({ ...team });
  };

  const handleSave = async () => {
    try {
      const updatedTeam = {
        team_name: editingTeam.teamName,
        challenge_1_score: editingTeam.challenge1Score,
        challenge_2_score: editingTeam.challenge2Score,
        challenge_3_score: editingTeam.challenge3Score,
        total_score: Number(editingTeam.challenge1Score) + 
                    Number(editingTeam.challenge2Score) + 
                    Number(editingTeam.challenge3Score)
      };

      await axios.put(`${API_BASE_URL}/teams/${editingTeam.id}`, updatedTeam);
      
      const updatedTeams = teams.map(team =>
        team.id === editingTeam.id ? {
          ...editingTeam,
          totalScore: updatedTeam.total_score
        } : team
      );
      
      setTeams(updatedTeams);
      setEditingTeam(null);
      showSnackbar("Team updated successfully!", "success");
    } catch (error) {
      showSnackbar("Error updating team", "error");
    }
  };

  const handleDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/teams/${teamId}`);
      const updatedTeams = teams.filter(team => team.id !== teamId);
      setTeams(updatedTeams);
      showSnackbar("Team deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting team", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={3000} 
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/admin/create-team")}
              className="flex items-center px-6 py-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Team
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredTeams(teams);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm text-gray-300">ID</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Team Name</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Challenge 1</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Challenge 2</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Challenge 3</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Total Score</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {filteredTeams.map((team, index) => (
                <tr key={team.id} className="border-b border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="text"
                        value={editingTeam.teamName}
                        onChange={(e) => setEditingTeam({ ...editingTeam, teamName: e.target.value })}
                        className="w-full px-2 py-1 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      />
                    ) : team.teamName}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge1Score}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge1Score: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      />
                    ) : team.challenge1Score}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge2Score}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge2Score: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      />
                    ) : team.challenge2Score}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge3Score}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge3Score: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      />
                    ) : team.challenge3Score}
                  </td>
                  <td className="px-6 py-4">{team.totalScore}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {editingTeam?.id === team.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-2 hover:bg-green-500/20 rounded-lg"
                          >
                            <Check className="w-5 h-5 text-green-500" />
                          </button>
                          <button
                            onClick={() => setEditingTeam(null)}
                            className="p-2 hover:bg-red-500/20 rounded-lg"
                          >
                            <X className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(team)}
                          className="p-2 hover:bg-blue-500/20 rounded-lg"
                        >
                          <Edit className="w-5 h-5 text-blue-500" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
