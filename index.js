const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai"); // ✅ updated import

const app = express();
app.use(cors());
app.use(express.json());

// ✅ create OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
