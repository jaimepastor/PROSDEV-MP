const express = require("express")
const router = express.Router()
const Review = require("../models/reviews")
const Post = require("../models/post")
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/new-review", function(req,res){
    var review = {
        postID: req.body.postID,
        reviewerID: req.session.email,
        review: req.body.review
    }
    if(review.review.trim() == ''){
        console.log("blank")
    }
    else{
        Review.create(review).then((review)=>{
            Post.get(review.postID).then((post)=>{
                Game.getTitle(post.title).then((game)=>{
                    console.log(review)
                    res.redirect("/game/vg/" + game._id)
                })
            })
        },(error)=>{
            res.sendFile(error)
        })
    }
    
})

module.exports = router