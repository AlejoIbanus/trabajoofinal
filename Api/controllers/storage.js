
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');



const getItem = async (req,res) => {
    try{
        const {id}= matchedData(req)
        const data =  await storageModel.findById(id);
        res.send(data)
      }catch(e){
        res.status(401).send({ message:'error en get item'})
      }
}









module.exports = {getItem};