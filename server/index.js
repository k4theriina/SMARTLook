import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// makes server that can listen for requests
const app = express();
// allow frontend to call server
app.use(cors());
// accepts json data in requests
app.use(express.json());

// create client object to talk to api
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// decide what ai is allowed to do
const SYSTEM_PROMPT = `
You are an industrial monitoring assistant named Luke.

Your job:
- Analyze machine sensor data
- Respond concisely
- Do not invent values
- If data is insufficient, say so

Tone:
- Professional
- Clear
- Non-alarming unless thresholds are exceeded
`;

// takes user input
// CHANGE THIS incrementally so we can test with more and more data.
function buildUserPrompt(intent, data) {
  return `
    User intent: ${intent}

    Current machine data:
    Pressure: ${data.pressure} PSI
    Temperature: ${data.temperature} °C
    FlowRate: ${data.flowRate} L/min
    `;
}

// make a post API endpoint
app.post("/api/ai-assistant", async (req, res) => {
    try {
        // req.body contains data from frontend.
        const { intent, dashboard } = req.body;

        // if dashboard is missing, return error/
        if (!dashboard) {
            return res.status(400).json({error: "Missing dashboard data"});
        }

        // ai call
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: buildUserPrompt(intent, dashboard) },
            ],
            temperature: 0.3,
            max_tokens: 150,
        });

        //test
        console.log(completion);

        // send ai response back to frontend as JSON:
        res.json({
            reply: completion.choices[0].message.content,
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "AI request failed."});
    }
})

// starts server
app.listen(3000, () => console.log("Server running on port 3000"));
