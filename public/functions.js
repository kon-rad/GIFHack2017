

console.log("running");
var q
var n = 4;

var myVideo=document.getElementById("thevideo");

var duration = 15;
var isLooping = false;
var start = 0;


var theLoop; //global
var videoUrl; //the is the source of the raw video;"r---sn...."
var yt_URL; //"youtube.com/..."

/*video controls:
myVideo is the video
common controls:
myVideo.play()
myVideo.pause()
myVideo.currentTime
myVideo.currentTime = 2.4
note: when you input a current time, the video will move to the next keyframe before starting

*/

function setVideoUrl(url){
	videoUrl = url;
	myVideo.src=videoUrl;
}

function startLoop(){
	theLoop = window.setInterval(function(){
		if (myVideo.currentTime>start+duration){
			myVideo.currentTime=start;
		}
		},100);
		return theLoop
}

function stopLoop(){
	clearInterval(theLoop)
}

function getTrending(){
	var xhttp = new XMLHttpRequest();
	//xhttp.open("GET", url, true);
	var endpoint = "/trending";
	xhttp.open("GET",endpoint);
	xhttp.setRequestHeader("count",n);
	n+=1;
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.readyState);
			console.log(xhttp.status);
			//console.log(xhttp.responseText);
			q = JSON.parse(xhttp.responseText);
			insertGif(q);

		};
	};
};



function createGfy() {
console.log("hi" );

	var url = "https://www.youtube.com/watch?v=DekuSxJgpbY";//$("#urlInput").val();
	duration = "10";//$("#stopInput").val();
	start = "5"//$("#startInput").val();
	console.log("hi" + url + ".." + duration + ".." + start + "..");

	var xhttp = new XMLHttpRequest();
	//xhttp.open("GET", url, true);
	var endpoint = "/uploadurl";
	xhttp.open("POST",endpoint);
	xhttp.setRequestHeader("url",url);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.readyState);
			console.log(xhttp.status);
			//console.log(xhttp.responseText);
			q = JSON.parse(xhttp.responseText);
			var gn = q.gfyname;
			console.log(gn);
			checkingStatus(gn);
    };
  };
};


function getYT(url){
	yt_URL = url;
	var xhttp = new XMLHttpRequest();
	//xhttp.open("GET", url, true);
	var endpoint = "/videourl";
	xhttp.open("GET",endpoint);
	xhttp.setRequestHeader("url",url);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.readyState);
			console.log(xhttp.status);
			//console.log(xhttp.responseText);
			q = JSON.parse(xhttp.responseText);
			console.log(q);
			setVideoUrl(q.url);
			return q.url;

		};
	};
};

function test(text){
	console.log(this);
}
var checkingStatus = function(n){

	checking = window.setInterval(function(){
		console.log("yo");
		getGfy(n);
	}, 3000);

}


function getGfy(n){
	var xhttp = new XMLHttpRequest();
	//xhttp.open("GET", url, true);
	var endpoint = "https://api.gfycat.com/v1/gfycats/" + n;
	xhttp.open("GET",endpoint, true);
	//xhttp.setRequestHeader("name", n);

	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.readyState);
			console.log(xhttp.status);
			//console.log(xhttp.responseText);
			q = JSON.parse(xhttp.responseText);
			console.log(q);

		};
	};
};


var group1=[];
var group2=[];

function insertGif(gfy){
	c1='<tr><img src="'+gfy.gifUrl+'" /></tr>'
	document.getElementById("column1").innerHTML= c1;
}
