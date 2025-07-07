const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (req, res) => {
  res.send('☕ Workpresso AI backend is running with OpenAI!');
});

app.post('/api/task-metadata', async (req, res) => {
  console.log('[BACKEND] HIT /api/task-metadata');
  console.log('[BODY]', req.body);

  const { task } = req.body;

  if (!task || typeof task !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid task text' });
  }

  try {
    const prompt = `
You are a smart productivity assistant in a cozy coffee-themed Pomodoro app.
Given the task: "${task}", respond ONLY with a valid JSON object containing:
1. estimatedBrewTime (either 15, 25, or 45)
2. isPriority (true or false)

Respond only with JSON. No explanation. Example:
{ "estimatedBrewTime": 25, "isPriority": false }
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a task optimizer for a Pomodoro productivity app.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
    });

    const content = response.choices[0]?.message?.content;
    console.log('[OPENAI RAW RESPONSE]', content);

    const parsed = JSON.parse(content);

    return res.json(parsed);
  } catch (err) {
    console.error('[OPENAI ERROR]', err.message || err);
    return res.status(500).json({ error: 'OpenAI call failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
