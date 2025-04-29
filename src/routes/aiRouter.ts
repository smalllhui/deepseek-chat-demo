import express from "express"
import { chatWithDeepseek, chatWithStreamDeepseek } from "@/controller/aiController"

const aiRouter = express.Router()

aiRouter.post("/chat-deepseek", chatWithDeepseek)
aiRouter.post("/chat-stream-deepseek", chatWithStreamDeepseek)

export default aiRouter
