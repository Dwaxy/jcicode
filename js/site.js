$(document).ready(function() {
  window.onbeforeunload = function() { window.scrollTo(0, 0); };
  $("document.body").fadeIn(5000, function() {
    console.log("done");
  });

  //display skills -/
  var menuOn = false;

  function showMenu() {
    menuOn = true;
    if ($("#hexHolder").hasClass("shown")) {
      $("#hexHolder").removeClass("shown");
    } else {
      $("#hexHolder").addClass("shown");
    }
    $(".hex").fadeToggle("fast");
  }
  $(".me").click(showMenu);

  $('body').css("overflowY", "scroll");
  $(".menuHolder").css({ "display": "block" });
  $("#menu").css({ "width": "102%" });
  $("#menuBtnOn").css({ "display": "none" });

  //- smoothscroll -//
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      window.location.hash = target;
    });
  });

  // scroll JS
  //Get the windows width
  var windowWidth = $(window).innerWidth();
  $(window).resize(function() {
    //update windowWidth on resize
    windowWidth = $(window).innerWidth();
    if (windowWidth < 744) {
      $('.skillBox-1, .skillBox-3').removeAttr('style');
    }
  });

  if ($('.skillBox-holder').length) {
    // keep track of scroll
    $(window).scroll(function() {
      //Get the current vertical position of the scroll bar
      var wScroll = $(this).scrollTop();

      $('.mainTitle').css({ 'transform': 'translate(0px, ' + -wScroll / 35 + '%)' });
      $('header').css({ 'transform': 'translate(0px, ' + -wScroll / 80 + '%)' });
      if (wScroll > 744 && menuOn === false) {
        $("#hexHolder").addClass("shown");
      }

      // if scrollTop is less than scrollbar position take away window height and if windowWidth is less than 750
      if (wScroll > $('.skillBox-holder').offset().top - $(window).height() && windowWidth > 744) {
        // .scrollTop - skillBox-holder scrollbar position + windows height - 200 (can not be less than 0)
        var offset = Math.min(0, wScroll - $('.skillBox-holder').offset().top + $(window).height() - 200);
        $('.skillBox-1').css({ 'transform': 'translate(' + Math.abs(offset) + 'px, 0px)' });
        $('.skillBox-3').css({ 'transform': 'translate(-' + Math.abs(offset) + 'px, 0px)' });

        //Animation for phone screen size
      } else if (windowWidth < 744) {
        $('.skillBox-1, .skillBox-3').removeAttr('style');
      }
    });
  }
  
  //timeline js
  if ($('#timeline').length) {
    
    var meData = "Take notes on your project and its needs",
      youData = "Tell me all about your project!";
    var windowHeight = $(window).height(),
      //gridTop = windowHeight * .1,
      gridTop = $(".left-container").offset().top - 200
      //gridBottom = windowHeight * .7;
      gridBottom = $(".left-container").offset().top + 600;
    var thisTop;
    
    function getData() {
      $(".hex-stage").each(function() {
        thisTop = $(this).offset().top - $(window).scrollTop();
        if (thisTop > gridTop && (thisTop + $(this).height()) < gridBottom) {
          meData = $(this).find(".me-data").text();
          youData = $(this).find(".you-data").text();
          //$(".content-left > p, .content-right > p").fadeIn("fast");
          //$(".content-left > p, .content-right > p").css({opacity: 1});
          $(".content-left > p").text(youData);
          $(".content-right > p").text(meData);
          $(this)
            .children(".hex-stage-inner")
            .addClass("green-hex");
        } else {
          //$(".content-left > p, .content-right > p").fadeOut("fast");
          //console.log("true");
          $(this)
            .children(".hex-stage-inner")
            .removeClass("green-hex");
          //$(".content-left > p, .content-right > p").css({opacity: 0});
        }
      });
    }
    getData();

    $(window).on("scroll", function() {
      getData();
    });
    
    $(".hex-stage").click(function() {
      var self = $(this);
      var windowHeight = $(window).innerHeight();
      console.log(self.offset().top)
      $('html, body').animate({
        scrollTop: $(self).offset().top - windowHeight / 2.5
      }, 800);
    });
    
  }

  //about.js 
  $(".show-popUp").click(function() {
    $("#toolTip").css({ "display": "none" });
    $(".navPopUp-holder").fadeIn("fast");
    $("body, html").css({ "overflow": "hidden" });
    $(".popUpBox").css({ "top": "40%" });
    $(".show-popUp").css({ "display": "none" });
  });
  $(".popUp-close").click(function() {
    $(".navPopUp-holder").fadeOut("fast");
    $(".show-popUp").css({ "display": "block" });
    $("html").css({ "overflow-y": "scroll" });
    $(".navPopUp-holder").css({ "overflow-y": "none" });
  });

  $(window).scroll(function() {
    $('.block').each(function() {
      if (($(this).offset().top - $(window).scrollTop()) < 20) {
        $(this).stop().fadeTo(100, 0.7);
      } else {
        $(this).stop().fadeTo('fast', 1);
      }
    });

  });

  //workingWIthMe.js

  var meData = "";
  var youData = "";

  var windowWidth = $(window).innerWidth();
  $(window).resize(function() {
    //update windowWidth on resize
    windowWidth = $(window).innerWidth();
  });

  $('.bubble ').mouseenter(function() {

    var el = $(this); // holds the class object //
    var identifier = el.attr('class');
    var offset = el.offset(); // get and hold the position data of el (the current element on hover) //
    meData = $(this).find(".me-data").text();
    youData = $(this).find(".you-data").text();

    //if (windowWidth > 850) { //display toolTip in big view
    $(".left-container, .right-container").css({ "display": "block" });
    placeToolTip(offset.top + 50, offset.left + el.width());
    // } else {
    // get mouse position data on mouse move on a bubble hover
    var mouseX;
    var mouseY;
    $(document).mousemove(function(e) {
      mouseX = e.pageX + 5;
      mouseY = e.pageY + 5;
    });
    $(".bubble").mouseover(function() { // position tooltip with data from mouse //
      $('#toolTip').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');

      $("#m-data").text(meData); //grab data
      $("#y-data").text(youData);
    });
    // }
  });

  // position tooltip with data from mouse enter //
  function placeToolTip(top, left) {
    $('#toolTip').css({
      "display": "block",
      "left": left,
      "top": top
    }).fadeIn('slow');

    $("#m-data").text(meData);
    $("#y-data").text(youData);
  }

  $('.bubble').mouseleave(function() { // hide tooltip on mouse leave //
    $('#toolTip').css({ display: "none" });
  });
  
  //skill page
  if (('.skills-holder').length) {
    var sec = $('.section');
    sec.click(function() {
      sec.attr('active', false);
      $(this).attr('active', true);
    });
  }

});

// hide / show nav menu
var navIn = false;

function menuIn() {
  document.getElementById('menu').style.width = "40px";
  $("#menuBtnOn").fadeToggle("slow");
  navIn = true;
}

function menuOut() {
  if (navIn == false) {
    menuIn();
  } else if (navIn == true) {
    $("#menu").css({ "width": "102%" });
    $("#menuBtnOn").fadeToggle("slow");
  }
}