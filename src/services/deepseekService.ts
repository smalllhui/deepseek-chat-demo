import { OpenAI } from "openai"
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export const createCompletion = async (message: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a knowledgeable health coach." },
        { role: "user", content: message },
      ],
      model: `${process.env.DEEPSEEK_MODEL}`,
    })

    return completion.choices[0].message.content
  } catch (error: any) {
    throw new Error("Completion failed: " + error.message)
  }
}

export const createStreamingCompletion = async (message: string) => {
  try {
    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a knowledgeable health coach." },
        { role: "user", content: message },
      ],
      model: "deepseek-chat",
      stream: true,
    })

    return stream
  } catch (error: any) {
    throw new Error("Completion failed: " + error.message)
  }
}
