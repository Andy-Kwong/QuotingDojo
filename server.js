var express = require("express");
var app = express();

var mongoose = require("mongoose");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var path = require("path");
app.set("views", path.join(__dirname, "./views"));

app.set("view engine", "ejs");

app.get("/", function(req, res){

    res.render("index");
})

app.post("/verify", function(req, res) {
    console.log("Post Data", req.body);

    var quote = new Quote({name: req.body.name, quote: req.body.quote});

    quote.save(function(err) {
            if (err) {
                console.log("post method error", err)
            } else {
                console.log("Successfully added a user!");
                res.redirect("/quotes");
            }
    })
})

app.get("/quotes", function(req, res) {
    Quote.find({}, function(err, quotes) {
        console.log("get method error", err);
        if(err) {
            console.log(err);
        } else {
            console.log(quotes);
            res.render("quotes", {allQuotes: quotes})
        }
    })
})

app.listen(8001, function() {

    console.log("listening on port 8001");
})

mongoose.connect("mongodb://localhost/QuotingDojo");

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quote: {type: String, required: true, minlength: 5, maxlength: 500},
    createdOn: {type: Date, default: Date.now}
})

mongoose.model("Quote", QuoteSchema);
var Quote = mongoose.model("Quote");

