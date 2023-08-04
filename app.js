const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    //console.log(req.body.cityName);
    //console.log("Post received");
    const city = req.body.cityName;
    const key = "your key"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+unit;
    https.get(url, function(response){
        //console.log("i am in");
        console.log(response.statusCode);
        response.on("data",function(data){
            const Weatherdata = JSON.parse(data);
            //console.log(wd);
            const temp= Weatherdata.main.temp
            const weatherdiscription = Weatherdata.weather[0].description;
            const icon = Weatherdata.weather[0].icon;
            //const city = Weatherdata.name;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //console.log(weatherdiscription);
            res.write("<h1> The temperature in "+city+" is "+temp+" degree celsius </h1>");
            res.write("<h2> The description of the weather is "+weatherdiscription+"</h2>");
            res.write("<img src=" +imageURL +">");
            res.send();
        });
    });

    //res.send("Server is up and running");
})




app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
