const Gfycat = require('gfycat-sdk');
var gfycat = new Gfycat({clientId: "2_7kmTI8", clientSecret: "9X4E1UlJMRmVUdCrqzeeZNkNCeud2oWIGHdX_PzwP2EgM7CiXrpMSgQ_kBuOd-Yc"});
var express = require('express');

var http = require('http');
const https = require('https');

const assert = require('assert');

var hostname = '0.0.0.0';
var port = process.env.PORT || 8080;
var assets = {};
var app = express();

var router = express.Router();

console.log(__dirname);

app.use('/',router); //attach security router to everything that goes to /map

app.use(express.static(__dirname+'/public')); //allow access to the .html files in public
app.listen(port,hostname,function(){
  console.log("Server running at http://${hostname}:${port}/");
});


//mongo stuff goes here

gfycat.authenticate((err, data) => {
  //Your app is now authenticated
  console.log(data);
  //assert.equal(data.access_token, gfycat.token);
  console.log(gfycat)


})


function errorHappened(err){

  console.log("ERROR!!!!!!!!!!!!!!!!!!");
  console.log(err);
}

router.route('/getdata')
.all(function(req,res,next){
  next();
}).get(function(req,res,next){
  var query = req.headers.query
  if (req.headers.count){
    gfycount = req.headers.count;
  }else{
    gfycount = 5;
  }
  options = {
    search_text: query,
    count: gfycount,
    first: 0
  };

  gfycat.search(options).then(data => {
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });

});

router.route('/gfyinfo')
.all(function(req,res,next){
  next();
}).get(function(req,res,next){
  var url = req.headers.url
  gfycat.getGifDetails({gfyId:url}).then(data => {
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });

});


router.route('/trending')
.all(function(req,res,next){
  next();
}).get(function(req,res,next){
  if (req.headers.count){
    count = req.headers.count;
  }else{
    count = 1;
  }
  gfycat.trendingGifs({count:count}).then(data => {
    res.json(data.gfycats[count-1]);
  }).catch(err=>{
    errorHappened(err);
  });

});


router.route('/videourl')
.all(function(req,res,next){
  next();
}).get(function(req,res,next){
  var url = req.headers.url


  options={
    host:'api.gfycat.com',
    path:'/v1/gfycats/fetch/remoteurlinfo',
    headers:{url:url}

  }



  https.get(options, function (http_res) {
    // initialize the container for our data
    var data = "";

    // this event fires many times, each time collecting another piece of the response
    http_res.on("data", function (chunk) {
        // append this chunk to our growing `data` var
        data += chunk;
    });

    // this event fires *one* time, after all the `data` events/chunks have been gathered
    http_res.on("end", function () {
        // you can use res.send instead of console.log to output via express
        console.log(data.url); 
        res.end(data); 
    });
  });
});



router.route('/uploadurl')
.all(function(req,res,next){

  next();
}).post(function(req,res,next){
  var url = req.headers.url;
  var duration = req.headers.duration;
  var start = req.headers.start;

  //hardcoded for testing
  options={
    fetchUrl: url,
    title: "gifNote",
    private:false,
    cut:{duration:duration,start:start}
  }

  gfycat.upload(options).then(data => {
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });
});



router.route('/checkstatus')
.all(function(req,res,next){

  next();
}).get(function(req,res,next){
  var id = req.headers.id

  gfycat.checkUploadStatus(id).then(data => {
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });
});

router.route('/gfycats')
.all(function(name) {
  next();

}).get(function(req,res,next){
  var name = req.headers.name

  gfycat.getGyfcat(name).then(data => {
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });
});

