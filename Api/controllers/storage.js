const fs = require('fs')
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');
const URL = process.env.PUBLIC_URL;
const MEDIAPATH = `${__dirname}/../storage`



const getItems = async (req,res) => {
  try{
    const data =  await storageModel.find({});
    res.send(data)
  }catch(e){
    res.status(401).send({ message:'error en get items'})
  }
}
const getItem = async (req,res) => {
    try{
        const {id}= matchedData(req)
        const data =  await storageModel.findById(id);
        res.send(data)
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
        name: body.name
    }
    const data = await storageModel.create(fileData)
    res.send(data)
  }catch(e){
    res.status(401).send({ message:'error en create items'})
  }
}



const deleteItems = async (req,res) => {
  try{
    const {id}= matchedData(req)
    const dataFile =  await storageModel.findById(id);
    await storageModel.delete({_id:id});
    const {filename}= dataFile;
    const Filepath = `${MEDIAPATH}/${filename}`
    
    
    const data = {
      Filepath,
      deleted:1
    }

    res.send({data})

  }catch(e){
    res.status(401).send({ message:'error en delete items'})
  }
}







module.exports = {getItems, createItems,  deleteItems,getItem};