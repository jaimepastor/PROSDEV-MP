const mongoose = require("mongoose")

var postSchema = mongoose.Schema({
    title: String,
    user: String,
    price: Number,
    status: String,
    region: String,
    description: String
}) 

var Post = mongoose.model("post", postSchema)

exports.create = function(post){
    return new Promise(function(resolve, reject){
        console.log(post)
        var p = new Post(post)

        p.save().then((newPost)=>{
            console.log(newPost)
            resolve(newPost)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Post.findOne({_id:id}).then((post)=>{
            resolve(post)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Post.find().then((posts)=>{
          resolve(posts)
        }, (err)=>{
          reject(err)
        })
      })
}

exports.getAllPosting = function(title){
    return new Promise(function(resolve, reject){
        Post.find({title:title}).then((posts)=>{
            resolve(posts)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Post.deleteOne({_id: id
        }).then((post)=>{
            console.log("Deleted: ",  post)
        },(err)=>{
            reject(err)
        })
    })
}

exports.edit = function(id, post){
    return new Promise(function(resolve, reject){
        Post.findOneAndUpdate({_id:id}, post).then((post)=>{
            resolve(post)
        }, (err)=>{
            reject(err)
        })
    })
}