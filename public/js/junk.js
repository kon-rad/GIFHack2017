// // $( document ).ready(function() {
//
// (function($, document, window){
//
//   var URLS = [
//     'https://vimeo.com/88829079'
//   ];
//
//   var DATA = [];
//
//   var player = null,
//     duration = 0,
//     index = 0;
//
//   //Display the embed.
//   var display = function(obj, autoplay){
//     var ratio = ((obj.height/obj.width)*100).toPrecision(4) + '%';
//     var $div = $('<div class="flex-video"><span id="caption"></span></div>');
//     $('#result').empty();
//     $div.append(obj.html);
//     $div.css('padding-bottom', ratio);
//     $('#result').append($div);
//
//     // Set up the player.
//     player = new playerjs.Player($('iframe')[0]);
//     player.on('ready', function(){
//       player.unmute();
//
//       player.getDuration(function(d){
//         duration = d;
//       });
//
//       if (autoplay){
//         player.play();
//       }
//     });
//
//     var $meter = $('.meter'),
//       $duration = $('.duration'),
//       $currentTime = $('.current-time');
//
//     // Set up the timeupdate to move the meter.
//     player.on('timeupdate', function(data){
//       $meter.css('width', ((data.seconds/data.duration) * 100) + '%');
//       $duration.text(data.duration.toFixed(1));
//       $currentTime.text(data.seconds.toFixed(1));
//     });
//   };
//
//   $(document).on('ready', function(){
//
//     // Go get the embed code from Embedly.
//     $.embedly.oembed(URLS)
//       .progress(function(obj){
//         display(obj, true);
//       });
//
//     // Set up the progress bar are the top of the page.
//     var $progress = $('.progress'),
//       $duration = $('.duration'),
//       $currentTime = $('.current-time');
//
//     // On progress click, seek to a position.
//     $progress.on('click', function(e){
//       var percent = ((e.pageX-$progress.offset().left)/$progress.width());
//       var seek = percent*duration;
//       $('.meter').css('width', percent*100 + '%');
//       player.setCurrentTime(seek);
//     });
//
//     // Set up the expand animation.
//     var animateUp = function(){
//       $(this).animate({
//         height:5,
//         duration:10
//       }, function(){
//         $progress.removeClass('open');
//         $progress.one('mouseenter', animateDown);
//       });
//     };
//
//     var animateDown = function(){
//       $(this).animate({
//         height:20,
//         duration:10
//       }, function(){
//         $progress.addClass('open');
//         $progress.one('mouseleave', animateUp);
//       });
//     };
//
//     $progress.one('mouseenter', animateDown);
//   });
//
// })(jQuery, document, window);
//
// });







<div class="contain-to-grid sticky">
    <nav class="top-bar" data-topbar data-options="sticky_on: large">
      <ul class="title-area">
        <li class="name">
          <h1><a href="/">Player.js</a></h1>
        </li>
        <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
      </ul>
      <section class="top-bar-section">
        <ul class="right">
          <li ><a href="https://github.com/embedly/player.js"><i class="fa fa-github"></i> Code</a></li>
          <li class="has-dropdown">
            <a href="#">Demos</a>
            <ul class="dropdown">
              <li><a href="/article.html">Article</a></li>
              <li><a href="/progress.html">Progress</a></li>
              <li><a href="/captions.html"> Captions</a></li>
              <li><a href="/scroll.html">Scroll</a></li>
              <li><a href="/resume.html">Resume</a></li>
              <li><a href="/music.html">Music</a></li>
              <li><a href="/soundboard.html">Soundboard</a></li>
            </ul>
          </li>
        </ul>
      </section>
    </nav>
  </div>

  <div class="progress">
    <span class="meter">
      <span class="current-time"></span>
    </span>
    <span class="duration"></span>
  </div>

  <div class="row content">
    <div class="large-4 columns">
      <h1>Progress</h1>
      <p>
        It's somewhat common to give users a slight visual cue of how long they have been watching a video and how long they have to go.
      </p>
      <p>
        You'll notice above a progress bar moving to the right. If you hover over it, you will see time information.
      </p>
      <p>
        <a class="button" target="_blank" href="https://github.com/embedly/player.js/blob/gh-pages/scripts/progress.js">Code</a>
        <a class="button" target="_blank" href="https://github.com/embedly/player.js/blob/gh-pages/progress.html">HTML</a>
      </p>
    </div>
    <div class="large-8 columns">
      <div id="result"></div>
    </div>
  </div>


  <link href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/css/foundation.min.css' rel='stylesheet' type='text/css'>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/js/foundation.js"></script>
  <script src="http://cdn.embed.ly/jquery.embedly-3.1.1.min.js"></script>
  <script type="text/javascript" src="http://cdn.embed.ly/player-0.0.12.min.js"></script>
  <script src="js/progress.js"></script>
  <script>
    $.embedly.defaults.key = '3ee528c9eb4b4908b268ce1ace120c92';
    $(document).foundation();
  </script>


      </div>

    </div>

  </div>



</div>



<script>
  (function(w, d){
   var id='embedly-platform', n = 'script';
   if (!d.getElementById(id)){
     w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
     var e = d.createElement(n); e.id = id; e.async=1;
     e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
     var s = d.getElementsByTagName(n)[0];
     s.parentNode.insertBefore(e, s);
   }
  })(window, document);
</script> -->
