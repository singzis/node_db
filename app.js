const uri = require('./.credential.json').mongo.connectionString

const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000

const app = express()

app.use(express.json())

mongoose.connect(uri)

const userSchema = new mongoose.Schema({
  // 定义一个用户列表
  account: String,
  phone: String,
  password: String,
})

const User = mongoose.model('User', userSchema, 'user')

app.get('/api/user', async (req, res) => {
  try {
    const user = await User.find()
    res.json({ data: user, status: res.statusCode })
  } catch (e) {
    res.status(500).json({ error: 'error' })
  }
})

app.get('/api/a', (req, res) => {
  res.send('111')
})

app.post('/api/insertUser', async (req, res) => {
  try {
    const { account, phone, password } = req.body
    const user = new User({ account, phone, password })
    await user.save()

    res.status(200).json({ data: user, status: res.statusCode })
  } catch (e) {
    res.status(500).json({ error: 'error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
