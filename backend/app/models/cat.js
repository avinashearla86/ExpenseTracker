const {Schema, model} = require('mongoose')

const catSchema = new Schema({
    name: String,
    user: Schema.Types.ObjectId
})

const Category = model('Category',catSchema)

module.exports = Category