const Category = require("../models/cat")

const cat = {}
cat.create = async(req, res) => {
    const body = req.body
    try{
        body.user = req.user.userId
        const cat = new Category(body)
        await cat.save()
        res.json(cat)
    }catch(e){
        res.status(500).json('something went wrong')
    }
}

cat.read = async(req, res) => {
    console.log(req.user)
    try{
        const cat = await Category.find({default: true})
        const customCat = await Category.find({user: req.user.userId})
        if(customCat){
            return res.json([...cat, ...customCat])
        }
        res.json(cat)
    }catch(e){
        res.status(500).json('something went wrong')
    }
}

cat.delete = async(req, res) => {
    try{
        await Category.findOneAndDelete({user: req.user.userId, _id: req.params.id})
        res.json({msg: 'category deleted successfully'})
    }catch(e){
        res.status(500).json('something went wrong')
    }
}

module.exports = cat