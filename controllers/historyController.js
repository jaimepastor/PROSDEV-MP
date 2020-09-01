const express = require("express")
const router = express.Router()
const History = require("../models/history")
const Game = require("../models/game")
const Post = require("../models/post")
const bodyparser = require("body-parser")
const Cart = require("../models/cart")
const { duration } = require("moment")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get('/history', async function(req, res){
    History.getAll().then(async function(history) {
      let userHistory = []
      
      for (let i in history) {
        if(history[i].user == req.session.email){
          const postingID = history[i].postingID
          const post = await Post.get(postingID)
          const game = await Game.getTitle(post.title)
    
          const historyRecord = {
            title : game.title,
            platform : game.platform,
            genre : game.genre,
            release : game.release,
            link : game.link,
            owner : post.user,
            startDate : history[i].rentDate,
            endDate: history[i].rentDate + history[i].duration,
            duration : history[i].duration,
            price : post.price,
            total: post.price * history[i].duration,
            returned: history[i].returned
          }
    
          userHistory.push(historyRecord)
        }
      }
  
      res.render("history.hbs", {userHistory})
    })
})

router.post("/newHistory", function(req,res){
    Cart.getAll().then((carts)=>{
        for(var i in carts){
            var today = new Date()

            var history = {
                user : req.session.email,
                postingID: carts[i].ID, 
                rentDate: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear(),
                duration: carts[i].duration,
                returned: false
            }

            History.add(history).then((history)=>{
                Post.get(history.postingID).then((post)=>{
                    var update = {
                        title : post.title,
                        user : post.user,
                        price : post.price,
                        status : "Rented",
                        region : post.region,
                        description : post.description
                    }
                    Post.edit(post._id, update)
                })
                console.log(history)
            }, (error)=>{
                res.sendFile(error)
            })
        }
        Cart.deleteAll()
        res.redirect("/game/games")
    })
})

router.get("/rented-games", function(req, res){
    res.render("rentedGames.hbs")
})

module.exports = router