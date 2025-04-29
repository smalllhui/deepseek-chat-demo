import express, { Application } from "express"
import bodyParser from "body-parser" // 表单解析
import cors from "cors" // 跨域
import appRouter from "@/routes"

const app: Application = express() // app实列

app.use(express.static("public")) // 设置静态目录

app.use(cors()) // 解决跨域
// 配置表单解析
app.use(bodyParser.urlencoded({ extended: false })) // 1、解析 post 表单数据的中间件
app.use(bodyParser.json()) // 2、解析 application/json

app.use("/api", appRouter)

export default app
