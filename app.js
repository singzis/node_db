const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/node_db')

const User = new mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    age: Number,
  })
)

const createUser = ({ name, age }) =>
  new User({ name, age }).save().then(() => `${name}创建成功，今年${age}岁`)

app.get('/', async (req, res) => {
  const { name } = req.query
  const query = await User.find(name ? { name } : {})
  res.send(query)
})

app.post('/', (req, res) => {
  const { name, age } = req.body
  if (!name) {
    res.send('请输入name')
  }
  if (!age) {
    res.send('请输入age')
  }
  createUser({ name, age })
    .then(r => res.send(r))
    .catch(err => console.log('发生错误'))
})

app.put('/', async (req, res) => {
  const { name, newOp } = req.body
  if (!name) {
    res.send('需要name')
  }
  await User.where({ name }).update(newOp)
  res.send(`${name}完成更新，更新后为${newOp.name || name}`)
})

app.delete('/', async (req, res) => {
  const { name } = req.body
  const r = await User.deleteOne({ name })
  res.send(r.deletedCount ? `成功删除${name}` : `删除失败`)
})

app.listen(3000, () => console.log('node---启动'))
