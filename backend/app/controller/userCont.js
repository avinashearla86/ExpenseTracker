const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const user = {}
user.create = async(req, res) => {
    const body = _.pick(req.body, ['username', 'email', 'password'])
    try{
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        res.json({msg: "account created successfully"})
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

user.login = async(req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    try{
        const user = await User.findOne({email: body.email})
        if(!user){
            return res.status(404).json({msg: 'invalid email or password' })
        }else if(!await bcrypt.compare(body.password, user.password)){
            return res.status(404).json({msg: 'invalid email or password' })
        }else{
            const tokenData = {userId: user._id, username: user.username}
            const token = jwt.sign(tokenData, process.env.SECRET)
            res.json({token: `bearer ${token}`,message: `${user.username} login successful`})
        }
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

user.get = async(req, res) => {
    const id = req.user.userId
    try{
        const user = await User.findById(id)
        res.json(user)
    }catch(e){
        res.status(500).json({errors: 'something went wrong'})
    }
}

module.exports = user