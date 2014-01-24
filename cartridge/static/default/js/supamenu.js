var $beforeFixMenu = function(){};
var $beforeAbsMenu = function(){};

$(function(){
	var $win = $(window),
		$filter = $('[role=navigation]'),
		$filterSpacer = $('<div />', {
			  "class": "filter-drop-spacer",
			  "height": $filter.outerHeight()
		});
	   
	$('[role=navigation]').append('<div role="morenavigation"><div><div class="caret"></div></div><ul class="morenav"></ul></div>');
	 
	truncmenu();
	 
	 $win.resize(function(){
	 	truncmenu();
	 });
	 
	 $win.scroll(function(){    	   
		 if(!$filter.hasClass('fix') && $win.scrollTop() > $filter.offset().top){
		 	$beforeFixMenu();
		 	$filter.before($filterSpacer);
		  	$filter.addClass("fix");		  	
		 } else if ($filter.hasClass('fix')  && $win.scrollTop() < $filterSpacer.offset().top){		 			 	
		 	$beforeAbsMenu();
		  	$filter.removeClass("fix");
		  	$filterSpacer.remove();
		 }
	 });
});


function truncmenu() {
	var $parentnav = $('[role=navigation]');
	var $morenav = $('[role=morenavigation] > ul:first');
	var $mainnav = $('[role=navigation] > ul:first-child');
	

	
	$mainnav.width($parentnav.width() - $morenav.outerWidth(true));
	
    for(var i=$mainnav.children("li:not([role=morenavigation])").length-1;i>=0;i--)
    {
    	var $navitem = $mainnav.children("li:not([role=morenavigation])").eq(i);
        var $left = $navitem.position().left, $width = $navitem.outerWidth(true), $top = $navitem.position().top, $parent = $navitem.parent();
        
        if($left + $width > $parent.width() || $top > $parent.height()) {	    
   			$mainnav.width($parentnav.width() - $morenav.outerWidth(true));
   			$morenav.prepend($navitem);		   			
   		}   		
    }
    
    var sanitycheck = 0;
    while($morenav.children().length > 0 && sanitycheck < 50) {
    	var $navitem = $morenav.children().eq(0);

    	var $lastnav = $('[role=navigation] > ul:first-child > li:last-child');    	
    	var leftover = $mainnav.width();
    	var lastnavright = 0;
	    if($lastnav != null && $lastnav.position() != null) {
	    	leftover = $mainnav.width() - ($lastnav.outerWidth(true) + $lastnav.position().left);	    
	    	lastnavright = $lastnav.outerWidth(true) + $lastnav.position().left;
	    }
    	if($navitem.outerWidth(true) < leftover) {
    		$mainnav.append($navitem);
	    	if($navitem.outerWidth(true) + $navitem.position().left > $mainnav.width()) {
	    		$morenav.prepend($navitem);
	    		break;
	    	}
	    		
    	} else {
    		break;
    	}
    	sanitycheck++;
    }   
    
    if($morenav.find("li").length == 0) {
    	$('[role=morenavigation]').hide();
    } else {
    	
    	$('[role=morenavigation]').show();
    }
}