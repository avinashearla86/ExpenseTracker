const {Schema, model} = require('mongoose')
const Category = require('./cat')

const itemSchema = new Schema({
    name: String,
    date: String,
    amount: Number,
    category: Schema.Types.ObjectId,
    description: String,
    user: Schema.Types.ObjectId
})
 

const Item = model('Item', itemSchema)

module.exports = Item