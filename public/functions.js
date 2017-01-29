

console.log("running");
var q
var n = 4;
var idCount = 0;

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

	var checking = window.setInterval(function(){
		console.log("yo");
		if(true) {
			//getGfy(n) != null
			//q = getGfy(n);
		//	var gifmp4Url = q.gifyItem.mp4Url
      //console.log(JSON.stringify(getGfy(n)));
    // console.log(gifmp4Url);
     //gifyItem.mp4Url
//{"gfyItem":{"gfyId":"dimuntriedgilamonster","gfyName":"DimUntriedGilamonster","gfyNumber":"716881701","webmUrl":"https://zippy.gfycat.com/DimUntriedGilamonster.webm","gifUrl":"https://giant.gfycat.com/DimUntriedGilamonster.gif","mobileUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mobile.mp4","mobilePosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mobile.jpg","miniUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mini.mp4","miniPosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mini.jpg","posterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-poster.jpg","thumb360Url":"https://thumbs.gfycat.com/DimUntriedGilamonster-360.mp4","thumb360PosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-thumb360.jpg","thumb100PosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-thumb100.jpg","max5mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-size_restricted.gif","max2mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-small.gif","max1mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-max-1mb.gif","gif100px":"https://thumbs.gfycat.com/DimUntriedGilamonster-100px.gif","mjpgUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster.mjpg","width":1920,"height":1080,"avgColor":"#000000","frameRate":23,"numFrames":97,"mp4Size":2599459,"webmSize":795189,"gifSize":7173845,"source":8,"createDate":1485702230,"nsfw":5,"mp4Url":"https://fat.gfycat.com/DimUntriedGilamonster.mp4","likes":0,"published":1,"dislikes":0,"extraLemmas":"","md5":"3c00157f66212e72d2d8635fa2b4affd","views":1,"tags":null,"userName":"anonymous","title":"testupload","description":"","languageCategories":null,"url":"https://www.youtube.com/watch?v=DekuSxJgpbY","domainWhitelist":[]}}


			var img = $('<video id="gifsID + ' + idCount + '" loop="loop" autoplay="autoplay"/>'); //Equivalent: $(document.createElement('img'))
      img.attr('src', gifmp4Url);
      img.appendTo('#imageDiv');
			idCount++;
			//clearInterval(checking);






		} else {
			console.log("Processing...");
		}
	}, 3000);
	clearInterval(checking);

}


function getGfy(n){
	var xhttp = new XMLHttpRequest();
	//xhttp.open("GET", url, true);
	var endpoint = "https://api.gfycat.com/v1test/gfycats/" + n;
	xhttp.open("GET",endpoint, true);
	//xhttp.setRequestHeader("name", n);

	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.readyState);
			console.log(xhttp.status);
			//console.log(xhttp.responseText);
			q = JSON.parse(xhttp.responseText);
			console.log(JSON.stringify(q));
			return JSON.stringify(q);

		} else {
			return false;
		}
	};
};


var group1=[];
var group2=[];

function insertGif(gfy){
	c1='<tr><img src="'+gfy.gifUrl+'" /></tr>'
	document.getElementById("column1").innerHTML= c1;
}
