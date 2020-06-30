
const mongoose = require('mongoose');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const ejs = require("ejs");
const https = require('https');
const path = require('path');
const helmet = require('helmet');
const api = require('novelcovid');

// you can choose which URL to use, this will not change the behaviour of the API

//Variable Declaration//
const app = express();
var flagUrl = "";
var s = "";
var today_cases;
var today_recovered;
var total_deaths;
var today_deaths;
var total_recovered;
var continent;
var country_population;
var total_tests;
var active_million;
var test_million;
var country;
var Total;
// var Tot=[];
// var Confirm=[];
// var D=[];
// var De=[];
// var Ac=[];
// var L="";
// var today="";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
api.settings({
  baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
mongoose.connect("mongodb://localhost:27017/coronausersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function (req, res) {
	api.countries({sort:'cases'}).then((c)=>{
    console.log(c);
    var countr={}
    
      c.forEach((i)=>{
        
        countr[i.countryInfo.iso2]=i.active;
      });
  
//     console.log(countr);
//     res.render("map",{c:[countr]});
//   }) ;
// });

  const url = "https://api.covid19api.com/summary";
  request({
    url: "https://api.covid19api.com/summary",
    method: 'GET',
    json: true
  }, function (err, response) {
    Total = response.body;
    var confirmed = Total.Global.TotalConfirmed;
    var recovered = Total.Global.TotalRecovered;
    var deaths = Total.Global.TotalDeaths;
    var nconfirmed = Total.Global.NewConfirmed;
    t = new Date();
    yesterday = new Date(t.setDate(t.getDate() - 14));
    var nrecovered = Total.Global.NewRecovered;
    var ndeaths = Total.Global.NewDeaths;
    console.log(countr);
    res.render("main", {
      TConfirmed: confirmed,
      TRecovered: recovered,
      TDeaths: deaths,
      c:[countr],
      Newconfirmed: nconfirmed,
      Newrecovered: nrecovered,
      Newdeaths: ndeaths
    });
  });
});
});

// https.get(url,function(response){
//
//   [response].on("data",function(data){
// // console.log(data);
// // var Total=[];
//   var  Total=JSON.parse(data);
//    console.log(Total.Global);
// });
// });


app.post("/individual", function (req, res) {
  s = req.body.search;
  api.countries({
    country: s
  }).then((element) => {
    console.log(element);
    flagUrl = element.countryInfo.flag;
    total_recovered=element.recovered;
    country=element.country;
    today_cases= element.todayCases;
    today_deaths=element.todayDeaths ;
    today_recovered=element.todayRecovered;
    continent= element.continent;
    country_population=element.population ;
    total_tests=element.tests ;
    active_million=element.activePerOneMillion ;
    test_million=element.testsPerOneMillion ;
    total_deaths=element.deaths ;
    console.log(1);
    today = new Date().toISOString().substring(0, 10);
    t = new Date();
    yesterday = new Date(t.setDate(t.getDate() - 45));
     y=yesterday.toISOString().substring(0,10);
     console.log(y);

    request({
      url: "https://api.covid19api.com/country/" + s + "?from="+ y +"T00:00:00Z&to=" + today + "T00:00:00Z",
      method: 'GET',
      json: true
    }, function (err, response) {
      var Tot = [];
      var Confirm = [];
      var D = [];
      var De = [];
      var Ac = [];
      var today = "";

      Tot = response.body;
      console.log(2);
      Tot.forEach(function (item) {
        D.push(item.Date);

        Confirm.push(item.Confirmed);
        De.push(item.Deaths);
        Ac.push(item.Active);
        console.log(3);

      });
      res.render('index', {
        Confirmed: Confirm,
        Dates: D.length,
        Deaths: De,
        Active: Ac,
        img: flagUrl,
        c_continent:continent,
        country:country,
        c_population:country_population,
        total_tests:total_tests,
        a_million:active_million,
        total_recovered:total_recovered,
        today_cases:today_cases,
        today_recovered:today_recovered,
        today_deaths:today_deaths,
        total_deaths:total_deaths
      });

    });


  });

});




app.listen(3000, function () {
  console.log("its working");

})
