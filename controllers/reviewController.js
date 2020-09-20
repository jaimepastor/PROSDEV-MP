const express = require("express")
const router = express.Router()
const Review = require("../models/reviews")
const Post = require("../models/post")
const Game = require("../models/game")
const User = require("../models/user")
const History = require("../models/history")
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

router.post("/new-review-return", function(req,res){
    var review = {
        postID: req.body.postID,
        reviewerID: req.session.email,
        review: req.body.review
    }   
    if(review.review.trim() == ''){
        console.log("blank")
        User.getUser(review.reviewerID).then((user)=>{
            Post.get(review.postID).then((post)=>{
                const temp ={
                    title : post.title,
                    user : post.user,
                    price : post.price,
                    status : "Returned",
                    region : post.region,
                    description : post.description
                }
                History.getIndiv(review.postID, review.reviewerID).then((history)=>{
                    console.log(history)
                    const his = {
                        user: history.user,
                        postingID: history.postingID,
                        rentDate: history.rentDate,
                        duration: history.duration,
                        returned: true
                    }
                    Post.edit(review.postID, temp).then((post)=>{
                        History.returnGame(history._id, review.reviewerID, his).then(()=>{
                            res.redirect("/history/return-games")
                        })
                    }, (error)=>{
                        res.sendFile(error)
                    })
                })
            })
        })
    }
    else{
        Review.create(review).then((review)=>{
            User.getUser(review.reviewerID).then((user)=>{
                Post.get(review.postID).then((post)=>{
                    const temp ={
                        title : post.title,
                        user : post.user,
                        price : post.price,
                        status : "Returned",
                        region : post.region,
                        description : post.description
                    }
                    History.getIndiv(review.postID, review.reviewerID).then((history)=>{
                        const his = {
                            user: history.user,
                            postingID: history.postingID,
                            rentDate: history.rentDate,
                            duration: history.duration,
                            returned: true
                        }
                        Post.edit(review.postID, temp).then((post)=>{
                            History.returnGame(history._id, review.reviewerID, his).then(()=>{
                                res.redirect("/history/return-games")
                            })
                        }, (error)=>{
                            res.sendFile(error)
                        })
                    })
                })
            })
        },(error)=>{
            res.sendFile(error)
        })
    }
    
})

router.post("/new-review-history", function(req,res){
    var review = {
        postID: req.body.postID,
        reviewerID: req.session.email,
        review: req.body.review
    }   
    if(review.review.trim() == ''){
        console.log("blank")
        User.getUser(review.reviewerID).then((user)=>{
            Post.get(review.postID).then((post)=>{
                const temp ={
                    title : post.title,
                    user : post.user,
                    price : post.price,
                    status : "Returned",
                    region : post.region,
                    description : post.description
                }
                History.getIndiv(review.postID, review.reviewerID).then((history)=>{
                    const his = {
                        user: history.user,
                        postingID: history.postingID,
                        rentDate: history.rentDate,
                        duration: history.duration,
                        returned: true
                    }
                    Post.edit(review.postID, temp).then((post)=>{
                        History.returnGame(history._id, review.reviewerID, his).then(()=>{
                            res.redirect("/history/history")
                        })
                    }, (error)=>{
                        res.sendFile(error)
                    })
                })
            })
        })
    }
    else{
        Review.create(review).then((review)=>{
            User.getUser(review.reviewerID).then((user)=>{
                Post.get(review.postID).then((post)=>{
                    const temp ={
                        title : post.title,
                        user : post.user,
                        price : post.price,
                        status : "Returned",
                        region : post.region,
                        description : post.description
                    }
                    History.getIndiv(review.postID, review.reviewerID).then((history)=>{
                        const his = {
                            user: history.user,
                            postingID: history.postingID,
                            rentDate: history.rentDate,
                            duration: history.duration,
                            returned: true
                        }
                        Post.edit(review.postID, temp).then((post)=>{
                            History.returnGame(history._id, review.reviewerID, his).then(()=>{
                                res.redirect("/history/history")
                            })
                        }, (error)=>{
                            res.sendFile(error)
                        })
                    })
                })
            })
        },(error)=>{
            res.sendFile(error)
        })
    }
    
})

module.exports = router