var q;
var n = 4;
var idCount = 0;
var curTime = 0;
var myVideo = document.getElementById("thevideo");
var duration =
  parseInt(curTime) - parseInt($("#startInput").val() > 15)
    ? 15
    : parseInt(curTime) - parseInt($("#startInput").val());
var isLooping = false;
var start = $("#startInput").val(curTime);
var theLoop; //global
var videoUrl; //the is the source of the raw video;"r---sn...."
var yt_URL; //"youtube.com/..."

$(document).ready(function() {
  $("#gfy-range").defaultValue = 15;
  $("#gfy-range").on("change", function() {
    duration = parseInt($("#gfy-range").val());
    if (!isLooping) {
      isLooping = true;
      startLoop();
    }
    $("#stopInput").val(
      parseInt($("#startInput").val()) + parseInt($("#gfy-range").val())
    );
  });
});

function setVideoUrl(url) {
  videoUrl = url;
  $("#thevideo").attr("src", url);
}

function setStartTime() {
  curTime = Math.floor(document.getElementById("thevideo").currentTime);
  $("#startInput").val(curTime);
  start = curTime;
  console.log(curTime, $("#startInput"), start);
}

function setEndTime() {
  curTime = Math.floor(document.getElementById("thevideo").currentTime);
  if (parseInt(curTime) - parseInt($("#startInput").val() > 15)) {
    $("#stopInput").val(parseInt($("#startInput").val() + 15));
  } else {
    $("#stopInput").val(curTime);
  }
}

function startLoop() {
  theLoop = window.setInterval(function() {
    if (document.getElementById("thevideo").currentTime > start + duration) {
      document.getElementById("thevideo").currentTime = start;
    }
  }, 100);

  return theLoop;
}

function stopLoop() {
  clearInterval(theLoop);
}

/**
 * Gets list of trending gfycat gifs
 */
function getTrending() {
  var xhttp = new XMLHttpRequest();
  var endpoint = "/trending";
  xhttp.open("GET", endpoint);
  xhttp.setRequestHeader("count", n);
  n += 1;
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      q = JSON.parse(xhttp.responseText);
      insertGif(q);
    }
  };
}

/**
 * Checks status of gif upload via fetch to gfycat api
 * @param gifName String
 */
function checkUploadStatus(gifName) {
  const CHECK_STATUS_ENDPOINT =
    "https://api.gfycat.com/v1/gfycats/fetch/status/";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", CHECK_STATUS_ENDPOINT + gifName);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log("check status ready: ", xhttp.readyState);
      console.log(xhttp.status, JSON.parse(xhttp.responseText));
    }
  };
}

/**
 * Initiates gif creation via Post request to Gfycat with video url, start and end times
 */
function createGfy() {
  const url = $("#video-url-input").val();
  start = $("#startInput").val();
  duration = $("#stopInput").val() - $("#startInput").val();

  const xhttp = new XMLHttpRequest();
  const endpoint = "/uploadurl";
  xhttp.open("POST", endpoint);
  xhttp.setRequestHeader("start", start);
  xhttp.setRequestHeader("url", url);
  xhttp.setRequestHeader("duration", duration);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(xhttp.readyState);
      console.log(xhttp.status);
      q = JSON.parse(xhttp.responseText);
      const gifName = q.gfyname;
      status = false;

      // this loop checks too see if gif is ready to fetch from gfycat
      // TODO: Make function that uses the check gfycat endpoint
      // TODO: Create indication for user that Gif is being created
      uploadloop = setInterval(function() {
        checkUploadStatus(gifName);
        console.log("checking");
      }, 3000);
    }
  };
}

var uploadloop;

function getYT(url) {
  url = $("#video-url-input").val();
  yt_URL = url;
  var xhttp = new XMLHttpRequest();
  var endpoint = "/videourl";
  xhttp.open("GET", endpoint);
  xhttp.setRequestHeader("url", url);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      q = JSON.parse(xhttp.responseText);
      var videoURL = q.url;
      setVideoUrl(videoURL);
    }
  };
}

