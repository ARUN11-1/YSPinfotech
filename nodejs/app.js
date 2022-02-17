var express = require("express");
var bodyParser = require('body-parser');
var bcrypt =  require("bcrypt");
var path   = require("path")
const { MongoClient } = require("mongodb");
var mongodb = require("mongodb").MongoClient;
const url  = "mongodb://localhost:27017/mydb";
require("./models/students");

var app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

//______________________support the htmml page ________________________________
app.use(express.static(path.join(__dirname, './public/')));
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//_______________________create the connection with the mongodb________________
MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    else{
        console.log("connected");
        db.close();
    }
});
//________________________________ insert the student _________________________
app.post("/createaccount",(req,res)=>{
   console.log(req.body);
    MongoClient.connect(url,(err,db)=>{
      if(err) throw err;
      var dbo = db.db("mydb");
      var myobj = {
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone, 
         password:req.body.password
      }
        dbo.collection("students").insertOne(myobj, function(err,res){
          if(err) throw err;
          console.log("user registered successfully");
          db.close();
       });
       return res.redirect("home.html")
    });
}); 
//________________________ app listen on port ______________________________//
app.listen(port,(err)=>{
   if(err) throw err;
   else{
       console.log("app listen on port",port);
   }
})