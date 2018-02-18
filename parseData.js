var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var axios = require('axios');
var data = [];

var async = require('async');
var test;
request('https://www.vancouvertrails.com/trails/', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
           console.log("Strted!!");

             $('.row.traillist li').each(function(i, elm) {
            // console.log($(this).text()) // for testing do text()


                let name = $(this).find(".trailname").text();
                let region = $(this).find(".i-name").text();
                let difficulty = $(this).find(".i-difficulty").text();
                let time = $(this).find(".i-time").text();
                let distance = $(this).find("li .i-distance").text();
                let schedule = $(this).find("li .i-schedule").text();

                //console.log($(this).find(".i-difficulty").text());
                let tempLink = $(this).children("a").attr('href');

                let link;

                if(tempLink){
                    link = "https://www.vancouvertrails.com"+ tempLink;
                }

                if (name){
                    let obj = { 'name' : name , 'region' : region, 'difficulty': difficulty, 'time' : time, 'distance': distance, 'schedule':schedule, 'link': link};
                    data.push(obj);
                }

            });
        }


        async.each(data, function(item, done){

            request(data[data.indexOf(item)].link, function(err, resp, html) {
                if (!err){
                    
                    const $ = cheerio.load(html);
                    $('#elevation').each(function(i, elm) {
                        let elevation = $(this).text();
                        elevation = elevation.substring(14);
                        data[data.indexOf(item)].elevation = elevation;

                    });

                    $('#distance').each(function(i, elm) {

                        let roundTrip = $(this).text();
                        var search = roundTrip.search(/\d/);
                        if (roundTrip[0] == 'O'){
                            data[data.indexOf(item)].OneWay  = roundTrip.substring(search);
                        }else{
                            data[data.indexOf(item)].roundTrip = roundTrip.substring(search);
                        }
                    });
                    
                    $('.trail-info p').each(function(i, elm) {
                    
                        let description = $(this).text();
                        if (i == 0){
                            data[data.indexOf(item)].description = description;
                        }
                        
                    });

                    $('.banner-img').each(function(i, elm) {
                    
                        let tempLink = $(this).text();
                        let imgLink;
                        if(tempLink){
                            imgLink = "https://www.vancouvertrails.com"+ tempLink;
                            data[data.indexOf(item)].imgLink = imgLink;
                        }
                        
                    });
                }
            });
        });

        setTimeout(function(){
            fs.writeFile("Data.json", JSON.stringify(data), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        },10000);

});
