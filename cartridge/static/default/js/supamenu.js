var $beforeFixMenu = function(){};
var $beforeAbsMenu = function(){};

$(function(){
	var $win = $(window),
		$filter = $('[role=navigation]'),
		$filterSpacer = $('<div />', {
			  "class": "filter-drop-spacer",
			  "height": $filter.outerHeight()
		});
	   
	//$('[role=navigation]').append('<div id="morenav" role="morenavigation"><div><div class="caret"></div></div><ul class="morenav"></ul></div>');
	 
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
		 $('.morenav').fadeOut();
	 });
	 
	 var $morenav = $('#morenav');
	 
 	$morenav.on('click', function (e) {
	    e.stopPropagation();
	    $('.morenav').fadeIn();
	});
 	$morenav.on('click', function (e) {
	    e.stopPropagation();
	    $('.morenav').fadeIn();
	});
	$(document).on('click', function (e) {
	    if (e.target != $('.morenav')) {
	        $('.morenav').fadeOut();
	    }
	});			 
});


function truncmenu() {
	var $parentnav = $('[role=navigation]');
	var $morenavp = $('[role=morenavigation]');
	var $morenav = $('[role=morenavigation] > ul.morenav');
	var $mainnav = $('[role=navigation] > div > ul:first-child');

	//$mainnav.width($parentnav.width() - $morenav.outerWidth(true));
	
	//alert(!$('[role=morenavigation]').is(":visible"));
	
    for(var i=$mainnav.children("li:not([role=morenavigation])").length-1;i>=0;i--)
    {
    	
    	var $navitem = $mainnav.children("li:not([role=morenavigation])").eq(i);
        var $left = $navitem.position().left, $width = $navitem.outerWidth(true), $top = $navitem.position().top, $parent = $navitem.parent();

        //alert(($left + $width)  + "," + ($parent.width() - $morenavp.outerWidth(true)));
        if($left + $width > ($parent.width() - $morenavp.outerWidth(true))  || $top > $parent.height()) {
        	//alert("gone");
        	var item = $navitem.remove();      
        	$morenav.prepend(item.clone());        	
        	$morenavp.show();           	
   		}   		
    }
        
    var sanitycheck = 0;
    
    while($morenav.children().length > 0 && sanitycheck < 1) {
    	
    	var $navitem = $morenav.children().eq(0);

    	var $lastnav = $('[role=navigation] > div > ul:first-child > li:not([role=morenavigation]):last');    	
    	var leftover = $mainnav.width()-$morenavp.width();
    	
    	var lastnavright = 0;
	    if($lastnav != null && $lastnav.position() != null) {
	    	leftover = $mainnav.width() - ($lastnav.outerWidth(true) + $lastnav.position().left);	    
	    	lastnavright = $lastnav.outerWidth(true) + $lastnav.position().left;
	    }
    	if($navitem.outerWidth(true) < leftover) {
    		$navitem.insertBefore($morenavp);
	    	/*if($navitem.outerWidth(true) + $navitem.position().left > $mainnav.width()) {
	        	var x = $navitem.remove();
	        	var html = $('<div>').append(x.clone()).remove().html();;
	        	$morenavp.show();        	
	   			$morenav.prepend(html);	
	    		break;
	    	}*/	    		
    	} else {
    		break;
    	}
    	sanitycheck++;
    }   
    
    if($morenav.find("li").length == 0) {  
    	return;
    	//$('[role=morenavigation]').hide();
    } else {
    	if(!$('[role=morenavigation]').is(":visible")) {
    		$('[role=morenavigation]').show();
    		//truncmenu();
    	}
    }
}