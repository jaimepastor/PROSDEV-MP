const express = require("express")
const router = express.Router()
const History = require("../models/history")
const Game = require("../models/game")
const Post = require("../models/post")
const User = require("../models/user")
const bodyparser = require("body-parser")
const Cart = require("../models/cart")
const { duration } = require("moment")
const moment = require("moment")

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
          date = moment(date.setDate(history[i].rentDate.getDate() + history[i].duration)).format("MMMM D, YYYY")
          const historyRecord = {
            postingID : postingID,
            title : game.title,
            platform : game.platform,
            genre : game.genre,
            release : moment(game.release).format("MMMM D, YYYY"),
            link : game.link,
            owner : post.user,
            startDate : moment(history[i].rentDate).format("MMMM D, YYYY"),
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
        Post.getAll().then(async function(posts) {
            let rentedGames = []   
            for (let i in posts) {
                if(posts[i].status == "Rented" || posts[i].status == "Returned"){
                    if(posts[i].user == currUser){
                    const game = await Game.getTitle(posts[i].title)
                    const history = await History.get(posts[i]._id)
                    const user = await User.getUser(history.user)
                            var date = new Date(history.rentDate)
                            date.setDate(history.rentDate.getDate() + history.duration)
                            const rentedGame = {
                                title : posts[i].title,
                                postingID: posts[i]._id,
                                platform : game.platform,
                                genre : game.genre,
                                release : moment(game.release).format("MMMM D, YYYY"),
                                link : game.link,
                                user : user.firstName + " " + user.lastName,
                                email : user.email, 
                                startDate : moment(history.rentDate).format("MMMM D, YYYY"),
                                endDate: moment(date).format("MMMM D, YYYY"),
                                duration : history.duration,
                                price : posts[i].price,
                                total: posts[i].price * history.duration,
                                returned: history.returned,
                                status: posts[i].status
                            }
                            rentedGames.push(rentedGame)
                        }
                    }
                
            }
            res.render("rentedGames.hbs", {rentedGames})
          })
})
})
router.get("/return-games", function(req, res){
    History.getAll().then(async function(history) {
        let gamesOnHand = []
        
        for (let i in history) {
          if(history[i].user == req.session.email && history[i].returned == false){
            const postingID = history[i].postingID
            const post = await Post.get(postingID)
            const game = await Game.getTitle(post.title)
            var date = new Date(history[i].rentDate)
            date.setDate(history[i].rentDate.getDate() + history[i].duration)
            if(history[i].returned == false){
                const historyRecord = {
                    postingID : postingID, 
                    title : game.title,
                    platform : game.platform,
                    genre : game.genre,
                    release : moment(game.release).format("MMMM D, YYYY"),
                    link : game.link,
                    owner : post.user,
                    startDate : moment(history[i].rentDate).format("MMMM D, YYYY"),
                    endDate: moment(date).format("MMMM D, YYYY"),
                    duration : history[i].duration,
                    price : post.price,
                    total: post.price * history[i].duration,
                    returned: history[i].returned
                  }
            
                  gamesOnHand.push(historyRecord)
            }
          }
        }
    
        res.render("returnGames.hbs", {gamesOnHand})
      })
})


module.exports = router