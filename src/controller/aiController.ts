import { Request, Response, NextFunction } from "express"
import { createCompletion, createStreamingCompletion } from "@/services/deepseekService"

export const chatWithDeepseek = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body
    if (!message) {
      return res.status(400).json({
        status: false,
        message: "Message is required",
      })
    }
    console.log("正在向deepseek发送请求中。。。。。。")
    const response = await createCompletion(message)
    console.log("------用户请求已完成-----")
    return res.status(200).json({
      status: true,
      data: response,
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "请求失败",
      data: JSON.stringify(error),
    })
  }
}

export const chatWithStreamDeepseek = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body
    if (!message) {
      return res.status(400).json({
        status: false,
        message: "Message is required",
      })
    }
    console.log("正在向deepseek发送请求中。。。。。。")
    const stream = await createStreamingCompletion(message)
    // 设置响应为流
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ""
      res.write(`data: ${JSON.stringify({ content })}\n\n`)
    }
    res.write(`data: [DONE]`) // 完成
    res.end()
    console.log("------用户请求已完成-----")
  } catch (error) {
    console.log("chatWithDeepseek----出错了", error)
    next(error)
  }
}
