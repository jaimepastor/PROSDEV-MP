const mongoose = require("mongoose")

var historySchema = mongoose.Schema({
    user: String,
    postingID: String,
    rentDate: Date,
    duration: Number,
    returned: Boolean
})

var History = mongoose.model("history", historySchema)

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        History.find().then((history)=>{
            resolve(history)
        })
    })
}

exports.add = function(history){
    return new Promise(function(resolve, reject){
        var h = new History(history)

        h.save().then((newHistory)=>{
            console.log(newHistory)
            resolve(newHistory)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(postID){
    return new Promise(function(resolve, reject){
        History.findOne({postingID: postID, returned: false}).then((history)=>{
            resolve(history)
        })
    })
}

exports.getIndiv = function(postID, user){
    return new Promise(function(resolve, reject){
        History.findOne({postingID: postID, user: user, returned:false}).then((history)=>{
            resolve(history)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.returnGame = function(id, user, history){
    return new Promise(function(resolve, reject){
        History.findOneAndUpdate({_id:id, user: user, returned: false}, history).then((history)=>{
            resolve(history)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.return = function(postID){
    return new Promise(function(resolve, reject){
        History.findOneAndUpdate({postingID:postID, returned: true}).then((history)=>{
            resolve(history)
        }, (err)=>{
            reject(err)
        })
    })
}

