const express = require("express")
const router = express.Router()

const app =  express()

router.use("/user", require("./userController"))
router.use("/game", require("./gameController"))
router.use("/post", require("./postController"))
router.use("/cart", require("./cartController"))
router.use("/history", require("./historyController"))
router.use("/review", require("./reviewController"))

router.get("/", function(req,res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    console.log("GET /")
    res.render("signup.hbs", {errors, savedinput})
})

router.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = router