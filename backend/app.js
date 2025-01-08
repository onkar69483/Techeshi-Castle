const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const teamRoutes = require("./routes/teamRoutes");
const gameRoutes = require("./routes/questionRoutes");
const circuitRoutes = require("./routes/circuitRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/teams", teamRoutes);
app.use("/game", gameRoutes);
app.use("/circuit", circuitRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
