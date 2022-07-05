const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const tracksScheme = new mongoose.Schema(
    {
        name: {
            type:String
        },
        artist:{
            type:String
        },
        album : {
            type:String
                },
                duration : {
                    type:String
                        },
        mediaId : {
            type:mongoose.Types.ObjectId
                }
    },
        {
            versionKey:false,
            timestamps:true,
        }
);

tracksScheme.statics.findAllData = function(id){
    const joinData = this.aggregate([
        {
            $lookup:{
                from:'storages',
                localField:'mediaId',
                foreignField: '_id',
                as:'audio',
            },
        },
        {
            $unwind:'$audio'
        }
    ])
    return joinData
}


tracksScheme.statics.findOneData = function(id){
    const joinData = this.aggregate([
       {
        $match:{
            mediaId:mongoose.Types.ObjectId(id),
        },
       },
       
        {
            $lookup:{
                from:'storages',
                localField:'mediaId',
                foreignField: '_id',
                as:'audio',
            },
        },
        {
            $unwind:'$audio'
        }
    ])
    return joinData
}
tracksScheme.plugin(mongooseDelete,{overrideMethods:'all'});
module.exports = mongoose.model("Tracks", tracksScheme)