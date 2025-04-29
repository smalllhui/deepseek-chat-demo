require("module-alias/register") //注册别名
import dotenv from "dotenv" // 环境变量
import app from "@/app"
dotenv.config() // 能够加载环境变量

const SERVER_PORT = process.env.SERVER_PORT || 3000

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on ${SERVER_PORT}`)
  console.log(`please open http://127.0.0.1:${SERVER_PORT}`)
})
