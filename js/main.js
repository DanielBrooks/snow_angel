/*
 * 
 *
 *
 */


$(document).ready(function(){
    
    // Cache the Window object
    $window = $(window);
    var pageOrder = 0;
    
    // Set the min-height of each section to the window's height
    setSectionMinHeight();
    
    $(window).resize(function(){
        setSectionMinHeight();
    });
    
    
    // Cache the Y offset and the speed of each sprite
    $('[data-type]').each(function() {
        $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
        $(this).data('speed', $(this).attr('data-speed'));
    });
    
    
    $('[data-type="page"]').each(function() {
        
        $(this).attr('data-page-order', ++pageOrder);
        
    });
    
    $('[data-type="page"]').each(function() {
        
        $(this).data('page-order', parseInt($(this).attr('data-page-order')));
        
    });
    
    
    $('[data-position-bottom]').each(function() {
        
        $(this).data('bottom-shift', parseInt($(this).attr('data-position-bottom')));
        
        setPositionBottom($(this));
        
    });
    
    
    $('[data-require-position="true"]').each(function() {
        
        setPositionData($(this));
        
    }); // each data-type
    
    
    $('[data-require-position="true"]').each(function() {
        
        $(this).data('top-shift', parseInt($(this).attr('data-top-shift')));
        $(this).data('top-offset', parseInt($(this).attr('data-top-offset')));
        
    });
    
    
    $('[data-circle-bg]').each(function() {
        
        $(this).data('speed', $(this).attr('data-speed'));
        
    });
    
    
    $('[data-fade="in"]').each(function() {
        
        decorationFadeIn($(this));
        
    }); // each data-type
    
    
    $('[data-fade="out"]').each(function() {
        
        decorationFadeOut($(this));
        
    }); // each data-type
    
    
    $('[data-slide="to-left"]').each(function() {
        
        slideToLeft($(this));
        
    }); // each data-type
    
    
    $('[data-slide="to-right"]').each(function() {
        
        slideToRight($(this));
        
    }); // each data-type
    
    
    $('[data-slide-double="to-left"]').each(function() {
        
        slideDoubleToLeft($(this));
        
    }); // each data-type
    
    
    $('[data-pin="true"]').each(function() {
        
        pinDecoration($(this));
        
    }); // each data-type
    
    
    $('[data-pin-on-top="true"]').each(function() {
        
        $(this).data('pin-distance', parseInt($(this).attr('data-pin-distance')));
        
        pinOnTop($(this));
        
    }); // each data-type
    
    
    $('[data-bg-color-change="true"]').each(function() {
        
        $(this).data('color-start', $(this).attr('data-color-start').toUpperCase());
        $(this).data('color-stop', $(this).attr('data-color-stop').toUpperCase());
        
        changeBgColor($(this));
    });
    
    
    $('[data-bg-color-change="false"]').each(function() {
        
        $(this).data('color-start', $(this).attr('data-color-start').toUpperCase());
        
        staticBgColor($(this));
    });
    
    
    $('.nav a').click(function(e) {
        
        makeAnchor(e, $(this));
        
    });
    
    
    $('.anchor').each(function() {
        
        var $self = $(this);
        
        $window.scroll(function() {
            
            if ( ($window.scrollTop() + $window.height()) > ($self.offset().top) &&
            ( ($self.offset().top + $self.height()) > $window.scrollTop() ) ) {
                
                $('.nav li').removeClass('active');
                $('.nav').find('a[href="#' + $self.attr('name') + '"]').closest('li').addClass('active');
                
            }
            
        });
        
    });
    
    
    $('[data-circle-bg="to-left"]').each(function() {
        
        circleToLeft($(this));
        
    });
    
    
    $('[data-circle-bg="to-right"]').each(function() {
        
        circleToRight($(this));
        
    });
    
    
    $('[data-jumping="true"]').each(function() {
        
        $(this).data('speed', $(this).attr('data-speed'));
        $(this).data('distance', $(this).attr('data-distance'));
        
        jumpingDecoration($(this));
        
    });
    
    
    $('[data-sparkling="true"]').each(function() {
        
        $(this).data('speed', $(this).attr('data-speed'));
        $(this).data('depth', $(this).attr('data-depth'));
        
        sparklingDecoration($(this));
        
    });
    
    
    // For each element that has a data-type attribute
    $('section[data-type="background"]').each(function() {
    
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
        
        $('[data-full-height="true"]').each(function() {
            
            $(this).css('min-height', windowHeight - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom')));
            
        });
        
    }
    
    function decorationFadeIn($self) {
        
        // Store some variables based on where we are
        var dataTopOffset = $self.data('top-offset');
        
        $(window).scroll(function(){
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                $self.css('opacity', 1 - ((dataTopOffset - $window.scrollTop()) / ($window.height() / 100)) / 100);
                
            } // in view
            
        }); // window scroll
        
    }
    
    function decorationFadeOut($self) {
        
        // Store some variables based on where we are
        var dataTopOffset = $self.data('top-offset');
        
        $(window).scroll(function(){
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                $self.css('opacity', ((dataTopOffset - $window.scrollTop()) / ($window.height() / 100)) / 100);
                
            } // in view
            
        }); // window scroll
        
    }
    
    function slideToLeft($self) {
        
        // Store some variables based on where we are
        var dataTopShift = $self.data('top-shift'),
            dataTopOffset = $self.data('top-offset') - dataTopShift,
            percent = 0;
        
        $(window).on('scroll resize', function(){
            
            if ( $window.scrollTop() < dataTopOffset ) {
                
                percent = 1;
            }
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                if ((dataTopOffset - $window.scrollTop()) >= 0) {
                    
                    percent = ((dataTopOffset - $window.scrollTop()) / $window.height());
                }
                
            } // in view
            
            if ( $window.scrollTop() > dataTopOffset ) {
                
                percent = 0;
            } 
            
            //var percentWidth = (($(window).width() / 2) + (($self.width()) / 2)) * percent;
            var selfLeftPosition = ($(window).width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent;
            
            $self.css('left', selfLeftPosition + 'px');
            
        }); // window scroll
        
    }
    
    function slideDoubleToLeft($self) {
        
        // Store some variables based on where we are
        var dataTopShift = $self.data('top-shift'),
            dataTopOffset = $self.data('top-offset') - dataTopShift,
            pagePrevHeight = $self.closest('[data-type="page"]').prev('[data-type="page"]').outerHeight(),
            pageHeight = $self.closest('[data-type="page"]').outerHeight(),
            percent = 0;
        
        $(window).on('scroll resize', function(){
            
            if ( $window.scrollTop() < dataTopOffset - pagePrevHeight ) {
                
                percent = 1;
            }
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset - pagePrevHeight) &&
            ( (dataTopOffset + pageHeight + $self.height()) > $window.scrollTop() ) ) {
                
                if ((dataTopOffset + pageHeight - $window.scrollTop()) >= 0) {
                    
                    percent = ((dataTopOffset + pageHeight - $window.scrollTop()) / (pageHeight + pagePrevHeight));
                }
                
            } // in view
            
            if ( $window.scrollTop() > dataTopOffset + pageHeight) {
                
                percent = 0;
            } 
            
            
            //var percentWidth = (($(window).width() / 2) + (($self.width()) / 2)) * percent;
            var selfLeftPosition = ($window.width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent + ($window.width() * percent);
            
            $self.css('left', selfLeftPosition + 'px');
            
        }); // window scroll
        
    }
    
    function slideToRight($self) {
        
        // Store some variables based on where we are
        var dataTopShift = $self.data('top-shift'),
            dataTopOffset = $self.data('top-offset') - dataTopShift,
            percent = 0;
        
        $(window).on('scroll resize', function(){
            
            if ( $window.scrollTop() < dataTopOffset ) {
                
                percent = 1;
            }
            
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                if ((dataTopOffset - $window.scrollTop()) >= 0) {
                    
                    percent = ((dataTopOffset - $window.scrollTop()) / $window.height());
                }
                
            } // in view
            
            if ( $window.scrollTop() > dataTopOffset ) {
                
                percent = 0;
            } 
            
            //var percentWidth = (($(window).width() / 2) + (($self.width()) / 2)) * percent;
            var selfLeftPosition = - ($(window).width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent;
            
            $self.css('left', - selfLeftPosition + 'px');
            
        }); // window scroll
        
    }
    
    function pinDecoration($self) {
        
        // Store some variables based on where we are
        var dataTopShift = $self.data('top-shift'),
            closestPageOffset = $self.closest('[data-type="page"]').offset().top;
        
        $(window).on('scroll', function() {
            
            if ( ( closestPageOffset <= $window.scrollTop()) &&
                ($window.scrollTop() <= closestPageOffset + $self.closest('[data-type="page"]').outerHeight()) ) {
                
                $self.css('top', dataTopShift + $window.scrollTop() - closestPageOffset);
                
            }
            
            /*
            if ( $window.scrollTop() > closestPageOffset + $self.closest('[data-type="page"]').outerHeight() ) {
                
                $self.css('top', dataTopShift + $self.closest('[data-type="page"]').outerHeight());
            }
            */
            
        }); // window scroll
    }
    
    function pinOnTop($self) {
        
        // Store some variables based on where we are
        var dataTopShift = $self.data('top-shift'),
            dataTopOffset = $self.data('top-offset'),
            
            dataPinDistance = $self.data('pin-distance') - 1,
            distance = 0,
            
            startPage = $self.closest('[data-type="page"]').data('page-order') - 1,
            stopPage = startPage + dataPinDistance,
            
            startPageOffset = $('[data-page-order="' + startPage + '"]').offset().top;
        
        
        //console.log(dataPinDistance == NaN);
        if ( dataPinDistance == 1 ) {
            
            //distance = $self.closest('[data-page-has-pin="true"]').prev('[data-type="page"]').outerHeight();
            
        }
        
            
            for ( var i = startPage; i <= stopPage; i++) {
                
                distance = distance + $('[data-page-order="' + i + '"]').outerHeight();
                //console.log(distance);
            }
            
        
        //console.log(distance);
        
        $(window).on('scroll', function(){
            
            if ( $window.scrollTop() < distance ) {
                
                //$self.css('top', $window.scrollTop() - dataTopOffset + (dataTopShift * 2));
                
            }
            
            if ( ($window.scrollTop() > startPageOffset) &&
                ($window.scrollTop() <  startPageOffset + distance) ) {
                
                $self.css('top', $window.scrollTop() - dataTopOffset + (dataTopShift * 2));
                
            }
            
        }); // window scroll
        
    }
    
    function changeBgColor($self) {
        var start = $self.data('color-start'),
            stop = $self.data('color-stop'),
            
            dataTopOffset = $self.data('top-offset'),
            
            patt = /([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/,
            
            matchesStart = patt.exec(start),
            matchesStop = patt.exec(stop),
            
            rStep = (parseInt(matchesStart[1], 16) - parseInt(matchesStop[1], 16)) / 100,
            gStep = (parseInt(matchesStart[2], 16) - parseInt(matchesStop[2], 16)) / 100,
            bStep = (parseInt(matchesStart[3], 16) - parseInt(matchesStop[3], 16)) / 100;
        
        
        $(window).on('scroll', function(){
            
            
            if ( (($window.scrollTop() - dataTopOffset) <= $self.outerHeight()) &&
                (($window.scrollTop() - dataTopOffset) >= 0) ) {
                
                var percent = Math.round((($window.scrollTop() - dataTopOffset) / $self.outerHeight()) * 100);
                
                var rgb = 'rgb(' + (parseInt(matchesStart[1], 16) - Math.round(rStep * percent)) + ','
                + (parseInt(matchesStart[2], 16) - Math.round(gStep * percent)) + ','
                + (parseInt(matchesStart[3], 16) - Math.round(bStep  * percent)) + ')';
                
                $self.closest('.section').attr('style', 'background-color:' + rgb);
            }
            
        }); // window scroll
        
    }
    
    function staticBgColor($self) {
        
        var start = $self.data('color-start'),
            
            dataTopOffset = $self.data('top-offset'),
            
            patt = /([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/,
            
            matchesStart = patt.exec(start);
            
        
        $(window).on('scroll', function(){
            
            if ( $window.scrollTop() > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) < ($window.scrollTop() + $window.height()) ) ) {
                
                var rgb = 'rgb(' + parseInt(matchesStart[1], 16) + ','
                + parseInt(matchesStart[2], 16) + ','
                + parseInt(matchesStart[3], 16) + ')';
                
                $self.closest('.section').attr('style', 'background-color:' + rgb);
            }
            
        }); // window scroll
        
    }
    
    function setPositionBottom($self) {
        
        var bottomShift = $self.data('bottom-shift');
        
        $self.css('top', $self.closest('[data-type="page"]').outerHeight() - $self.height() - bottomShift);
        
    }
    
    function setPositionData($self) {
        
        if ($self.attr('data-top-shift') == undefined) {
            $self.attr('data-top-shift', parseInt($self.css('top')));
        }
        
        if ($self.attr('data-top-offset') == undefined) {
            $self.attr('data-top-offset', parseInt($self.offset().top));
        }
    }
    
    function circleToLeft($self) {
        
        // Store some variables based on where we are
        var dataTopOffset = $self.data('top-offset'),
            dataSpeed = $self.data('speed');
        
        $(window).on('scroll', function(){
            
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                $self.css('background-position', - (($window.scrollTop() - dataTopOffset) * dataSpeed) + 'px 0');
                
            }
            
        });
        
    }
    
    function circleToRight($self) {
        
        // Store some variables based on where we are
        var dataTopOffset = $self.data('top-offset'),
            dataSpeed = $self.data('speed');
        
        $(window).on('scroll', function(){
            
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                $self.css('background-position', (($window.scrollTop() - dataTopOffset) * dataSpeed) + 'px 0');
            }
            
        });
        
    }
    
    function jumpingDecoration($self) {
        
        var dataTopOffset = $self.data('top-offset'),
            
            dataSpeed = $self.data('speed'),
            dataDistance = $self.data('distance');
        
        $(window).on('scroll', function(){
            
            if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
            ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                
                /*
                var degrees = Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360));
                var rad = degrees * dataSpeed * Math.PI/180;
                var sinus = Math.sin(rad);
                
                var margin = sinus * dataDistance / 2;
                */
                
                //var sinus = Math.sin( Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180 );
                
                $self.css('margin-top', Math.sin( Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180 ) * dataDistance / 2);
                
            }
            
        });
        
    }
    
    function sparklingDecoration($self) {
        
        var dataTopOffset = $self.data('top-offset'),
            
            dataSpeed = $self.data('speed'),
            dataDepth = $self.data('depth') / 100;
        
        $(window).on('scroll', function(){
            
            if ( $window.scrollTop()  > (dataTopOffset) &&
            ( ($self.offset().top + $self.height()) > $window.scrollTop() ) ) {
                
                var degrees = Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360));
                var rad = degrees * dataSpeed * Math.PI/180;
                var sinus = Math.sin(rad);
                
                var margin = sinus * dataDepth / 2;
                
                $self.css('opacity', (1 - dataDepth / 2) + margin );
                //var sinus = Math.sin( Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180 );
                
                //$self.css('margin-top', Math.sin( Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180 ) * dataDistance / 2);
                
            }
            else {
                //$self.css('opacity', 0);
            }
            
        });
        
    }
    
    function makeAnchor(e, $this) {
        
        e.preventDefault(); 
        e.stopPropagation();
        
        $('html, body').stop().animate({scrollTop: $('a[name="' + $this.attr('href').split('#')[1] + '"]').offset().top}, 1500);
        
    }
    
}); // document ready



