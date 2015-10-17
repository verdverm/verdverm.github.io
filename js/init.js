(function($){
  $(function(){

    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

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