$(document).ready(function(){
    
    // Cache the Window object
    $window = $(window);
    
    
    $window.on('debouncedresize', function() {
        
        //window.location.href=window.location.href;
        
    });
    
    
    $('[data-page-content="static"]').each(function() {
        
        alignMiddleStatic($(this));
        
    });
    
    alignLogo();
    
    
    if ($('#tabs').length) {
        
        $('#tabs').tabs();
        
    }
    
    
    $window.on('orientationchange', function() {
        
        alignLogo();
        
    });
    
    function alignLogo() {
        
        $('.clients-list li > span').each (function() {
            
            $(this).css('margin-top', $(this).closest('li').height() / 2 - $(this).height() / 2);
            
        });
        
    }
    
    function alignMiddleStatic($self) {
        
        var topPadding = parseInt($self.css('padding-top')),
            
            top = $self.closest('[data-type="page"]').outerHeight() / 2 -
                    ($self.outerHeight() - topPadding) / 2;
        
        
        
        
        if ( top >= topPadding ) {
            
            $self.closest('[data-type="page"]').css('height', $self.closest('[data-type="page"]').height());
            $self.css('padding-top', 0);
            
            //top = topPadding;
            
            $self.css({
                
                'position': 'absolute',
                'left': '0',
                'top': top,
                'width': '100%'
                
            });
            
            $self.removeClass('relative');
            
        }
        else if ( top < topPadding ) {
            
            $self.addClass('relative');
            
        }
        
        
        
    }
    
}); // document ready

    