$(document).ready(function(){
    
    // Cache the Window object
    $window = $(window);
    
    // Set the min-height of each section to the window's height
    //var windowHeight = setSectionMinHeight();
    setSectionMinHeight();
    
    $(window).resize(function(){
        //windowHeight = setSectionMinHeight();
        setSectionMinHeight();
    });
    
    
    // Cache the Y offset and the speed of each sprite
    $('[data-type]').each(function() {
        $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
        $(this).data('speed', $(this).attr('data-speed'));
    });
    
    
    $('[data-fade="true"]').each(function(){
        
        decorationFade($(this));
        
    }); // each data-type
    
    
    $('[data-slide="to-left"]').each(function(){
        
        slideToLeft($(this));
        $(this).addClass('HERE');
    }); // each data-type
    
    
    $('[data-slide="to-right"]').each(function(){
        
        slideToRight($(this));
        
    }); // each data-type
    
    
    $('[data-pin="true"]').each(function(){
        
        pinDecoration($(this));
        $(this).addClass('HERE-2');
        
    }); // each data-type
    
    // For each element that has a data-type attribute
    $('section[data-type="background"]').each(function(){
    
        // Store some variables based on where we are
        var $self = $(this),
            offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;
        
        $(window).scroll(function(){
        
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
            
                // Scroll the background at var speed
                // the yPos is a negative value because we're scrolling it UP!
                var yPos = -($window.scrollTop() / $self.data('speed'));
              
                // If this element has a Y offset then add it on
                if ($self.data('offsetY')) {
                    yPos += $self.data('offsetY');
                }
              
                // Put together our final background position
                var coords = '50% '+ yPos + 'px';
              
                // Move the background
                $self.css({ backgroundPosition: coords });
                
            }; // in view
            
        }); // window scroll
    
    });	// each data-type

    function setSectionMinHeight() {
        var windowHeight = $(window).height();
        
        $('[data-full-height="true"]').css('min-height', windowHeight);
        
        //return windowHeight;
    }
    
    function decorationFade($self) {
        
        // Store some variables based on where we are
        var offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;
        
        $(window).scroll(function(){
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
                
                //var selfOpacity = 1 - (($self.offset().top - $window.scrollTop()) / ($window.height() / 100)) / 100;
                
                $self.css('opacity', 1 - (($self.offset().top - $window.scrollTop()) / ($window.height() / 100)) / 100);
                
            } // in view
            
        }); // window scroll
        
    }
    
    function slideToLeft($self) {
        
        // Store some variables based on where we are
        var offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;
        
        $(window).on('scroll resize', function(){
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
                
                if (($self.offset().top - $window.scrollTop()) > 0) {
                    
                    // shifting in percentage of window width plus block width
                    // and discending from 100% to 50%
                    var selfLeftPosition = ($(window).width() / 2) + (($(window).width() / 2) + ($self.width() / 2)) * (($self.offset().top - $window.scrollTop()) / ($window.height()));
                    
                }
                $self.css('left', selfLeftPosition + 'px');
                
            } // in view
            
        }); // window scroll
        
    }
    
    function slideToRight($self) {
        
        // Store some variables based on where we are
        var offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;
        
        $(window).on('scroll resize', function(){
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
                
                if (($self.offset().top - $window.scrollTop()) > 0) {
                    
                    // shifting in percentage of window width plus block width
                    var selfLeftPosition = - ($(window).width() / 2) + (($(window).width() / 2) + ($self.width() / 2)) * (($self.offset().top - $window.scrollTop()) / ($window.height()));
                }
                $self.css('left', - selfLeftPosition + 'px');
                
            } // in view
            
        }); // window scroll
        
    }
    
    function pinDecoration($self) {
        
        // Store some variables based on where we are
        var offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;
        
        $(window).on('scroll', function(){
            
                if ($self.attr('data-top-offset') == undefined) {
                    $self.attr('data-top-offset', parseInt($self.css('top')));
                }
                
                var dataTopOffset = parseInt($self.attr('data-top-offset'));
                
                //if ($self.offset().top < parseInt($self.attr('data-top-offset')) + $window.height()) {
                if ($window.scrollTop() + dataTopOffset < parseInt($self.attr('data-top-offset')) + $self.closest('[data-page-has-pin="true"]').outerHeight()) {
                    
                    //console.log($self.offset().top);
                    
                    $self.css('top', parseInt($self.attr('data-top-offset')) + $window.scrollTop() + 'px');
                }
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
                
                
                
                /*
                if ((($self.offset().top - $window.scrollTop()) > 0) || ($self.offset().top == 0)) {
                    $self.css('position', 'fixed');
                }
                else {
                    $self.css('position', 'absolute');
                }
                
                $self.css
                */
                /*
                if (($self.offset().top - $window.scrollTop()) > 0) {
                    
                    // shifting in percentage of window width plus block width
                    var selfLeftPosition = - ($(window).width() / 2) + (($(window).width() / 2) + ($self.width() / 2)) * (($self.offset().top - $window.scrollTop()) / ($window.height()));
                }
                $self.css('left', - selfLeftPosition + 'px');
                */
                
                
            } // in view
            
        }); // window scroll
    }
    
    function changeBgColor() {
        var s = "#ff0000";
        var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
        var matches = patt.exec(s);
        var rgb = "rgb("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+");";
        alert(rgb);
    }
    
    
    
}); // document ready













/*
$(document).ready(function(){
    //Cache the Window object
    //$window = $(window);
    
    //var windowHeight = $(window).height();
    //alert(wh);
    
    //$(".section-first").css("height", windowHeight + 800);
});
*/


/*
$(document).ready(function() {
  var controller = $.superscrollorama();
  
//(new TimelineLite({onComplete:initScrollAnimations}));
    (new TimelineLite({onComplete:initScrollAnimations}));
    
    function initScrollAnimations() {
        
        var controller = $.superscrollorama();
    
        controller.addTween('.sun', 
            
                    TweenMax.fromTo($('.sun'), .75, 
                        {css:{left: -33, top: -56}}, 
                        {css:{left: -33, top: 200}})
                        
                )

    };
*/

  /*
    controller.addTween('.sun', 
      TweenMax.from($('#fade'),.5,{
        css:{opacity:0}}),
        0, // scroll duration of tween (0 means autoplay)
        200); // offset the start of the tween by 200 pixels

    
    
    controller.addTween(
        '.first-page',
        (new TimelineLite())
            .append([
                TweenMax.To($('.sun'), 1, 
                    {css:{top: 200}, immediateRender:true}),
                TweenMax.To($('.logo'), 1, 
                    {css:{paddingLeft: 200}, immediateRender:true})
            ]),
        5000 // scroll duration of tween
    );
  
    
controller.addTween('.sun', 
    TweenMax.to($('#move-it'), .5, 
        {css:{left: 200}})); 
  
    var pinAnimations = new TimelineLite();
    pinAnimations
        .append([
            TweenMax.to($('.sun'), 5, {css:{top: 500}}),
            TweenMax.to($('.logo'), .5, {css:{paddingLeft: 100}})
        ], .5);
    

});
*/