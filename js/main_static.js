$(document).ready(function(){
    
    // Cache the Window object
    $window = $(window);
    
    
    $window.on('debouncedresize', function() {
        
        //window.location.href=window.location.href;
        
    });
    
    
    $('img').imagesLoaded(function() {
        
        
        $('[data-page-content="static"]').each(function() {
            
            alignMiddleStatic($(this));
            
        });
        
        
        
        function alignMiddleStatic($self) {
            
            var topPadding = parseInt($self.css('padding-top')),
                
                top = $self.closest('[data-type="page"]').outerHeight() / 2 -
                        ($self.outerHeight() - topPadding) / 2;
            
            
            $self.closest('[data-type="page"]').css('height', $self.closest('[data-type="page"]').height());
            $self.css('padding-top', 0);
            
            
            if ( top < topPadding ) {
                
                top = topPadding;
                
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

    