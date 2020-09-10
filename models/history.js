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

exports.returnGame = function(postID, user, history){
    return new Promise(function(resolve, reject){
        History.findOneAndUpdate({postingID:postID, user: user, returned: false}, history).then((history)=>{
            resolve(history)
        }, (err)=>{
            reject(err)
        })
    })
}


