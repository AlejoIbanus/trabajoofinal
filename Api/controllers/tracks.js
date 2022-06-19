const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');




const getItems = async (req,res) => {
   try{
    
    const data =  await tracksModel.find({});
    res.send(data)
   } catch(e){
    res.status(401).send({ message:'error en get items'})
   }
}
const getItem = async (req,res) => {
    try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findById(id);
    res.send(data);
    }catch(e){
        res.status(401).send({ message:'error en get item'})
    }
}


const createItems = async (req,res) => {
    try{
    const {body,file} = matchedData(req);
    const dataTrack= {
        body,
        filename : file.filename,
        url: `${URL}/${file.filename}`
    }
    
    const data = await tracksModel.create(dataTrack)
    res.send({data})
    } catch(e){
        res.status(401).send({ message:'error en create items'})
    }
    
}


const updateItems = async (req,res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id,body)
        res.send({data})
        } catch(e){
            res.status(401).send({ message:'error en update items'})
        }
        
}
const deleteItems = async (req,res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({data});
        }catch(e){
            res.status(401).send({ message:'error en delete items'})
        }
}







module.exports = {getItems, createItems, updateItems, deleteItems,getItem};