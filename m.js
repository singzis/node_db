// 引入所需模块
const express = require('express')
const cors = require('cors')

// 创建 Express 应用
const app = express()

// 使用 CORS 中间件
app.use(cors())

app.use(express.json())

const mongoose = require('mongoose')

// 定义 models schema
const modelsSchema = new mongoose.Schema({
  // 根据您的实际数据结构定义字段
  name: String,
  id: Number,
  category: String,
})

// 创建 Models model
const Models = mongoose.model('Models', modelsSchema, 'models') // 注意这里的第三个参数，它指定了集合名称为 'models'

// 定义 longListSchema
const longListSchema = new mongoose.Schema({
  name: String,
  id: Number,
  category: String,
})

// 创建 LongList model
const LongList = mongoose.model('LongList', longListSchema, 'longList') // 注意这里的第三个参数，它指定了集合名称为 'longList'

// 添加接口，一次性获取LongList的所有数据
app.get('/api/longList', async (req, res) => {
  try {
    const longListData = await LongList.find()
    res.json({ data: longListData, status: res.statusCode })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// 添加分页接口，每次获取100条数据，分页从1开始
app.get('/api/longList/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10) || 1
    const limit = 100
    const skip = (page - 1) * limit

    const longListData = await LongList.find().skip(skip).limit(limit)
    res.json({ data: longListData, status: res.statusCode })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 创建 API 路由
app.get('/api/models', async (req, res) => {
  try {
    const models = await Models.find()
    res.json({ data: models, status: res.statusCode })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 新增一个插入数据的接口，需要判断name是否重复，重复的话返回一个状态，状态你定
app.post('/api/models', async (req, res) => {
  try {
    const { name, id, category } = req.body

    // 检查是否存在具有相同 name 的数据
    const existingData = await Models.findOne({ name })

    // 如果找到现有数据，则返回状态
    if (existingData) {
      return res.status(409).json({ error: 'Name already exists' })
    }

    // 保存新数据
    const model = new Models({ name, id, category })
    await model.save()

    res.status(201).json({ data: model, status: res.statusCode })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 修改 startServer 函数，使其在启动服务器之前插入初始数据
async function startServer() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/node_db')
    console.log('Connected to database')

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to connect to database:', err)
  }
}

startServer()
