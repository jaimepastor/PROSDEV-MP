const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb+srv://legaspij93:sapphire5@webapde-mp3-xcsjd.mongodb.net/test?retryWrites=true&w=majority", {
//, {
MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gameshare" 
// MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/prosdev" 
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
})

const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use(session({
    secret: "secret name",
    resave: true,
    saveUninitialized: true,
    name: "cookie monster"
}))

app.use(require("./controllers"))

app.listen(process.env.PORT || 3000)

// app.listen(3000, function(){
//     console.log("live at port 3000")
// })