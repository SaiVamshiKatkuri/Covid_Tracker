
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const ejs = require("ejs");
const https = require('https');
const path = require('path');
const helmet = require('helmet');



const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.json({limit: '20mb', type: 'application/json'}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());
// ## npm i novelcovid --save ##
const api = require('novelcovid');



api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})

app.get("/",function(req,res){
  api.countries({sort:'cases'}).then((c)=>{
    console.log(c);
    var countr={}
    // var countr={
    //   "India":"",
    //   "Bulgaria":""
    // };
    // for(var i=1;i<=c.length;i++){
      c.forEach((i)=>{
        // if(i.country[0]=="'")
        // {
        //   countr[i.countryInfo..slice(1,3)]=i.cases;
        // }
        // else
        countr[i.countryInfo.iso2]=i.active;
      });
    // countr[c[1].country]=c[1].cases;
  // }
    console.log(countr);
    res.render("map",{c:[countr]});
  }) ;
});


app.listen(3000,function(){
  console.log("ok");
})



//  const fetch = require('node-fetch');
// fetch('https://corona.lmao.ninja/v2/jhucsse')
//     .then(res => res.json())
//     .then(json =>{
//       json.forEach((element)=>{
//         console.log(element.coordinates.latitude);
//       });
//
//       });
