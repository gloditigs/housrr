(function($){
"use strict";

$(document).ready(function() {


	var win_h 						= $(window).height(),
		win_w 						= $(window).outerWidth(),
		headerHeight 				= $('header').height(),
		footerHeight 				= $('footer').height() || 0,
		resizeTimer,
		is_desktop 					= true,
		is_small_desktop 			= false,
		is_tablet 					= false,
		is_mobile 					= false,
		browser 					= detect_browser();




/*
===========================================================
===========================================================
	Global
===========================================================
===========================================================
*/





/*
 *
 *
 * Initialization
 *
 *
*/

	// ----------------
	// Global
	// ----------------

		// Assets Loading
		$('body').imagesLoaded( function() {

			// Draw layouts after loading all images.
			init();


			// Hide loading screen
			setTimeout(function() {
				$("body").addClass("loaded");
			},1000);
		});





/*
 *
 *
 * Resize
 *
 *
*/

	// ----------------
	// Global
	// ----------------
		$(window).resize(function() {
			
			if(!is_tablet && !is_mobile) {
				
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					reload();
				}, 100);
			}
		});





/*
===========================================================
===========================================================
	Events
===========================================================
===========================================================
*/





/*
 *
 *
 * Menu
 *
 *
*/


	// ----------------------
	// Menu - Responsive
	// ----------------------

		// Mobile/Tablet Menu Icon
		$("header .menu-icon").on("click",function() {

			if(!$("header").hasClass('showNav')){

				$("body, html, header").addClass("showNav");

				// Center Menu
				if($("header nav > ul").outerHeight() < win_h) {

					var wantedHeight = (win_h/2) - ($("header nav > ul").height()/2);

					$("header nav > ul").css('padding', wantedHeight+'px 0');
				}
			}
			else {

				$(this).siblings('nav').find('li ul').attr('style', '');

				$("body, html, header").removeClass("showNav");
			}
		});

		// Mobile/Tablet Menu Link Toggle animation
		$("body").on('click', 'header.showNav nav a', function(event) {

	        if($(this).siblings("ul").length > 0) {
	            event.preventDefault();
	        }

	        if($(this).next().hasClass('active')) {

		        $(this).next().slideToggle(500);
		        $(this).next().removeClass('active');
	        }
	        else {

	        	$(this).parent().siblings('li').find('> ul.active').slideToggle(650);
	        	$(this).parent().siblings('li').find('> ul.active').removeClass('active');

		        $(this).next().addClass('active');
		        $(this).next().slideToggle(650);
	        }
	    });





/*
 *
 *
 * Sliders
 *
 *
*/

	// ----------------
	// Carousel Slider
	// ----------------
		$(".carousel-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiperr = $(this).parent()[0].swiper;

			swiperr.slideNext();
		});
		$(".carousel-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiperr = $(this).parent()[0].swiper;

			swiperr.slidePrev();
		});

	// ----------------
	// Label Slider
	// ----------------
		$(".label-slider > .slides .slide").on('mouseenter', function(event) {

			if(is_desktop || is_small_desktop) {

				var id = $(this).attr('data-id');

				$(this).siblings('.slide').removeClass("status-active");
				$(this).addClass("status-active");

				$(this).closest('.label-slider').find('> .images img.status-active').removeClass("status-active");
				$(this).closest('.label-slider').find('> .images img[data-id='+ id +']').addClass("status-active");
			}
		});

	// ----------------
	// List Slider
	// ----------------
		$(".list-slider > .list ul li a").on('mouseenter', function(event) {

			if(is_desktop || is_small_desktop) {
				if(!$(this).parent().hasClass("status-active")) {

					var id = $(this).parent().attr('data-id');

					$(this).closest('.list').find('li.status-active').removeClass("status-active");
					$(this).parent().addClass("status-active");

					$(this).closest('.list-slider').find('> .images img.status-active').removeClass("status-active");
					$(this).closest('.list-slider').find('> .images img[data-id='+ id +']').addClass("status-active");

					$(this).closest('.list-slider').find('> .details .panel.status-active').removeClass("status-active");
					$(this).closest('.list-slider').find('> .details .panel[data-id='+ id +']').addClass("status-active");
				}
			}
		});

	// ----------------
	// Strips Slider
	// ----------------
		$(".strips-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slideNext();
		});
		$(".strips-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slidePrev();
		});

	// ----------------
	// Vertical Slider
	// ----------------
		$(".vertical-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slideNext();
		});
		$(".vertical-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slidePrev();
		});

	// ----------------
	// Big Slider
	// ----------------
		$(".big-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slideNext();
		});
		$(".big-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).parent()[0].swiper;

			swiper.slidePrev();
		});

	// ----------------
	// Blocks Slider
	// ----------------
		$(".block-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).siblings(".swiper-container")[0].swiper;

			swiper.slideNext();
		});
		$(".block-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).siblings(".swiper-container")[0].swiper;

			swiper.slidePrev();
		});

	// ----------------
	// Sliced Slider
	// ----------------
		$(".sliced-slider .swiper-nav-next").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).siblings(".swiper-container")[0].swiper;

			swiper.slideNext();
		});
		$(".sliced-slider .swiper-nav-prev").on('click', function(event) {
			event.preventDefault();

			var swiper = $(this).siblings(".swiper-container")[0].swiper;

			swiper.slidePrev();
		});





