const Gfycat = require('gfycat-sdk');
var gfycat = new Gfycat({clientId: "2_HuhRdD", clientSecret: "tHVzz9DxBGbwAdHttNmkqctsDCTveRSI87uoIPbqZs-nbmVCDpKvw6panXY59ODH"});
var express = require('express');
//var morgan = require('morgan');
//var bodyParser = require('body-parser');
var hnpm ;
const https = require('https');
//var MongoClient = require('mongodb').MongoClient,
const assert = require('assert');

//var dboper = require('./operations');
var hostname = '0.0.0.0';// normally 'localhost', but this allows others to connect on the network
var port = 8080;//420;
var assets = {};
var app = express();
//app.set('view engine', 'ejs');

var router = express.Router();
//var url = 'mongodb://localhost:27017/test';

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



/*
gfycat.authenticate().then(res => {
  //Your app is now authenticated
  assert.equal(res.access_token, gfycat.token);
  console.log('token', gfycat.token);
});
*/



//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

//router.use(bodyParser.json()); //parse input json data

router.route('/getdata')
.all(function(req,res,next){
  //res.writeHead(200,{'Content-Type':'application/json'});
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
    console.log('gfycats', data);
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });

});

router.route('/gfyinfo')
.all(function(req,res,next){
  //res.writeHead(200,{'Content-Type':'application/json'});
  next();
}).get(function(req,res,next){
  var url = req.headers.url
  console.log("url " + url)
  gfycat.getGifDetails({gfyId:url}).then(data => {
    console.log('gfycats', data);
    res.json(data);
  }).catch(err=>{
    errorHappened(err);
  });

});


router.route('/trending')
.all(function(req,res,next){
  //res.writeHead(200,{'Content-Type':'application/json'});
  next();
}).get(function(req,res,next){
  if (req.headers.count){
    count = req.headers.count;
  }else{
    count = 1;
  }
//  var url = req.headers.url
//  console.log("url " + url)
  gfycat.trendingGifs({count:count}).then(data => {
    console.log('trending response: ', data.gfycats[count-1].gifUrl);
    res.json(data.gfycats[count-1]);
  }).catch(err=>{
    errorHappened(err);
  });

});


router.route('/videourl')
.all(function(req,res,next){
  //res.writeHead(200,{'Content-Type':'application/json'});
  next();
}).get(function(req,res,next){
  var url = req.headers.url
  console.log("url " + url)


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
        console.log(data);
    });

    // this event fires *one* time, after all the `data` events/chunks have been gathered
    http_res.on("end", function () {
        // you can use res.send instead of console.log to output via express
        console.log(data);
        res.json(data);
    });
  });





});










router.route('/')
.all(function(req,res,next){
  res.writeHead(200,{'Content-Type':'text/plain'});
  next();
}).get(function(req,res,next){

   res.end('Get requested');
   console.log("GET GET");

}).post(function(req,res){
	console.log("POST GET");
  console.log(req.headers);
	var lat = req.headers.lat;
	var long = req.headers.long;
  var id = req.headers.id;
  var timestamp = req.headers.time;
  /*
  if(lat!=null&&long!=null&&id!=null&&timestamp!=null){

    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      //console.log("Connected correctly to server");
      dboper.insertDocument(db, { userid:id, time: timestamp,latitude:lat,longitude:long},
          "test", function(result){//test is the database
            console.log(result.ops);
            db.close();
      });
  });


}
*/
	res.end("post accepted");
});






app.use('/',router); //attach security router to everything that goes to /map

app.use(express.static(__dirname+'/public')); //allow access to the .html files in public
app.listen(port,hostname,function(){
  console.log("Server running at http://${hostname}:${port}/");
});

/*
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1>");
  response.end();
});
server.listen(8000);
*/
