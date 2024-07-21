const _ = require('lodash')
const Item = require('../models/item')
const item = {}
item.create = async(req, res) => {
    const body = _.pick(req.body, ['name','amount','category','description', 'date'])
    body.user = req.user.userId
    const item = new Item(body)
    await item.save()
    res.json(item)
    try{
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

item.getUserItems = async(req, res) => {
    try{
        const items = await Item.find({user: req.user.userId})
        res.json(items)
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

item.edit = async(req, res) => {
    const body = _.pick(req.body, ['user','name','amount','category','description'])
    const id = req.params.id
    try{
        const item = await Item.findByIdAndUpdate(id, body, {new: true})
        res.json(item)
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

item.delete = async(req, res) => {
    try{
        await Item.findByIdAndDelete(req.params.id)
        res.json({message: "item deleted successfully"})
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

module.exports = item