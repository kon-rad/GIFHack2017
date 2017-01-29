

console.log("running");
var q
var n = 4;
var idCount = 0;

var myVideo = document.getElementById("thevideo");

var duration = 15;
var isLooping = false;
var start = 0;
var curTime;


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
$( document ).ready(function() {
	$('#gfy-range').defaultValue = 15;
	$('#gfy-range').on('change', function(){
			$("#stopInput").val(parseInt($("#startInput").val()) + parseInt($('#gfy-range').val()));
	});
});

function setVideoUrl(url){
	console.log(myVideo);
	videoUrl = url;
	$("#thevideo").attr("src",url);
	//myVideo.src=videoUrl;
}

function setStartTime(){

		curTime = Math.floor(document.getElementById("thevideo").currentTime);
		console.log(curTime)
		$("#startInput").val(curTime);
}

function setEndTime(){
	curTime = Math.floor(document.getElementById("thevideo").currentTime);
	console.log(parseInt(curTime) + " and " + parseInt($("#startInput").val() ))
	if (parseInt(curTime) - parseInt($("#startInput").val() > 15)){
				$("#stopInput").val(parseInt($("#startInput").val() + 15));
	} else {
		$("#stopInput").val(curTime);
	}
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
	//https://www.youtube.com/watch?v=s70-Vsud9Vk&index=2&list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV
	url = $("#video-url-input").val();
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
			console.log(q.url);
			var videoURL = q.url;
			setVideoUrl(videoURL);
			//return q.url;

		};
	};
};


function test(text){
	console.log(this);
}
var checkingStatus = function(n){

	var checking = window.setInterval(function(){
		console.log("yo");
		if(getGfy(n)) {
		///	getGfy(n) != null
			q = getGfy(n);
			var gifwebMUrl = q.gfyItem.webmUrl
      console.log(JSON.stringify(getGfy(n)));
    console.log(gifwebMUrl);
     gfyItem.gifwebMUrl;
//{"gfyItem":{"gfyId":"dimuntriedgilamonster","gfyName":"DimUntriedGilamonster","gfyNumber":"716881701","webmUrl":"https://zippy.gfycat.com/DimUntriedGilamonster.webm","gifUrl":"https://giant.gfycat.com/DimUntriedGilamonster.gif","mobileUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mobile.mp4","mobilePosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mobile.jpg","miniUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mini.mp4","miniPosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-mini.jpg","posterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-poster.jpg","thumb360Url":"https://thumbs.gfycat.com/DimUntriedGilamonster-360.mp4","thumb360PosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-thumb360.jpg","thumb100PosterUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster-thumb100.jpg","max5mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-size_restricted.gif","max2mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-small.gif","max1mbGif":"https://thumbs.gfycat.com/DimUntriedGilamonster-max-1mb.gif","gif100px":"https://thumbs.gfycat.com/DimUntriedGilamonster-100px.gif","mjpgUrl":"https://thumbs.gfycat.com/DimUntriedGilamonster.mjpg","width":1920,"height":1080,"avgColor":"#000000","frameRate":23,"numFrames":97,"mp4Size":2599459,"webmSize":795189,"gifSize":7173845,"source":8,"createDate":1485702230,"nsfw":5,"mp4Url":"https://fat.gfycat.com/DimUntriedGilamonster.mp4","likes":0,"published":1,"dislikes":0,"extraLemmas":"","md5":"3c00157f66212e72d2d8635fa2b4affd","views":1,"tags":null,"userName":"anonymous","title":"testupload","description":"","languageCategories":null,"url":"https://www.youtube.com/watch?v=DekuSxJgpbY","domainWhitelist":[]}}


			var img = $('<video id="gifsID + ' + idCount + '" loop="loop" autoplay="autoplay"/>'); //Equivalent: $(document.createElement('img'))
      img.attr('src', gifwebMUrl);
      img.appendTo('#imageDiv');
			idCount++;
			clearInterval(checking);






		} else {
			console.log("Processing...");
		}
	}, 3000);


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
			return true;

			//return JSON.stringify(q);

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





// Draggable Table Functions

var dragSrcEl = null;

var cards = new Array;
function noteTemplate () {
	this.url = null;
	this.noteText = null;
	this.row = null;
	this.column=null;
};

var cols = document.querySelectorAll('#draggable-element');
function addListeners () {
cols = document.querySelectorAll('#draggable-element');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});
//autosize(document.querySelectorAll('textarea'));
}

function handleDragStart(e) {
// this / e.target is the source node.
    this.classList.add('fadeOut');

    dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.

	var DraggedText = dragSrcEl.querySelector('#txtBox').value
	var SmashedText = this.querySelector('#txtBox').value
	dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');

	this.querySelector('#txtBox').value = DraggedText;
	dragSrcEl.querySelector('#txtBox').value = SmashedText;
  }

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
	this.classList.remove('fadeOut');
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

function reflow () {
	var tableRef = document.getElementById('our_table');
	tableRef.innerHTML = "";

	for (i=0; i<cards.length; i++) {
		var temp = cards[i];
		var tmpl = document.getElementById('StepTemplate').content.cloneNode(true);
		var newRow = tableRef.insertRow(tableRef.rows.length);
		if (temp.url =="") {
		tmpl.querySelector('#imgBox').outerHTML = ""
		tmpl.querySelector('#txtBox').className="txtBox-textOnly";
		} else
		{
		tmpl.querySelector('#imgBox').innerHTML = '<img draggable="false" src=" ' + temp.url + ' "></img>'
		tmpl.querySelector('#txtBox').className="txtBox";
		}

		tmpl.querySelector('#txtBox').value = temp.noteText;
		newRow.appendChild (tmpl);
	}

	addListeners();
}

function clickybutton() {
	var note = new noteTemplate;
	cards.push(note);
	note.noteText = "Step: " + (cards.length)
	note.url = document.getElementById('urlInput').value;
	reflow();
}
