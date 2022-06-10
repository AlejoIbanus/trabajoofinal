
const {verifyToken} = require('../utils/handleJwt');
const {usersModel} = require('../models/index')


const authMiddleware = async (req,res,next) => {
    try{
        if(!req.headers.authorization){
            res.status(401).send({ message:'No hay token'})
            return
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        if(!dataToken._id){
            res.status(401).send({ message:'No hay id token'})
            return
        }

        const user = await usersModel.findById(dataToken._id);
        req.user = user;
        next()
    } catch(e){
        res.status(401).send({ message:'No hay sesion'})
    }
}


module.exports = authMiddleware;