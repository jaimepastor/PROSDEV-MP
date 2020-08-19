const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Post = require("../models/post")
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function regValidation(user, confirmPass){
    if(user.firstName && user.lastName && user.region && user.email && user.password == confirmPass){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            if(!/[^a-zA-Z0-9]/.test(user.firstName) && !/[^a-zA-Z0-9]/.test(user.lastName)){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

function validation(user){
    if(user.email && user.password){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

router.post("/register", function(req, res){
    var user = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        region: req.body.region,
        email: req.body.email,
        password : req.body.password
    }
    var confirmPass = req.body.confirmPass

    if(regValidation(user, confirmPass)){
        User.create(user).then((user)=>{
            console.log(user)
            req.session.username = user.username
            res.render("loginscreen.hbs")
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        req.session.errors = []
        if(!/[a-zA-Z]+/.test(user.firstName))
            req.session.errors.push({"container-id": "firstName","message": "First name must only contain letters"})
        if(!/[a-zA-Z]+/.test(user.lastName))
            req.session.errors.push({"container-id": "lastName","message": "Last name must only contain letters"})
        if(!/[a-zA-Z0-9]+/.test(user.region))
            req.session.errors.push({"container-id": "region","message": "Region must only contain letters and numbers"}) 
        if(user.password == "")
            req.session.errors.push({"container-id": "password","message": "Password cannot be blank"})
        if(user.password != confirmPass)
            req.session.errors.push({"container-id": "confirmPass","message": "Passwords did not match"})
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))
            req.session.errors.push({"container-id": "email","message": "Invalid email address"})
            
        req.session.savedinput = [{"container-id": "firstName", "content": user.firstName}, 
                                  {"container-id": "lastName", "content": user.lastName}, 
                                  {"container-id": "region", "content": user.region}, 
                                  {"container-id": "email", "content": user.email}]
        res.redirect("/")
    }
})

router.post("/login", function(req, res){
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    if(validation(user)){
        User.authenticate(user).then((newUser)=>{
            if(newUser){
                req.session.email = user.email
                console.log(req.session.email)
                res.redirect("/game/games")
                // res.render("dashboard.hbs")
            }
            else{
                User.getUser(user.email).then((newUser)=>{
                    req.session.errors = []
                    if(!newUser)
                        req.session.errors.push({"container-id": "email","message": "Invalid email address"})
                    else
                        req.session.errors.push({"container-id": "password","message": "Password is incorrect"})
        
                    req.session.savedinput = [{"container-id": "email", "content": user.email}]
                    res.redirect("/user/loginpage")
                })
            }
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        User.getUser(user.email).then((newUser)=>{
            req.session.errors = []
            if(!newUser)
                req.session.errors.push({"container-id": "email","message": "Invalid email address"})
            else
                req.session.errors.push({"container-id": "password","message": "Password is incorrect"})

            req.session.savedinput = [{"container-id": "email", "content": user.email}]
            res.redirect("/user/loginpage")
        })
    }
})

router.get("/loginpage", function(req,res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    res.render("loginscreen.hbs", {errors, savedinput})
})

router.get("/profile", function(req,res){
    currUser = req.session.email
    User.getUser(currUser).then((newUser)=>{
//        console.log(newUser)
        Post.getAll().then((posts)=>{
            Game.getAll().then((games)=>{
                res.render("profile.hbs", {
                    newUser, posts, games
                })
            })
        })
        
    })
})

module.exports = router