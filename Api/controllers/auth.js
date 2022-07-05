const {matchedData} = require('express-validator')
const {encrypt, compare} = require('../utils/handlePassword')
const {tokenSign, verifyToken}= require('../utils/handleJwt')
const {usersModel}= require('../models/index')
const {transporter} = require('../config/nodemailer')
const public_url = 'http://localhost:3000';


const registerController = async (req,res)=>{
    try{
    req = matchedData(req);
    const password = await encrypt(req.password)
    const body = {...req, password}
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined,{strict:false})
    
    const data = {
        token: await tokenSign(dataUser, '2h'),
        user:dataUser

    }
    
    res.send(data)

    } catch(e){
        res.status(401).send({ message:'Ese email esta en uso'})
    }

}

const loginController = async (req,res) =>{
try{
    req = matchedData(req);
    const user = await usersModel.findOne({email:req.email}).select('password name role email');
    if(!user){
        res.status(401).send({ message:'No se encontro el usuario'})
        return
    }
    const hashPassword = user.get('password');
    const check = await compare(req.password,hashPassword)

    if(!check){
        res.status(401).send({ message:'clave incorrecta'})
        return
    }
    user.set('password', undefined, {strict:false})
    const data = {
        token: await tokenSign(user,"2h"),
        user
    }
    res.send(data)



}

catch(e){
    res.status(401).send({ message:'error logueando al user'})
}
}

const RecoveryControllerEmail = async (req,res) => {
    try{
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email}).select('email');
        if(!user){
            res.status(404).send({ message:'No se encontro el mail'})
            return
        }
        const token = await tokenSign(user,"10m")
        const link = `${public_url}/reset/${token}`

        await transporter.sendMail({
            from: '"Recuperacion de clave" <ibanusale@gmail.com>',
            to: user.email,
            subject:'Recuperacion de clave',
            html: `
                <h3> Porfavor dar click en el siguiente enlace para recuperar su clave</h3> 
                <a href = "${link}">Click aca</a>
            `
        })

    }catch(e){
        res.status(401).send({ message:'eror'})
    }
}


const savedNewPass = async (req,res) => {
    try{
        const {token} = req.params;
         const user = await verifyToken(token);
        const password = await encrypt(req.body.password);
        const newUser = await usersModel.findOneAndUpdate({"_id":user._id},{"password":password});
        res.send()

    }catch(e){
        res.status(401).send({ message:'error guardando la clave nueva'})
    }
}

const resetController = async (req,res) => {
    try{
        const {token} = req.params;
        const user = await verifyToken(token);
        const newUser = await usersModel.find({"_id":user._id}).select('email name');
        res.send(newUser)
    }catch(e){
        res.status(401).send({ message:'error en reset '})
    }
}



module.exports = {registerController, loginController, RecoveryControllerEmail, savedNewPass, resetController};