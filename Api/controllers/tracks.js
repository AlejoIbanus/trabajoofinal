const { matchedData } = require('express-validator');
const {tracksModel, storageModel} = require('../models');
const URL = 'http://localhost:3001'


const getItems = async (req,res) => {
   try{
    if(req.body.buscadorTrack){
        const data =  await tracksModel.findOneData({name:{$regex:req.query.buscador}});
        res.send(data)
    }else{
        const data2 =  await tracksModel.findAllData({});
        res.send(data2)
    }
    
   } catch(e){
    res.status(401).send({ message:'error en get items'})
   }
}
const getItem = async (req,res) => {
    try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findOneData(id);
    res.send(data);
    }catch(e){
        res.status(401).send({ message:'error en get item'})
    }
}


const createItems = async (req,res) => {
    try{
        const {file,body} = req
        const fileData = {
            filename : file.filename,
            url: `${URL}/${file.filename}`,

        }
        const audio = await storageModel.create(fileData)
        const trackData = {
            name:body.name,
            mediaId:audio._id,
            artist:body.artist,
            album:body.album,
            duration:body.duration
        }
        const track = await tracksModel.create(trackData);
        res.send(track)
       
    
    } catch(e){
        res.status(401).send({ message:'error en create items'})
    }
    
}


const updateItems = async (req,res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id,body)
        res.send(data)
        } catch(e){
            res.status(401).send({ message:'error en update items'})
        }
        
}
const deleteItems = async (req,res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send(data);
        }catch(e){
            res.status(401).send({ message:'error en delete items'})
        }
}







module.exports = {getItems, createItems, updateItems, deleteItems,getItem};