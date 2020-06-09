$(function(){
	// Pagetop
    $("#pagetop").hide();
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 500) {
            $('#pagetop').fadeIn(400);
            } else {
            $('#pagetop').fadeOut(400);
    	}

        scrollHeight = $(document).height(); 
        scrollPosition = $(window).height() + $(window).scrollTop(); 
        footHeight = $("#footer").innerHeight();
                 
        if ( scrollHeight - scrollPosition  <= footHeight ) {
            $("#pagetop").css({
                "position":"absolute",
                "bottom": "10px"
            });
        } else {
            $("#pagetop").css({
                "position":"fixed",
                "bottom": "40px"
            });
        }
    });	

    // AnchorLink Scroll
    var $anchors = $(" a[href^='#']");
    var $doc     = $('body, html');
    var speed    = 900;
         
    $anchors.each(function(){
      var $anchor   = $(this);
      var anchorID  = $anchor.attr("href");
      var $target   = $(anchorID);
           
      $anchor.click(function(e){
        var targetPositionTop = $target.offset().top;
         
        $doc.stop().animate({
          scrollTop: targetPositionTop
        },
        {
          duration : speed
        });     
        return false;
      });
    });

});
