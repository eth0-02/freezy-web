/**
*	Aster - Portfolio Agency Template (HTML)
*	Version: 1.0
*	Author: beshleyua
*	Author URL: http://themeforest.net/user/beshleyua
*	Copyright Aster by beshleyua. All Rights Reserved.
**/

( function( $ ) {
	'use strict';

/**
	Preloader
**/
$(window).on("load", function() {
	$('body').imagesLoaded( {}, function() {
		var preload = $('.preloader');
		preload.addClass('loaded');
		preload.find('.centrize').fadeOut();

			/**
				init Cursor
			**/
			initCursor();

			/**
				init Scrolla
			**/
			$('.scroll-animate').scrolla({
				once: true,
				mobile: true
			});

			/**
				init Hero Slider
			**/
			if($('.main-slider-items__image').length) {
			initMainSlider();
			}

			/**
				init Full Slider
			**/

			if($('.full-slider-items__image').length) {
			initFullSlider();
			}

			/**
				init Half Slider
			**/
			if($('.half-slider-items__image').length) {
			initHalfSlider();
			}

			/**
				init Hero Started
			**/
			if($('.started-items__image').length) {
			initHeroStarted();
			}

	});
});

$(function() {
	'use strict';

	/**
	 	Nav White
	**/
	if ($('.hero-main-slider').length || $('.main-slider').length || $('.full-slider').length || $('.hero-started').length || $('.archive .shop-page-started').length || $('.section.m-works-carousel.fully').length) {
		$('body').addClass('nav-white');
		$('body').addClass('nav-white-logo');
	}
	if ($(window).width() < 768) {
		if ($('.half-slider').length) {
			$('body').addClass('nav-white');
		}
	}

	/**
		Sections full height
	**/
	setHeightFullSection();
	$(window).resize(function() {
		setHeightFullSection();
	});

	/**
		Parallax
	**/
	$('.js-parallax').jarallax({
		speed: 0.65,
		type: 'scroll'
	});

	/**
		Splitting
	**/
	Splitting();

	/**
		Skrollr
	**/
	if ($(window).width() > 1200 ) {
	var s = skrollr.init();
	}

	/**
		Header Sticky
	**/
	if($('.header').length && $('.page-white').length) {
		$(window).on('scroll', function(event){
			//console.log(this.oldScroll > this.scrollY);

			if ( $(window).scrollTop() > 100 ) {
				$('.header').addClass('sticky');
				if ( this.oldScroll < this.scrollY ) {
					$('.header').addClass('animate-in');
				} else {
					if ( $(window).scrollTop() < 200 ) {
						$('.header').addClass('animate-out');
					}
				}
			} else {
				$('.header').removeClass('sticky');
				$('.header').removeClass('animate-in');
				$('.header').removeClass('animate-out');
			}

			this.oldScroll = this.scrollY;
		});
	}

	function checkScrollDirectionIsUp(event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0;
		}
		return event.deltaY < 0;
	}

	/* Hero Main Slider */
	var st_image_slider = new Swiper('.hero-main-slider .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 5000
		},
		speed: 1000,
		mousewheel: true,
		watchSlidesProgress: true,
		pagination: {
			el: '.hero-main-slider .swiper-pagination',
		},
		navigation: {
			nextEl: '.hero-main-slider .swiper-button-next',
			prevEl: '.hero-main-slider .swiper-button-prev',
		},
		on: {
			progress: function(){
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress, innerOffset = swiper.width * 0.5, innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(".slide").style.transform = "translateX(" + innerTranslate + "px)";
				}
			},
			touchStart: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".slide").style.transition = speed + "ms";
				}
			},
			slideChangeTransitionStart: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
					$('.hero-main-slider .swiper-slide').removeClass('animate-active');
					$('.hero-main-slider .swiper-slide-active').addClass('animate-active');

					if ( $('.hero-main-slider .swiper-slide-active').find('.dark').length ) {
						if ( ! $('body').hasClass('dark-first') ) {
							$('body').addClass('dark-first');
						}
					} else {
						$('body').removeClass('dark-first');
					}
				}
			},
			init: function() {
				var swiper = this;

				setTimeout(function(){
					$('.hero-main-slider .swiper-slide-active').addClass('animate-active');
				}, 500);

				if ( $('.hero-main-slider .swiper-slide-active').find('.dark').length ) {
					if ( ! $('body').hasClass('dark-first') ) {
						$('body').addClass('dark-first');
					}
				} else {
					$('body').removeClass('dark-first');
				}
			}
		}
	});

	/**
		Works Carousel
	**/
	var works_carousel = new Swiper('.m-works-carousel.default .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 50,
		centeredSlides: true,
		speed: 1000,
		loop: true,
		mousewheel: true,
		preventInteractionOnTransition: true,
		navigation: false,
		pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 3,
			},
		}
	});

	/**
		Works Carousel
	**/
	var works_carousel = new Swiper('.m-works-carousel.fully .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 0,
		centeredSlides: true,
		speed: 1000,
		loop: true,
		mousewheel: true,
		preventInteractionOnTransition: true,
		navigation: false,
		pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 3,
			},
		}
	});

	/**
		Carousel Testimonials
	**/
	$('.js-testimonials').each(function() {
    var swiperTestimonials = new Swiper('.js-testimonials', {
        slidesPerView: 2,
		    spaceBetween: 50,
		    pagination: {
        el: '.swiper-pagination',
			    clickable: true
        },
		    breakpoints: {
					0: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 1,
					},
					1024: {
						slidesPerView: 2,
					},
					1280: {
						slidesPerView: 3,
					},
        }
		});
  });

	/**
		Menu Full Overlay
	**/
	$('.header').on('click', '.menu-btn.full', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).addClass('no-touch');
			$('body').removeClass('no-scroll');
			$('.menu-full-overlay').removeClass('is-open');
			$('.menu-full-overlay').removeClass('has-scroll');
			$('.menu-full-overlay').removeClass('animate-active');
			setTimeout(function(){
				$('.menu-full-overlay').removeClass('visible');
				$('.menu-btn.full').removeClass('no-touch');
			}, 1000);
		}
		else {
			$(this).addClass('active no-touch');
			var height = $(window).height();
			$('.menu-full-overlay').css({'height': height});
			$('body').addClass('no-scroll');
			$('.menu-full-overlay').addClass('is-open visible');
			setTimeout(function(){
				$('.menu-full-overlay').addClass('has-scroll animate-active');
				$('.menu-btn.full').removeClass('no-touch');
			}, 1000);
		}
		return false;
	});

	/**
		Menu Full Overlay Submenu
	**/
	$('.menu-full').on('click', '.has-children > a', function(){
		if($(this).closest('li').hasClass('opened')) {
			$(this).closest('li').removeClass('opened');
			$(this).closest('li').addClass('closed');
			$(this).closest('li').find('> ul').css('max-height', 0);
		} else {
			$(this).closest('ul').find('> li').removeClass('closed').removeClass('opened');
			$(this).closest('ul').find('> li').find('> ul').css('max-height', 0);

			$(this).closest('li').addClass('opened');

			var submenu_h = 0;
			$(this).closest('li').find('> ul > li').each(function(){
				submenu_h += $(this).height() + 20;
			});
			$(this).closest('li').find('> ul').css('max-height', submenu_h + 20);
		}
		return false;
	});

	/**
		Gallery Carousel
	**/
	var gallery_carousel = new Swiper('.m-gallery-carousel .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 100,
		speed: 700,
		loop: false,
		pagination: false,
		breakpoints: {
			0: {
				spaceBetween: 30,
			},
			768: {
				spaceBetween: 50,
			},
			1200: {
				spaceBetween: 100,
			},
		}
	});

	/*
		Initialize gallery items
	*/
	var $container_gallery = $('.m-gallery .row');
	$container_gallery.imagesLoaded(function() {
		$container_gallery.isotope({
			itemSelector: '.col-xs-12',
			percentPosition: true,
		});
	});

	/*
		Initialize portfolio items
	*/
	var $container = $('.works-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.works-col',
			percentPosition: true,
		});
	});

	/*
		Filter items on button click
	*/
	$('.filter-links').on( 'click', 'a', function() {
		var filterValue = $(this).attr('data-href');
		$container.isotope({ filter: filterValue });

		$('.filter-links a').removeClass('active');
		$(this).addClass('active');

		if (!$(filterValue).find('.scroll-animate').hasClass('animate__active')) {
			$(filterValue).find('.scroll-animate').addClass('animate__active');
		}

		return false;
	});

	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});

	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});

	/*
		Music popup
	*/
	$('.has-popup-audio').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
      var gallery = $(this).attr('href');

      $(gallery).magnificPopup({
          delegate: 'a',
          type:'image',
          closeOnContentClick: false,
          mainClass: 'mfp-fade',
          removalDelay: 160,
          fixedContentPos: false,
          gallery: {
              enabled: true
          }
      }).magnificPopup('open');

      return false;
  });

	/**
		Tabs
	**/
	$('.tab-menu').on('click', '.tab-btn', function(){
		var tab_bl = $(this).attr('href');

		$(this).closest('.tab-menu').find('li').removeClass('active');
		$(this).closest('li').addClass('active');

		$(this).closest('.tabs').find('> .tab-item').hide();
		$(tab_bl).fadeIn();

		return false;
	});

	/**
		Collapse
	**/
	$('.collapse-item').on('click', '.collapse-btn', function(){
		if($(this).closest('.collapse-item').hasClass('active')) {
			$(this).closest('.collapse-item').find('.collapse-content').slideUp();
			$(this).closest('.collapse-item').removeClass('active');
			$(this).removeClass('active');
		}
		else {
			$(this).closest('.collapse-item').find('.collapse-content').slideDown();
			$(this).closest('.collapse-item').addClass('active');
			$(this).addClass('active');
		}
	});

	/**
		Video
	**/
	$('.m-video-large .video').on('click', '.play, .img', function(){
		$(this).closest('.video').addClass('active');
		var iframe = $(this).closest('.video').find('.js-video-iframe');

		largeVideoPlay(iframe);

		return false;

	});

	function largeVideoPlay( iframe ) {
		var src = iframe.data('src');
		iframe.attr('src', src);
	}

	/*
		Validate Contact Form
	*/
	if($('.contacts-form').length) {
		$('#cform').validate({
			rules: {
				name: {
					required: true
				},
				message: {
					required: true
				},
				email: {
					required: true,
					email: true
				}
			},
			success: 'valid',
			submitHandler: function() {
				return true;
			}
		});
	}

});

