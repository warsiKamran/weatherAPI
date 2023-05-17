const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=2721d21f8c6984ab92f8e8f848e1633e&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);

            const desc = weatherData.weather[0].description;
            console.log(desc);
            
            //changing the icon
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn" + icon + "@2x.png";

            //this is how we can show more than one data using single res.send();
            res.write("<p>weather is currently " + desc + " " + "</p>");
            res.write("<h1>temperature in Chennai is " + temp + " " + "degree celcius</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });

//     res.send("server started successfully");
});

app.listen("3000", function(){
    console.log("server started at port 3000");
});