// adds gif to display
function updateImage(gifUrl) {
  const img = $(
    '<video style="width: 700px;" id="gifsID + ' +
      idCount +
      '" loop="loop" autoplay="autoplay"/>'
  ); //Equivalent: $(document.createElement('img'))
  img.attr("src", gifUrl);

  const note = new NoteTemplate();
  cards.push(note);
  note.url = gifUrl;
  reflow();

  idCount++;
  clearInterval(uploadloop);
}

// This function tries to download gif from gfycat when it is ready
function getGfy(n) {
  const xhttp = new XMLHttpRequest();
  const endpoint = "https://api.gfycat.com/v1test/gfycats/" + n;
  xhttp.open("GET", endpoint, true);

  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // gif is downloaded
      q = JSON.parse(xhttp.responseText);
      console.log(JSON.stringify(q));
      status = true;

      // gif is displayed
      updateImage(q.gfyItem.webmUrl);
    }
  };
}

var group1 = [];
var group2 = [];

function insertGif(gfy) {
  c1 = '<tr><img src="' + gfy.gifUrl + '" /></tr>';
  document.getElementById("column1").innerHTML = c1;
}

// Draggable Table Functions
var dragSrcEl = null;

var cards = new Array();

function NoteTemplate() {
  this.index = null;
  this.url = null;
  this.noteText = null;
  this.row = null;
  this.column = null;
}

var cols = document.querySelectorAll(".draggable-element");

function addListeners() {
  cols = document.querySelectorAll(".draggable-element");
  [].forEach.call(cols, function(col) {
    col.addEventListener("dragstart", handleDragStart, false);
    col.addEventListener("dragenter", handleDragEnter, false);
    col.addEventListener("dragover", handleDragOver, false);
    col.addEventListener("dragleave", handleDragLeave, false);
    col.addEventListener("drop", handleDrop, false);
    col.addEventListener("dragend", handleDragEnd, false);
  });
}

function handleDragStart(e) {
  // this / e.target is the source node.
  this.classList.add("fadeOut");

  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over"); // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl !== this) {
    // Set the source column's HTML to the HTML of the column we dropped on.

    var DraggedText = dragSrcEl.querySelector("#txtBox").value;
    var SmashedText = this.querySelector("#txtBox").value;
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");

    this.querySelector("#txtBox").value = DraggedText;
    dragSrcEl.querySelector("#txtBox").value = SmashedText;
  }

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove("fadeOut");
  [].forEach.call(cols, function(col) {
    col.classList.remove("over");
  });
}

function reflow() {
  var tableRef = document.getElementById("our_table");
  tableRef.innerHTML = ""; //Erases the Table

  for (i = 0; i < cards.length; i++) {
    var temp = cards[i];
    var tmpl = document.getElementById("StepTemplate").content.cloneNode(true);
    if (temp.url === "") {
      tmpl.querySelector("#imgBox").outerHTML = "";
      tmpl.querySelector("#txtBox").className = "txtBox-textOnly";
    } else {
      tmpl.querySelector("#imgBox").innerHTML =
        '<video style="width: 100%;" loop="loop" autoplay="autoplay" src=" ' +
        temp.url +
        ' "/>';
      tmpl.querySelector("#txtBox").className = "txtBox";
    }

    tmpl.querySelector("#txtBox").value = temp.noteText;
    tableRef.appendChild(tmpl);
  }
  addListeners();

  //save order of divs
  var orderIndex = tableRef.querySelectorAll(".draggable-element");
}

function saveOrder() {
  //save order of divs
  var orderIndex = document.querySelectorAll(".draggable-element");
}

function clickybutton() {
  var note = new NoteTemplate();
  cards.push(note);
  //note.noteText = "Step: " + (cards.length)
  note.url = document.getElementById("urlInput").value;
  reflow();
}
