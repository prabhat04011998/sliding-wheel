      $(function(){
  var l,t,r,x1,y1;
  var angle = 0;
  var $bigWheel = $(".big-wheel");
  var $smallWheel = $(".small-wheel");
  var $slides = $(".wheel-slider ul.slides li");
  var $activeSlide = $(".slides li.active");
  var moveInt,bigInt;

  // $(".textChange").css({
  //   backgroundImage : "url(" + $activeSlide.find("img").attr("src") + ")"  
  // });
 var get_html = $(this).find(".text").html(); // get active slide caption text/html
 $(".textChange").html(get_html);
  var slidesCount = $slides.length;
  var slidePosStep = 360 / slidesCount;
  var slideAngle = 0;
  var $slide = $slides[0];
  $slides.each(function(){
    $(this).css({
      backgroundImage : "url(" + $(this).find("img").attr("src") + ")"
    });
  });
   $(".small-wheel").css({
      backgroundImage : "url(" + $(this).find("img").attr("src") + ")"
    });
   $(".mainContent").css({
    backgroundImage : "url(" + $activeSlide.find("img").attr("src") + ")" 

  });

  $(window).resize(function(){
    var w = $(this).width();
    var h = $(this).height();
    var bigWheelW = Math.round(w * 0.5);
    r = Math.round(bigWheelW) / 2;
    x1 = r;
    y1 = r;
    $bigWheel.css({
      width : bigWheelW + "px",
      height : bigWheelW + "px"
    });
    var smallWheelW = Math.round(bigWheelW * 0.6);
    var slideW = Math.round(bigWheelW * 0.25);
    $smallWheel.css({
      width : smallWheelW + "px",
      height : smallWheelW + "px"
    });
    $slides.css({
      width : slideW + "px",
      height : slideW + "px"
    });
    $slides.each(function(){
      var slideL = x1 + r * Math.cos(slideAngle * Math.PI / 180);
      var slideT = y1 + r * Math.sin(slideAngle * Math.PI / 180);
      $(this).css({
        left : slideL + "px",
        top : slideT + "px"
      });
      $(this).data("x1",slideL).data("y1",slideT);
      $(this).data("slideAngle",slideAngle);
    $(this).data("slideAngleStatic",slideAngle);
      slideAngle += slidePosStep;
    });
    //alert(bigWheelW);
    if(bigInt){
     clearInterval(bigInt);
     }
   if(moveInt){
     clearInterval(moveInt);
     } 
     function nextSlide(){
       console.log("pikachu");
  
  moveInt = setInterval(function(){
    
    $slides.each(function(){
      var angle = $(this).data("slideAngle");
      if($($(".slides li")[0]).data("slideAngle") >= $($(".slides li")[1]).data("slideAngleStatic")){
         clearInterval(moveInt);
        $(this).data("slideAngleStatic",$(this).data("slideAngle"));
        $activeSlide = $(".slides li.active");
        $activeSlide.removeClass("active");
        var $newActiveSlide = $activeSlide.next();
        
        if($newActiveSlide.length === 0){
          
          $newActiveSlide = $(".slides li:first");
        }
        $newActiveSlide.addClass("active");
        
         var get_html = $newActiveSlide.find(".text").html(); // get active slide caption text/html
        console.log("nikachu",get_html);
 $(".textChange").html(get_html);
          $(".small-wheel").css({
    backgroundImage : "url(" + $newActiveSlide.find("img").attr("src") + ")"  
  });
          $(".mainContent").css({
    backgroundImage : "url(" + $newActiveSlide.find("img").attr("src") + ")" 

  });
         }
      
    angle += 5;
      $(this).data("slideAngle",angle);
      
      l = x1 + r * Math.cos(angle * Math.PI / 180);
    t = y1 + r * Math.sin(angle * Math.PI / 180);
      $(this).css({
     left : l + "px",
     top : t + "px"
   });
    });
  },1);
  } 

    $(".big-wheel").click(function(){
   nextSlide();
});
    
  }).resize();
  
});