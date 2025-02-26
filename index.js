import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON

const users = [];

app.post("/api/register", (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Register new user
    const newUser = { username, email };
    users.push(newUser);
    
    res.status(201).json({ message: "User registered", user: newUser });
});

export default app;
