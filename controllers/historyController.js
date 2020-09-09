const express = require("express")
const router = express.Router()
const History = require("../models/history")
const Game = require("../models/game")
const Post = require("../models/post")
const User = require("../models/user")
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
          var date = new Date(history[i].rentDate)
          date.setDate(history[i].rentDate.getDate() + history[i].duration)
          const historyRecord = {
            title : game.title,
            platform : game.platform,
            genre : game.genre,
            release : game.release,
            link : game.link,
            owner : post.user,
            startDate : history[i].rentDate,
            endDate: date,
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
    
    currUser = req.session.email
    User.getUser(currUser).then((newUser)=>{
//        console.log(newUser)
        Post.getAll().then(async function(posts) {
            let rentedGames = []
            
            for (let i in posts) {
                if(posts[i].status == "Rented"){
                    const game = await Game.getTitle(posts[i].title)
                    
                    History.get(posts[i]._id).then(async function(history){
                        const user = await User.getUser(history.user)
                        var date = new Date(history.rentDate)
                        date.setDate(history.rentDate.getDate() + history.duration)
                            const rentedGame = {
                                title : posts[i].title,
                                platform : game.platform,
                                genre : game.genre,
                                release : game.release,
                                link : game.link,
                                user : user.firstName + " " + user.lastName,
                                email : user.email, 
                                startDate : history.rentDate,
                                endDate: date,
                                duration : history.duration,
                                price : posts[i].price,
                                total: posts[i].price * history.duration,
                                returned: history.returned
                            }
                            rentedGames.push(rentedGame)
                        
                    })
                    }
                
            }
            console.log("rentedGmes")
            console.log(rentedGames)
            res.render("rentedGames.hbs", {rentedGames})
          })
})

})
module.exports = router