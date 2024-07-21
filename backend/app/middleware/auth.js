const _ = require('lodash')
const jwt = require('jsonwebtoken')

const authUser = async(req, res, next) => {
    let token = req.headers["authorization"]
    if(!token){
        return res.status(401).json({errors: "authentication failed"})
    }
    try{
        token = token.split(' ')[1]
        const tokenData = await jwt.verify(token, process.env.SECRET)
        req.user = _.pick(tokenData,['userId', 'username'])
        next()
    }
    catch(e){
        res.status(401).json({errors: 'authentication failed'})
    }
} 

module.exports = authUser