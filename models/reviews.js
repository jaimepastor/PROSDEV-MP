const mongoose = require("mongoose")

var reviewSchema = mongoose.Schema({
    postID: String,
    reviewerID: String,
    review: String
})

var Review = mongoose.model("review", reviewSchema)

exports.create = function(review){
    return new Promise(function(resolve,reject){
        console.log(review)
        var r = new Review(review)

        r.save().then((newReview)=>{
            console.log(newReview)
            resolve(newReview)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Review.find().then((reviews)=>{
            console.log(reviews)
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getPostingReviews = function(postingID){
    return new Promise(function(resolve, reject){
        Review.find({postID:postingID}).then((reviews)=>{
            console.log(reviews)
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}