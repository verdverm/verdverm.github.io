(function($){
  $(function(){

    $('.button-collapse').sideNav();
	$('.slider-large').slider({
		height: 360,
		interval: 4000,
	});
	$('.slider-medium').slider({
		height: 300,
		interval: 4000,
	});
	$('.slider-small').slider({
		height: 200,
		interval: 4000,
	});

  }); // end of document ready
})(jQuery); // end of jQuery name space