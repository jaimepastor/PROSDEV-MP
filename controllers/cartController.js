const express = require("express")
const router = express.Router()
const Cart = require("../models/cart")
const Game = require("../models/game")
const Post = require("../models/post")
const bodyparser = require("body-parser")
const moment = require("moment")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

function durationValidation(cart){
    if(cart.duration > 0){
        return true
    }
    else{
        return false
    }
}

router.use(urlencoder)

router.post("/add-to-cart", function(req, res){
    let postID = req.body.postingID

    Post.get(postID).then((post)=>{
        Game.getTitle(post.title).then((game)=>{
            var cart = {
                title : post.title,
                price : post.price, 
                link : game.link,
                user : post.user,
                borrower: req.session.email,
                release : moment(game.release).format("MMMM D, YYYY"),
                duration : req.body.duration,
                ID: post._id
            }
            
            if(durationValidation(cart)){
                Cart.add(cart).then((cart)=>{
                    console.log(cart)
                    res.redirect("/game/vg/" + game._id)
                }, (error)=>{
                    res.sendFile(error)
                })
            }
            else{
                //insert error message here
                res.redirect("/game/vg/" + game._id)
            }
        })
    })
})

router.get("/", function(req, res){
    cartowner = req.session.email
    Cart.getAll().then((tempitems)=>{
        let items = []
        for(i in tempitems){
            var temp = {
                title: tempitems[i].title,
                price: tempitems[i].price, //change to duration
                link: tempitems[i].link,
                user: tempitems[i].user,
                borrower: tempitems[i].borrower,
                release: moment(tempitems[i].release).format("MMMM D, YYYY"),
                duration: tempitems[i].duration,
                ID: tempitems[i].ID
            }
            items.push(temp)
        }
        res.render("cart.hbs", {
            items, cartowner
        })
    })
})

module.exports = router