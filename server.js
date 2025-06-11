const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/openai", async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("IA Board Backend Online");
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
