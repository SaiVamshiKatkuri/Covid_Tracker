// jshint esversion:6
const express = require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require("https");
const mongoose = require('mongoose');
const ejs=require('ejs');


const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/coronausersDB", {useNewUrlParser: true ,useUnifiedTopology: true});

app.get("/",function(req,res){

const url="https://api.covid19api.com/summary";

request({
url:"https://api.covid19api.com/summary",
method:'GET',
json:true},function(err,response){
  var Total=response.body;
  var confirmed=Total.Global.TotalConfirmed;
  // console.log(confirmed);
  var recovered=Total.Global.TotalRecovered;
  var deaths=Total.Global.TotalDeaths;
  var nconfirmed=Total.Global.NewConfirmed;
  t = new Date();
         yesterday = new Date(t.setDate(t.getDate() - 1));
             console.log(yesterday.toISOString().substring(0,10));

  // console.log(nconfirmed);
  var nrecovered=Total.Global.NewRecovered;
  console.log(nrecovered);
  var ndeaths=Total.Global.NewDeaths;
    res.render("main", {TConfirmed: confirmed,TRecovered: recovered, TDeaths: deaths, Newconfirmed:nconfirmed,Newrecovered:nrecovered,Newdeaths:ndeaths});
}
);

// https.get(url,function(response){
//
//   [response].on("data",function(data){
// // console.log(data);
// // var Total=[];
//   var  Total=JSON.parse(data);
//    console.log(Total.Global);
// });
// });
});

app.post("/",function(req,res){
var s=req.body.search;
console.log(s);

});



app.listen(3000,function(){
console.log("its working");

})
