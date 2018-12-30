var n = 4;
var idCount = 0;
var curTime = 0;
var duration =
  Number(curTime) - Number($("#startInput").val() > 15)
    ? 15
    : Number(curTime) - Number($("#startInput").val());
var start = formatTimeHuman($("#startInput").val(curTime));
var videoUrl; //the is the source of the raw video;"r---sn...."
var yt_URL; //"youtube.com/..."
var uploadloop;

$(document).ready(function() {
  $("#gfy-range").defaultValue = 15;
  $("#gfy-range").on("change", function() {
    duration = Number($("#gfy-range").val());

    let startTimeSeconds = formatTimeSeconds($("#startInput").val());
    $("#stopInput").val(formatTimeHuman(startTimeSeconds + duration));
  });
});

/**
 * Converts number of seconds to human readable format of HH:MM:SS
 * @param {number} seconds number of seconds at current point in video
 * @returns {string} human readable time
 */
function formatTimeHuman(seconds) {
  let time = [0, 0, 0];
  time[1] = Math.floor(seconds / 60);
  time[2] = seconds - time[1] * 60;
  time[0] = Math.floor(time[1] / 60);
  time[1] = time[1] - time[0] * 60;

  return time.map(t => (t === 0 ? "00" : t < 10 ? "0" + t : t)).join(":");
}

/**
 * Converts time from human readable HH:MM:SS to seconds number
 * @param {string} timeHuman HH:MM:SS
 * @returns {number} seconds
 */
function formatTimeSeconds(timeHuman) {
  let t = timeHuman.split(":").map(Number);
  let m = t[0] * 60 + t[1];

  return m * 60 + t[2];
}

/**
 * Sets video url with newly created gif
 * @param url
 */
function setVideoUrl(url) {
  videoUrl = url;
  $("#thevideo").attr("src", url);
}

/**
 * Sets start time
 * Called on button click
 */
function setStartTime() {
  curTime = Math.floor(document.getElementById("thevideo").currentTime);
  $("#startInput").val(formatTimeHuman(curTime));
}

/**
 * Sets end time of video clip to be converted to gif
 * Called on button click
 */
function setEndTime() {
  curTime = Number(Math.floor(document.getElementById("thevideo").currentTime));
  let startTimeSeconds = formatTimeSeconds($("#startInput").val());
  if (curTime - startTimeSeconds > 15) {
    $("#stopInput").val(formatTimeHuman(startTimeSeconds + 15));
  } else {
    $("#stopInput").val(formatTimeHuman(curTime));
  }
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
      console.log(xhttp.status, JSON.parse(xhttp.responseText));
      let responseObj = JSON.parse(xhttp.responseText);
      if (responseObj.task === "complete") {
        getGfy(responseObj.gfyname);
        clearInterval(uploadloop);
        console.log("completed: ", responseObj.gfyname);
      }
    }
  };
}

/**
 * Gets newly created gif from gfycat api and calls updateImage with new url
 * @param {string} name
 */
function getGfy(name) {
  const xhttp = new XMLHttpRequest();
  const endpoint = "https://api.gfycat.com/v1test/gfycats/" + name;
  xhttp.open("GET", endpoint, true);

  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // gif is downloaded
      let responseObj = JSON.parse(xhttp.responseText);
      status = true;

      // gif is displayed
      updateImage(responseObj.gfyItem.webmUrl);
      $("#" + name).remove();
      console.log("removing gif with name: ", name);
    }
  };
}

/**
 * Initiates gif creation via Post request to Gfycat with video url, start and end times
 */
function createGfy() {
  const url = $("#video-url-input").val();
  start = formatTimeSeconds($("#startInput").val());
  duration = formatTimeSeconds($("#stopInput").val()) - start;

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
      const gifName = JSON.parse(xhttp.responseText).gfyname;
      status = false;

      // this loop checks too see if gif is ready to fetch from gfycat
      uploadloop = setInterval(function() {
        checkUploadStatus(gifName);
        console.log("checking, name: ", gifName);
      }, 3000);

      $("#inprogress").append(
        $(
          '<h4 class="inprogress__note" id="' +
            gifName +
            '">Encoding Gif with temporary name "' +
            gifName +
            '"... (this will take a couple minutes)</h4>'
        )
      );
    }
  };
}

/**
 * Sends Get request to backend /videourl endpont with url, to be passed to gfycat api and sends back
 * video url to display on video element
 */
function getYT() {
  console.log("heres getYT ");
  url = $("#video-url-input").val();
  yt_URL = url;
  var xhttp = new XMLHttpRequest();
  var endpoint = "/videourl";
  xhttp.open("GET", endpoint);
  xhttp.setRequestHeader("url", url);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      let responseObj = JSON.parse(xhttp.responseText);
      setVideoUrl(responseObj.url);
    }
  };
}

/**
 * Creates video element with newly created gif url and adds to table
 * @param {string} gifUrl
 */
function updateImage(gifUrl) {
  const note = new NoteTemplate();
  cards.push(note);
  note.url = gifUrl;
  reflow();

  idCount++;
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
      let responseObj = JSON.parse(xhttp.responseText);
      insertGif(responseObj);
    }
  };
}

var group1 = [];
var group2 = [];

function insertGif(gfy) {
  c1 = '<tr><img src="' + gfy.gifUrl + '" /></tr>';
  document.getElementById("column1").innerHTML = c1;
}

// ============================ Draggable Table Functions ============================ //
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
