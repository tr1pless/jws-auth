const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  idItem: { type: String, required: true },
  deadline: { type: String, required: false },
  expired: { type: Boolean, required: false },
  notice3h: { type: Boolean, required: false },
  notice24h: { type: Boolean, required: false },
})

module.exports = model('Todo', TodoSchema)
