import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Edit, Trash2, Check } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    setFilteredTeams(teams);
  }, [teams]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredTeams(teams);
      return;
    }
    
    const filtered = teams.filter(team => 
      team.name.toLowerCase().includes(query) ||
      team.id.toString().includes(query) ||
      team.totalPoints.toString().includes(query) ||
      (team.completionTime && team.completionTime.toLowerCase().includes(query)) ||
      (team.challenge1 && team.challenge1.toString().includes(query)) ||
      (team.challenge2 && team.challenge2.toString().includes(query)) ||
      (team.challenge3 && team.challenge3.toString().includes(query))
    );
    
    setFilteredTeams(filtered);
  };

  const handleEdit = (team) => {
    setEditingTeam({ ...team });
  };

  const handleSave = () => {
    const updatedTeams = teams.map(team => 
      team.id === editingTeam.id ? {
        ...editingTeam,
        totalPoints: Number(editingTeam.challenge1) + Number(editingTeam.challenge2) + Number(editingTeam.challenge3)
      } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setEditingTeam(null);
  };

  const handleCancel = () => {
    setEditingTeam(null);
  };

  const handleDelete = (teamId) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-game-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-gaming bg-gradient-to-r from-game-purple to-game-pink text-transparent bg-clip-text">
            Admin Dashboard
        </h1>
        <div className="flex gap-4">
            <button
            onClick={() => navigate('/admin/create-team')}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-game-purple to-game-pink rounded-lg font-gaming text-white hover:opacity-90 transition-opacity"
            >
            <Plus className="w-5 h-5 mr-2" />
            Create Team
            </button>
            <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 bg-red-500/20 text-red-500 rounded-lg font-gaming hover:bg-red-500/30 transition-colors"
            >
            Logout
            </button>
        </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-game-purple/60" />
          <input
            type="text"
            placeholder="Search teams by name, ID, points, or time..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 bg-game-card rounded-lg border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilteredTeams(teams);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-game-purple/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-game-purple/60" />
            </button>
          )}
        </div>

        <div className="bg-game-card rounded-lg border border-game-purple/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-game-purple/20">
                <th className="px-6 py-4 text-left font-gaming text-sm">ID</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Team Name</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Challenge 1</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Challenge 2</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Challenge 3</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Total Points</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Time</th>
                <th className="px-6 py-4 text-left font-gaming text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id} className="border-b border-game-purple/10">
                  <td className="px-6 py-4">{team.id}</td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="text"
                        value={editingTeam.name}
                        onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                        className="w-full px-2 py-1 bg-game-dark rounded border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                      />
                    ) : team.name}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge1}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge1: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-game-dark rounded border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                      />
                    ) : team.challenge1}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge2}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge2: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-game-dark rounded border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                      />
                    ) : team.challenge2}
                  </td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="number"
                        value={editingTeam.challenge3}
                        onChange={(e) => setEditingTeam({ ...editingTeam, challenge3: Number(e.target.value) })}
                        className="w-20 px-2 py-1 bg-game-dark rounded border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                      />
                    ) : team.challenge3}
                  </td>
                  <td className="px-6 py-4">{team.totalPoints}</td>
                  <td className="px-6 py-4">
                    {editingTeam?.id === team.id ? (
                      <input
                        type="text"
                        value={editingTeam.completionTime}
                        onChange={(e) => setEditingTeam({ ...editingTeam, completionTime: e.target.value })}
                        className="w-24 px-2 py-1 bg-game-dark rounded border border-game-purple/20 focus:border-game-pink/50 focus:outline-none text-white"
                      />
                    ) : team.completionTime}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {editingTeam?.id === team.id ? (
                        <>
                          <button 
                            onClick={handleSave}
                            className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                          >
                            <Check className="w-5 h-5 text-green-500" />
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEdit(team)}
                          className="p-2 hover:bg-game-purple/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-game-purple" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(team.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
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