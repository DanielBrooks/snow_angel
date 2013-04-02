/*
 * - caching some data might be done in one function instead of two (along with setting attribute)
 *
 */


$(document).ready(function(){
    
    // Cache the Window object
    $window = $(window);
    
    var pageOrder = 0,
        anchorOrder = 0;
    
    
    $window.on('debouncedresize', function() {
        
        //window.location.href=window.location.href;
        
    });
    
    
    $('img').imagesLoaded(function() {
        
        
        $('.page-home .sun-decoration').css('left', '50%');
        $('.page-home .sun-decoration').css('left', '50%');    
        
        
        $('[data-full-height="true"]').each(function() {
            
            setFullHeight($(this));
            
        });
        
        
        $('[data-type="page"]').each(function() {
            
            $(this).attr('data-page-order', ++pageOrder);
            
        });
        
        $('[data-type="page"]').each(function() {
            
            $(this).data('page-order', parseInt($(this).attr('data-page-order')));
            
        });
        
        
        $('[data-require-position="true"]').each(function() {
            
            setPositionData($(this));
            
        });
        
        $('[data-require-position="true"]').each(function() {
            
            $(this).data('top-shift', parseInt($(this).attr('data-top-shift')));
            $(this).data('top-offset', parseInt($(this).attr('data-top-offset')));
            
        });
        
        
        $('[data-circle-bg="true"]').each(function() {
            
            $(this).data('speedX', $(this).attr('data-speed-x'));
            $(this).data('speedY', $(this).attr('data-speed-y'));
            
            circleBg($(this));
            
        });
        
        
        $('[data-fade="in"]').each(function() {
            
            decorationFadeIn($(this));
            
        });
        
        
        $('[data-fade="out"]').each(function() {
            
            $(this).data('fade-out-delay', parseInt($(this).attr('data-fade-out-delay')));
            
            decorationFadeOut($(this));
            
        });
        
        
        $('[data-slide="to-left"]').each(function() {
            
            slideToLeft($(this));
            
        });
        
        
        $('[data-slide="to-right"]').each(function() {
            
            slideToRight($(this));
            
        });
        
        
        $('[data-slide-double="to-left"]').each(function() {
            
            slideDoubleToLeft($(this));
            
        });
        
        
        $('[data-pin="true"]').each(function() {
            
            pinDecoration($(this));
            
        });
        
        
        $('[data-pin-on-top="true"]').each(function() {
            
            $(this).data('pin-distance', parseInt($(this).attr('data-pin-distance')));
            
            pinOnTop($(this));
            
        });
        
        $('[data-fade-after-pin="true"]').each(function() {
            
            var dataPinDistance = $(this).data('pin-distance') - 1 - 2,
                distance = 0,
                
                startPage = $(this).closest('[data-type="page"]').data('page-order') - 1,
                stopPage = startPage + dataPinDistance,
                stopFadePage = $('[data-page-order="' + (stopPage + 1) + '"]').outerHeight();
            
            for ( var i = startPage; i <= stopPage; i++) {
                
                distance = distance + $('[data-page-order="' + i + '"]').outerHeight();
                
            }
            
            $(this).attr('data-action-distance', distance);
            $(this).attr('data-fade-distance', stopFadePage);
            
        });
        
        $('[data-fade-after-pin="true"]').each(function() {
            
            $(this).data('action-distance', parseInt($(this).attr('data-action-distance')));
            $(this).data('fade-distance', parseInt($(this).attr('data-fade-distance')));
            
            fadeAfterPin($(this));
            
        });
        
        
        $('[data-bg-color-change="true"]').each(function() {
            
            $(this).data('color-start', $(this).attr('data-color-start').toUpperCase());
            $(this).data('color-stop', $(this).attr('data-color-stop').toUpperCase());
            
            changeBgColor($(this));
            
        });
        
        
        $('[data-bg-color-change="false"]').each(function() {
            
            $(this).data('color-start', $(this).attr('data-color-start').toUpperCase());
            
            staticBgColor($(this));
            
        });
        
        
        $('.nav a').on('click', function(e) {
            
            if ($(this).attr('rel') !== 'external') {
                
                makeAnchor(e, $(this));
                
            }
            
        });
        
        $('.nav a').on('dblclick', function(e) {
            
            makeFastAnchor(e, $(this));
            
        });
        
        
        $('.anchor').each(function() {
            
            $(this).attr('data-anchor-order', ++anchorOrder);
            $(this).data('anchor-order', parseInt($(this).attr('data-anchor-order')));
            
        });
        
        $('.anchor').each(function() {
            
            var $self = $(this),
                $prevAnchor = $('[data-anchor-order="' + ($self.data('anchor-order') - 1) + '"]');
            
            
            $window.scroll(function() {
                
                if ( ($window.scrollTop() + $window.height()) > ($self.offset().top) &&
                ( ($self.offset().top + $self.height()) > $window.scrollTop() ) ) {
                    
                    if ($prevAnchor.data('anchor-order') == undefined) {
                        
                        $('.nav li').removeClass('active');
                        $('.nav').find('a[href="#' + $self.attr('name') + '"]').closest('li').addClass('active');
                        
                    }
                    else if ( $prevAnchor.offset().top + $prevAnchor.height() < $window.scrollTop() ) {
                        
                        $('.nav li').removeClass('active');
                        $('.nav').find('a[href="#' + $self.attr('name') + '"]').closest('li').addClass('active');
                        
                    }
                    else if ( $prevAnchor.offset().top + $prevAnchor.height() > $window.scrollTop() ) {
                        
                        $('.nav li').removeClass('active');
                        $('.nav').find('a[href="#' + $prevAnchor.attr('name') + '"]').closest('li').addClass('active');
                        
                    }
                    
                }
                
            });
            
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
        
        
        $('[data-page-content="true"]').each(function() {
            
            alignMiddle($(this));
            
        });
        
        
        
        
        function setFullHeight($self) {
            
            var windowHeight = $(window).height(),
                minHeight = 647;
            
            if ( windowHeight < minHeight ) {
                
                windowHeight = minHeight;
                
            }
            
            if ( $self.outerHeight() <= windowHeight ) {
                
                $self.css('height', windowHeight - parseInt($self.css('padding-top')) - parseInt($self.css('padding-bottom')));
                
            }
            
            if ( $self.outerHeight() > windowHeight ) {
                
                $self.css('height', $self.height());
                
            }
            
        }
        
        function decorationFadeIn($self) {
            
            var dataTopOffset = $self.data('top-offset');
            
            $(window).scroll(function(){
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
                ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                    
                    $self.css('opacity', 1 - ((dataTopOffset - $window.scrollTop()) / ($window.height() / 100)) / 100);
                    
                } // in view
                
                if ( ($window.scrollTop() + $window.height()) < (dataTopOffset) ) {
                    
                    $self.css('opacity', 0);
                    
                }
                
            }); // window scroll
            
        }
        
        function decorationFadeOut($self) {
            
            var dataTopOffset = $self.data('top-offset'),
                dataDelay = $self.data('fade-out-delay') / 100;
            
            if (dataDelay == undefined) {
                
                dataDelay = 0;
                
            }
            
            $(window).scroll(function(){
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset + $self.height() * dataDelay) &&
                ( (dataTopOffset + $self.height() + $self.height() * dataDelay) > $window.scrollTop() ) ) {
                    
                    $self.css('opacity', ((dataTopOffset + $self.height() * dataDelay - $window.scrollTop()) / ($window.height() / 100)) / 100);
                    
                } // in view
                
            }); // window scroll
            
        }
        
        function slideToLeft($self) {
            
            var dataTopShift = $self.data('top-shift'),
                dataTopOffset = $self.data('top-offset') - dataTopShift,
                percent = 0;
                //windowHeight = $window.height();
            
            $(window).on('scroll', function(){
                
                if ( $window.scrollTop() < dataTopOffset ) {
                    
                    percent = 1;
                    
                }
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
                ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                    
                    if ((dataTopOffset - $window.scrollTop()) >= 0) {
                        
                        percent = ((dataTopOffset - $window.scrollTop()) / $window.height());
                        
                    }
                    
                } // in view
                
                if ( $window.scrollTop() > dataTopOffset ) {
                    
                    percent = 0;
                    
                } 
                
                var selfLeftPosition = ($(window).width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent;
                
                $self.css('left', selfLeftPosition + 'px');
                
            }); // window scroll
            
        }
        
        function slideDoubleToLeft($self) {
            
            var dataTopShift = $self.data('top-shift'),
                dataTopOffset = $self.data('top-offset') - dataTopShift,
                pagePrevHeight = $self.closest('[data-type="page"]').prev('[data-type="page"]').outerHeight(),
                pageHeight = $self.closest('[data-type="page"]').outerHeight(),
                percent = 0;
            
            $(window).on('scroll', function(){
                
                if ( $window.scrollTop() < dataTopOffset - pagePrevHeight ) {
                    
                    percent = 1;
                    
                }
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset - pagePrevHeight) &&
                ( (dataTopOffset + pageHeight + $self.height()) > $window.scrollTop() ) ) {
                    
                    if ((dataTopOffset + pageHeight - $window.scrollTop()) >= 0) {
                        
                        percent = ((dataTopOffset + pageHeight - $window.scrollTop()) / (pageHeight + pagePrevHeight));
                        
                    }
                    
                } // in view
                
                if ( $window.scrollTop() > dataTopOffset + pageHeight) {
                    
                    percent = 0;
                    
                } 
                
                var selfLeftPosition = ($window.width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent + ($window.width() * percent);
                
                $self.css('left', selfLeftPosition + 'px');
                
            }); // window scroll
            
        }
        
        function slideToRight($self) {
            
            var dataTopShift = $self.data('top-shift'),
                dataTopOffset = $self.data('top-offset') - dataTopShift,
                percent = 0;
                //windowHeight = $window.height();
            
            $(window).on('scroll', function(){
                
                if ( $window.scrollTop() < dataTopOffset ) {
                    
                    percent = 1;
                }
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
                ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                    
                    if ((dataTopOffset - $window.scrollTop()) >= 0) {
                        
                        percent = ((dataTopOffset - $window.scrollTop()) / $window.height());
                        
                    }
                    
                } // in view
                
                if ( $window.scrollTop() > dataTopOffset ) {
                    
                    percent = 0;
                } 
                
                var selfLeftPosition = - ($(window).width() / 2) + (($(window).width() / 2) + (($self.width()) / 2)) * percent;
                
                $self.css('left', - selfLeftPosition + 'px');
                
            }); // window scroll
            
        }
        
        function pinDecoration($self) {
            
            var dataTopShift = $self.data('top-shift'),
                closestPageOffset = $self.closest('[data-type="page"]').offset().top,
                closestPageHeight = $self.closest('[data-type="page"]').outerHeight();
            
            
            $(window).on('scroll', function() {
                
                if ( closestPageOffset > $window.scrollTop() ) {
                    
                    $self.css({'top': dataTopShift, 'position': 'absolute'});
                    
                }
                
                
                if ( ( closestPageOffset <= $window.scrollTop()) &&
                    ($window.scrollTop() <= closestPageOffset + closestPageHeight) ) {
                    
                    $self.css({'top': dataTopShift, 'position': 'fixed'});
                    
                }
                
                
                if ( $window.scrollTop() > closestPageOffset + closestPageHeight ) {
                    
                    $self.css({'top': dataTopShift + closestPageHeight, 'position': 'absolute'});
                    
                }
                
            }); // window scroll
            
        }
        
        function pinOnTop($self) {
            
            var dataTopShift = $self.data('top-shift'),
                dataTopOffset = $self.data('top-offset'),
                
                dataPinDistance = $self.data('pin-distance') - 1,
                distance = 0,
                
                startPage = $self.closest('[data-type="page"]').data('page-order') - 1,
                stopPage = startPage + dataPinDistance,
                
                startPageOffset = $('[data-page-order="' + startPage + '"]').offset().top,
                
                freezeDistance = $('[data-page-order="' + (stopPage + 1) + '"]').offset().top -
                                $('[data-page-order="' + (startPage + 1) + '"]').offset().top;
            
            
            for ( var i = startPage; i <= stopPage; i++) {
                
                distance = distance + $('[data-page-order="' + i + '"]').outerHeight();
                
            }
            
            
            $(window).on('scroll', function(){
                
                if ( startPageOffset > $window.scrollTop() ) {
                    
                    $self.css({'top': startPageOffset + dataTopShift, 'position': 'absolute'});
                    
                }
                
                
                if ( ($window.scrollTop() > startPageOffset) &&
                    ($window.scrollTop() <  startPageOffset + distance) ) {
                    
                    $self.css({'top': dataTopShift * 2, 'position': 'fixed'});
                    
                }
                
                
                if ( $window.scrollTop() > startPageOffset + distance ) {
                    
                    if (dataPinDistance == 0) {
                        
                        $self.css({'top': dataTopShift, 'position': 'absolute'});
                        
                    }
                    else {
                        
                        $self.css({'top': freezeDistance, 'position': 'absolute'});
                        
                    }
                    
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
                bStep = (parseInt(matchesStart[3], 16) - parseInt(matchesStop[3], 16)) / 100,
                
                firstInSection = $self.prev('[data-type="page"]').attr('data-color-start') == undefined;
            
            
            $(window).on('scroll', function(){
                
                
                if ( (($window.scrollTop() - dataTopOffset) <= $self.outerHeight()) &&
                    (($window.scrollTop() - dataTopOffset) >= 0) ) {
                    
                    var percent = Math.round((($window.scrollTop() - dataTopOffset) / $self.outerHeight()) * 100);
                    
                    var rgb = 'rgb(' + (parseInt(matchesStart[1], 16) - Math.round(rStep * percent)) + ','
                    + (parseInt(matchesStart[2], 16) - Math.round(gStep * percent)) + ','
                    + (parseInt(matchesStart[3], 16) - Math.round(bStep  * percent)) + ')';
                    
                    $self.closest('.section').css('background-color', rgb);
                }
                
                if ( (firstInSection == true) &&
                    (($window.scrollTop() - dataTopOffset) < 0) ) {
                    
                    var rgb = 'rgb(' + parseInt(matchesStart[1], 16) + ','
                    + parseInt(matchesStart[2], 16) + ','
                    + parseInt(matchesStart[3], 16) + ')';
                    
                    $self.closest('.section').css('background-color', rgb);
                    
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
        
        function setPositionData($self) {
            
            if ($self.attr('data-top-shift') == undefined) {
                
                if ( $self.css('top') == 'auto' ) {
                    
                    var topShift = $self.offset().top - $self.closest('[data-type="page"]').offset().top;
                    
                    $self.attr('data-top-shift', topShift);
                    
                }
                else {
                    
                    $self.attr('data-top-shift', parseInt($self.css('top')));
                    
                }
            }
            
            if ($self.attr('data-top-offset') == undefined) {
                $self.attr('data-top-offset', parseInt($self.offset().top));
            }
            
        }
        
        function circleBg($self) {
            
            var dataTopOffset = $self.data('top-offset'),
                dataSpeedX = $self.data('speedX'),
                dataSpeedY = $self.data('speedY');
            
            $(window).on('scroll', function(){
                
                if ( ($window.scrollTop() + $window.height()) > (dataTopOffset) &&
                ( (dataTopOffset + $self.height()) > $window.scrollTop() ) ) {
                    
                    $self.css('background-position', (($window.scrollTop() - dataTopOffset) * dataSpeedX) + 'px ' + (($window.scrollTop() - dataTopOffset) * dataSpeedY) + 'px');
                    
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
                    
                    $self.css('margin-top', Math.sin( Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180 ) * dataDistance / 2);
                    
                }
                
            });
            
        }
        
        function sparklingDecoration($self) {
            
            var dataTopOffset = $self.data('top-offset'),
                
                dataSpeed = $self.data('speed'),
                dataDepth = $self.data('depth') / 100,
                
                dataDistance = $self.data('action-distance'),
                dataFadeDistance = $self.data('fade-distance');
            
            
            if ( $self.attr('data-fade-after-pin') == 'true' ) {
                
                $(window).on('scroll', function(){
                    
                    if ( $window.scrollTop()  > (dataTopOffset) &&
                    ( (dataTopOffset + dataDistance) > $window.scrollTop() ) ) {
                        
                        /*
                        var degrees = Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360));
                        var rad = degrees * dataSpeed * Math.PI/180;
                        var sinus = Math.sin(rad);
                        
                        var margin = sinus * dataDepth / 2;
                        */
                        
                        $self.css('opacity', (1 - dataDepth / 2) + (Math.sin(Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180) * dataDepth / 2) );
                        
                    }
                    
                });
                
            }
            else {
                
                $(window).on('scroll', function(){
                    
                    if ( $window.scrollTop()  > (dataTopOffset) &&
                    ( ($self.offset().top + $self.height()) > $window.scrollTop() ) ) {
                        
                        /*
                        var degrees = Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360));
                        var rad = degrees * dataSpeed * Math.PI/180;
                        var sinus = Math.sin(rad);
                        
                        var margin = sinus * dataDepth / 2;
                        */
                        
                        $self.css('opacity', (1 - dataDepth / 2) + (Math.sin(Math.round((dataTopOffset - $window.scrollTop()) / ($window.height() / 360)) * dataSpeed * Math.PI/180) * dataDepth / 2) );
                        
                    }
                    
                });
                
            }
            
        }
        
        function fadeAfterPin($self) {
            
            var dataTopOffset = $self.data('top-offset'),
                
                dataDistance = $self.data('action-distance'),
                dataFadeDistance = $self.data('fade-distance');
            
            
            $(window).on('scroll', function(){
                
                if ( $window.scrollTop() > (dataTopOffset + dataDistance) &&
                    (dataTopOffset + dataDistance + dataFadeDistance) > $window.scrollTop() ) {
                    
                    $self.css('opacity', ((dataTopOffset + dataDistance + dataFadeDistance - $window.scrollTop()) / (dataFadeDistance / 100)) / 100);
                    
                }
                
            });
            
        }
        
        function makeAnchor(e, $this) {
            
            e.preventDefault(); 
            e.stopPropagation();
            
            $this.closest('li').addClass('current');
            
            var $li = $this.closest('li'),
                flag = 0,
                speed = 0;
            
            $('.nav li').each(function() {
                
                if ( ($(this).hasClass('active')) && ($(this).hasClass('current')) ) {
                    
                    flag = 3;
                    speed = 1;
                    
                }
                
                if ( (flag == 0) || (flag == 1) ) {
                    
                    if ( ($(this).hasClass('active')) || ($(this).hasClass('current')) ) {
                        
                        flag = flag + 1;
                        
                    }
                    
                    if (flag == 1) {
                        speed++;
                    }
                    
                }
                
            });
            
            $('.nav li').removeClass('current');
            
            $('html, body').stop().animate({scrollTop: $('a[name="' + $this.attr('href').split('#')[1] + '"]').offset().top}, 1000 * speed);
            
        }
        
        function makeFastAnchor(e, $this) {
            
            e.preventDefault(); 
            e.stopPropagation();
            
            $('html, body').stop().scrollTop($('a[name="' + $this.attr('href').split('#')[1] + '"]').offset().top);
            
            $('html, body').animate({scrollTop: $('a[name="' + $this.attr('href').split('#')[1] + '"]').offset().top - 1}, 50);
            $('html, body').animate({scrollTop: $('a[name="' + $this.attr('href').split('#')[1] + '"]').offset().top + 1}, 50);
            
        }
        
        function alignMiddle($self) {
            
            var top = $self.closest('[data-type="page"]').outerHeight() / 2 -
                        $self.outerHeight() / 2;
            
            
            if ( top < parseInt($self.closest('[data-type="page"]').css('padding-top')) ) {
                
                top = parseInt($self.closest('[data-type="page"]').css('padding-top'));
                
            }
            
            
            $self.css({
                
                'position': 'absolute',
                'left': '0',
                'top': top,
                'width': '100%'
                
            });
            
        }
        
    }); // images loaded
    
}); // document ready



