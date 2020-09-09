const express = require("express")
const router = express.Router()
const Game = require("../models/game")
const bodyparser = require("body-parser")
const Post = require("../models/post")
const Review = require("../models/reviews")
const User = require("../models/user")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function validation(game){
    if(game.title && game.platform && game.genre && game.release && game.rating && game.link){
        return true
    }
    else{
        return false
    }
}

router.post("/add-game", function(req, res){
    
    var game = {
        title : req.body.title,
        platform : req.body.platform,
        genre : req.body.genre,
        release : req.body.release,
        rating : req.body.rating,
        link : req.body.link,
        clicks: 0 
    }
    Game.getTitle(game.title).then((exists)=>{
        if(validation(game) && !exists){
            Game.create(game).then((game)=>{
                console.log(game)
                res.render("upload.hbs")
            }, (error)=>{
                res.sendFile(error)
            })
        }
        else{
            req.session.errors = []
            if(game.title == '')
                req.session.errors.push({"container-id": "title","message": "Game title cannot be blank"})
            if(game.link == '')
                req.session.errors.push({"container-id": "link","message": "Game link is invalid"})
            if(game.release == '')
                req.session.errors.push({"container-id": "release","message": "Release date is not valid"})
            if(!game.genre)
                req.session.errors.push({"container-id": "genre","message": "Genre must be selected"})
            if(!game.platform)
                req.session.errors.push({"container-id": "platform","message": "Platform must be selected"})
            if(!game.rating)
                req.session.errors.push({"container-id": "rating","message": "Rating must be selected"})
            if(exists)
                req.session.errors.push({"container-id": "title","message": "This game already exists in the database"})
            
            req.session.savedinput = [{"container-id": "title", "content": game.title}, 
                                      {"container-id": "platform", "content": game.platform}, 
                                      {"container-id": "genre", "content": game.genre}, 
                                      {"container-id": "release", "content": game.release}, 
                                      {"container-id": "rating", "content": game.rating}, 
                                      {"container-id": "link", "content": game.link}]
            res.redirect("/game/new-game")
            }
    })
})

router.get("/games", function(req,res){
    Game.getAll().then((games)=>{
        User.getAll().then((users)=>{
            res.render("dashboard.hbs", {
                games, users
            })
        }) 
    })
})

router.get("/gamelist", function(req,res){
    Game.getAll().then((games)=>{
        res.render("gameList.hbs", {
            games
        })
    })
})

router.get("/new-game", function(req,res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    res.render("add.hbs", {errors, savedinput})
})

router.get("/vg/:id", function(req,res){
    console.log(req.params.id)
    Game.get(req.params.id).then((game)=>{
        console.log(game)
        const temp = {
            title: game.title,
            platform: game.platform,
            genre: game.genre,
            release: game.release,
            rating: game.rating,
            link: game.link,
            clicks: game.clicks +1
        }
        Game.edit(req.params.id, temp).then((game)=>{
            Post.getAllPosting(game.title).then((posts)=>{
                Review.getAll().then((reviews)=>{
                    res.render("spiderman.hbs", {
                        game, posts, reviews
                    })
                })
            })
        })
        
    })
})

router.get("/testEach", function(req,res){
    Game.getAll().then((games)=>{
        res.render("testEach.hbs", {
            games
        })
    })
})

module.exports = router