/*
 *
 *
 * Elements
 *
 *
*/

	// ----------------------
	// Booking Tool
	// ----------------------
		$(".booking-tool .feature-guests .step-label").on('click', function(event) {
			event.preventDefault();

			$(this).siblings('.dropdowns').toggleClass("status-active");
		});
		$(document).on('mouseup keyup', function(e) {

			var key = event.which,
				container = $(".booking-tool .feature-guests");

			// mouse click away
			// Esc press
			if ((!container.is(e.target) && container.has(e.target).length === 0) || key == 27) {

				container.find('.dropdowns').removeClass('status-active');

				return false;  
			}
		});

		$(".booking-tool .feature-guests .plus").on('click', function(event) {
			event.preventDefault();

			var number = $(this).siblings('input');

			number.val( parseInt(number.val()) + 1 );

			if($(this).hasClass("children-number")) {
				$(this).closest(".booking-step").find('.step-label .children-number').text(number.val());
			}
			else {
				$(this).closest(".booking-step").find('.step-label .adults-number').text(number.val());
			}
		});
		$(".booking-tool .feature-guests .minus").on('click', function(event) {
			event.preventDefault();

			var number = $(this).siblings('input');

			if( ($(this).hasClass("adults-number") && parseInt(number.val()) != 1) ||
				($(this).hasClass("children-number") && parseInt(number.val()) != 0)
			 ) {

				number.val( parseInt(number.val()) - 1 );

				if($(this).hasClass("children-number")) {
					$(this).closest(".booking-step").find('.step-label .children-number').text(number.val());
				}
				else {
					$(this).closest(".booking-step").find('.step-label .adults-number').text(number.val());
				}
			}
		});

	// ----------------------
	// Video Popup
	// ----------------------
		$(".popup-button a").on('click', function(event) {
			event.preventDefault();

			var anchor = $(this),
				src = $(this).attr('data-video-url');

			$.magnificPopup.open({
			 	
			 	items: {
			 		src: src
			 	},
			    type: 'iframe',
			}, 0);
		});

	// ----------------------
	// Accordion
	// ----------------------
		$(".accordion .panel .label").on('click', function(event) {
			event.preventDefault();

			var label = $(this);

			if(!$(this).parent().hasClass("status-active")) {

				$(this).parent().siblings('.panel.status-active').find('.text').slideUp('10', function() {
					label.parent().siblings('.panel.status-active').removeClass("status-active");
				});

				$(this).siblings('.text').slideDown('10', function() {
					label.parent().addClass("status-active");
				});
			}
		});

	// ----------------------
	// Video Popup
	// ----------------------
		$(".gallery a").magnificPopup({
			 	
		    type: 'image',
		    closeOnContentClick: true,
		    mainClass: 'mfp-with-zoom',
		    preloader: true,
		    gallery: {
			    enabled: true,
				navigateByImgClick: true,
				arrowMarkup: '<span title="%title%" class="arrow-%dir%"></span>',
				tPrev: 'Previous Image',
				tNext: 'Next Image',
				tCounter: ''
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',

				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});



/*
===========================================================
===========================================================
	Functions
===========================================================
===========================================================
*/





/*
 *
 *
 * Drawing Functions
 *
 *
*/

	// Main function
	function init() {


		// ----------------------
		// Global
		// ----------------------
			
			// Responsiveness
			win_h 			= $(window).height();
			win_w 			= $(window).outerWidth();
			headerHeight 	= $('header').height();
			footerHeight 	= $('footer').height() || 0;

			$("html").addClass(browser);

			if(win_w > 1680) {

				is_desktop 			= true;
				is_small_desktop 	= false;
				is_tablet 			= false;
				is_mobile 			= false;
			}
			else if(win_w <= 1680 && win_w > 1300) {

				is_desktop 			= false;
				is_small_desktop 	= true;
				is_tablet 			= false;
				is_mobile 			= false;
			}
			else if(win_w <= 1300 && win_w > 1024) {

				is_desktop 			= false;
				is_small_desktop 	= false;
				is_tablet 			= true;
				is_mobile 			= false;
			}
			else if(win_w <= 1024) {

				is_desktop 			= false;
				is_small_desktop 	= false;
				is_tablet 			= false;
				is_mobile 			= true;
			}


		// ----------------------
		// Header & Footer
		// ----------------------
			if(is_tablet || is_mobile) {

				var right_menu_first = $("header.style-2 .content-right nav > ul > li:first-child");

				$("header.style-2 .content-left nav > ul > li").each(function(index, el) {

					var element = $(this).detach();

					right_menu_first.before(element);
				});

				$("header.style-2 .content-left nav").remove();
			}

			if(is_desktop || is_small_desktop) {

				// Shifting excess dropdowns to left
				$("header nav > ul > li, header nav > ul > li li").each(function(){

					if($(this).find('> ul').length){

						if( (win_w - $(this).offset().left) < 150 ||
							( $(this).hasClass('menu-item-has-children') &&
							(win_w - $(this).find('> ul').offset().left) < 150 ) ||
							$(this).hasClass("two-columns") && (win_w - $(this).offset().left) < 440 ||
							$(this).hasClass("three-columns") && (win_w - $(this).offset().left) < 640 ||
							$(this).hasClass("four-columns") && (win_w - $(this).offset().left) < 840) {

							$(this).addClass("left");
						}
					}
				});
			}
			else {

				$("header nav > ul > li").each(function(){

					if($(this).find('> ul').length){
						$(this).addClass("got-children");
					}
				});
			}


		// ----------------------
		// Sliders
		// ----------------------
		
			if($(".carousel-slider").length || $(".strips-slider").length || $(".vertical-slider").length || $(".big-slider").length || $(".block-slider").length || $(".sliced-slider").length) {

				$(".carousel-slider > .swiper-container, .strips-slider > .swiper-container, .vertical-slider > .swiper-container, .big-slider > .swiper-container, .block-slider .swiper-container, .sliced-slider .swiper-container").each(function() {
					
					var slider = $(this),
						slider_id = '#' + slider.attr('id'),
						active_slide = slider.find('article.swiper-slide-active').index(),
						mousewheel_status = slider.parent().attr('data-allow-mousewheel') || 'false',
						mousewheel_obj,
						centered_slides = false,
						loop = true,
						speed = 600,
						pagination = false,
						space_between_slides = 0,
						current_index = 1,
						slides_per_view = 1,
						slide_to_clicked_slide = true,
						slides_count = slider.find('article').length.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
						direction = 'horizontal';

					if(slider.parent().hasClass("style-intro")) {

						slide_to_clicked_slide = false;
					}
					else if(slider.parent().hasClass("style-horizontal-focused")) {
						
						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						slide_to_clicked_slide = true;
						pagination = {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '"></span>';
							},
						};
					}
					else if(slider.parent().hasClass("strips-slider")) {
						
						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						pagination = false;
					}
					else if(slider.parent().hasClass("vertical-slider")) {
						
						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						pagination = false;
						direction = 'vertical';
					}
					else if(slider.parent().hasClass("big-slider")) {

						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						slide_to_clicked_slide = true;
						pagination = {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '"></span>';
							},
						};
					}
					else if(slider.parent().parent().hasClass("block-slider")) {

						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						slide_to_clicked_slide = true;
						pagination = false;
					}
					else if(slider.parent().hasClass("style-fullscreen")) {

						if(slider.parent().hasClass("style-left")) {
							slides_per_view = 'auto';
							slide_to_clicked_slide = true;
						}
						else {
							slide_to_clicked_slide = false;
						}

						speed = 1000;
						pagination = {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '"></span>';
							},
						};
					}
					else if(slider.parent().parent().hasClass("sliced-slider")) {

						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						slide_to_clicked_slide = true;
						pagination = false;
					}


					if(mousewheel_status.length && mousewheel_status == 'false') {
						mousewheel_obj = false;
					}
					else {
						mousewheel_obj = {invert: false};
					}

					if(active_slide < 0) {
						active_slide = 0;
					}

					current_index = active_slide+1;
					current_index = current_index.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

					if(slider.parent().hasClass("style-intro")) {

						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 800;
						slide_to_clicked_slide = false;

						new Swiper(slider_id, {
							slidesPerView: slides_per_view,
							spaceBetween: space_between_slides,
							initialSlide: active_slide,
							speed: speed,
							direction: direction,
							mousewheel: mousewheel_obj,
							pagination: pagination,
							centeredSlides: centered_slides,
							loop: loop,
							longSwipesRatio: 0.09,
							grabCursor: false,
							autoplay: {
						        delay: 4000,
						        disableOnInteraction: true,
						    },
						});
					}
					else if(slider.parent().hasClass("clients-slider")) {

						slides_per_view = 'auto';
						centered_slides = true;
						space_between_slides = 0;
						loop = true;
						speed = 1000;
						slide_to_clicked_slide = true;

						new Swiper(slider_id, {
							slidesPerView: slides_per_view,
							spaceBetween: space_between_slides,
							initialSlide: active_slide,
							speed: speed,
							direction: direction,
							mousewheel: mousewheel_obj,
							pagination: pagination,
							centeredSlides: centered_slides,
							loop: loop,
							longSwipesRatio: 0.09,
							grabCursor: false,
							autoplay: {
						        delay: 1200,
						        disableOnInteraction: false,
						    },
						});
					}
					else if(slider.parent().hasClass("testimonials-slider")) {

						new Swiper(slider_id, {
							slidesPerView: slides_per_view,
							spaceBetween: space_between_slides,
							initialSlide: active_slide,
							speed: 1200,
							direction: direction,
							mousewheel: mousewheel_obj,
							pagination: pagination,
							centeredSlides: centered_slides,
							loop: loop,
							longSwipesRatio: 0.09,
							grabCursor: false,
							slideToClickedSlide: slide_to_clicked_slide,
							autoplay: {
						        delay: 5000,
						        disableOnInteraction: true,
						    },
							on: {
								touchMove: function() {
									slider.addClass('status-grapping');
								},
								touchEnd: function() {
									slider.removeClass('status-grapping');
								},
							}
						});
					}
					else {

						var swiper_slider = new Swiper(slider_id, {
							slidesPerView: slides_per_view,
							spaceBetween: space_between_slides,
							initialSlide: active_slide,
							speed: speed,
							direction: direction,
							mousewheel: mousewheel_obj,
							pagination: pagination,
							centeredSlides: centered_slides,
							loop: loop,
							longSwipesRatio: 0.09,
							grabCursor: false,
							slideToClickedSlide: slide_to_clicked_slide,
							keyboard: {
								enabled: true,
								onlyInViewport: true,
							},
							on: {
								afterInit: function () {

									if(slider.parent().hasClass("vertical-slider")) {

										$(".vertical-slider .custom-pagination .current-index").text(current_index);
										$(".vertical-slider .custom-pagination .total").text(slides_count);
									}
									else if(slider.parent().hasClass("style-fullscreen style-left")) {

										$(".carousel-slider .custom-pagination .current-index").text(current_index);
										$(".carousel-slider .custom-pagination .total").text(slides_count);
									}
									else if(slider.parent().parent().hasClass("sliced-slider")) {

										$(".sliced-slider .custom-pagination .current-index").text(current_index);
										$(".sliced-slider .custom-pagination .total").text(slides_count);
									}
							    },
								slideChangeTransitionStart: function() {

									if(slider.parent().hasClass("vertical-slider")) {
										if(swiper_slider) {

											current_index = swiper_slider.realIndex + 1;
											current_index = current_index.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

											$(".vertical-slider .custom-pagination .current-index").text(current_index);
										}
									}
									else if(slider.parent().hasClass("style-fullscreen style-left")) {
										if(swiper_slider) {

											current_index = swiper_slider.realIndex + 1;
											current_index = current_index.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

											$(".carousel-slider .custom-pagination .current-index").text(current_index);
										}
									}
									else if(slider.parent().hasClass("big-slider")) {

										var slider_images = slider.parent().find('.big-slider-images'),
											active_id = slider.find('article.swiper-slide-active').attr('data-room-id');

										slider_images.find('.active').removeClass("active");
										slider_images.find('[data-room-id="'+active_id+'"]').addClass("active");
									}
									else if(slider.parent().parent().hasClass("block-slider")) {

										var slider_images = slider.parent().siblings('.block-slider-images'),
											active_id = slider.find('article.swiper-slide-active').attr('data-room-id');

										slider_images.find('.active').removeClass("active");
										slider_images.find('[data-room-id="'+active_id+'"]').addClass("active");
									}
									else if(slider.parent().parent().hasClass("sliced-slider")) {

										var slider_images = slider.parent().siblings('.sliced-slider-images'),
											active_id = slider.find('article.swiper-slide-active').attr('data-room-id');

										slider_images.find('.active').removeClass("active");
										slider_images.find('[data-room-id="'+active_id+'"]').addClass("active");

										
										if(swiper_slider) {

											current_index = swiper_slider.realIndex + 1;
											current_index = current_index.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

											$(".sliced-slider .custom-pagination .current-index").text(current_index);
										}
									}
								},
								touchMove: function() {
									slider.addClass('status-grapping');
								},
								touchEnd: function() {
									slider.removeClass('status-grapping');
								},
							}
						});
					}
				});
			}


		// ----------------------
		// Animations
		// ----------------------
			$('.animate__animated').waypoint(function(direction) {

				var element = $(this.element),
					animation_type = element.attr("data-animation-type"),
					animation_delay = element.attr("data-animation-delay");

				setTimeout(function () {

					element.addClass(animation_type);
		        }, parseInt(animation_delay));

			}, {
				offset: '80%',
			});

	}


	// Reload
	function reload() {

		window.location.reload(false);
	}




/*
 *
 *
 * Misc Functions
 *
 *
*/


	// Detect browser
	function detect_browser() {
		
		if (navigator.userAgent.match(/Edg/i) ){
		    return "edge";
		}
		else if (navigator.userAgent.match(/chrome/i) ){
		    return "chrome";
		}
		else if (navigator.userAgent.match(/firefox/i) ){
		    return "firefox";
		}
	}


	// Get total floating width of an element
	$.fn.totalWidth = function( ) {
		return $(this)[0].getBoundingClientRect().width;
	};


	// Get total floating height of an element
	$.fn.totalHeight = function( ) {
		return $(this)[0].getBoundingClientRect().height;
	};



});
})(jQuery);