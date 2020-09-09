const mongoose = require("mongoose")

var gameSchema = mongoose.Schema({
    title: String,
    platform: String,
    genre: String,
    release: Date,
    rating: String,
    link: String,
    clicks: Number
}) 

var Game = mongoose.model("game", gameSchema)

exports.create = function(game){
    return new Promise(function(resolve, reject){
        console.log(game)
        var g = new Game(game)

        g.save().then((newGame)=>{
            console.log(newGame)
            resolve(newGame)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Game.findOne({_id:id}).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getTitle = function(title){
    return new Promise(function(resolve, reject){
        Game.findOne({title:title}).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
      Game.find().then((games)=>{
        resolve(games)
      }, (err)=>{
        reject(err)
      })
    })
  }

  exports.edit = function(id, game){
    return new Promise(function(resolve, reject){
        Game.findOneAndUpdate({_id:id}, game).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}