function initCursor() {
	var mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;

	var cursor = {
		el: $('.cursor'),
		x: window.innerWidth/2,
		y: window.innerHeight/2,
		w: 30,
		h: 30,
		update:function() {
			var l = this.x-this.w/2;
			var t = this.y-this.h/2;
			this.el.css({ 'transform':'translate3d('+l+'px,'+t+'px, 0)' });
		}
	}

	$(window).mousemove (function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	$('a, .swiper-pagination, .swiper-buttons, button, .button, .btn').hover(function() {
		$('.cursor').addClass("cursor-zoom");
	}, function(){
		$('.cursor').removeClass("cursor-zoom");
	});

	setInterval(move,1000/60);

	function move() {
		cursor.x = lerp (cursor.x, mouseX, 0.1);
		cursor.y = lerp (cursor.y, mouseY, 0.1);
		cursor.update()
	}

	function lerp (start, end, amt) {
		return (1-amt)*start+amt*end
	}
}

function setHeightFullSection() {
	var width = $(window).width();
	var height = $(window).height();

	/* Set full height in started blocks */
	$('.section.hero-main-slider, .section.main-slider, .section.full-slider, .section.half-slider, .section.m-works-carousel, .section.m-contacts-map, .error-page, .section.hero-started, .menu-full-overlay, .preloader .centrize').css({'height': height});
	if(width < 783) {
		$('.section.hero-main-slider, .section.main-slider, .section.full-slider, .section.half-slider, .section.m-works-carousel, .section.m-contacts-map, .error-page, .section.hero-started, .menu-full-overlay, .preloader .centrize').css({'height': height});
	}
}

} )( jQuery );
