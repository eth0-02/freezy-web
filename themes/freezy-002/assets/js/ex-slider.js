( function( $ ) {
	"use strict";

	window.CanvasSlideshowEx = function( options ) {

		/* SCOPE */
		var that = this;

		/* OPTIONS */
		options                     = options || {};
		options.container           = options.hasOwnProperty('container') ? options.container : '';
		options.pixiSprites         = options.hasOwnProperty('sprites') ? options.sprites : [];
		options.displaceScale       = options.hasOwnProperty('displaceScale') ? options.displaceScale : [200, 70];
		options.displacementImage   = options.hasOwnProperty('displacementImage') ? options.displacementImage : '';
		options.wacky               = options.hasOwnProperty('wacky') ? options.wacky : false;
		options.displaceScaleTo     = [ 0, 0 ];

		/* PIXI VARIABLES */
		var renderer            = new PIXI.autoDetectRenderer( 970, 621, { transparent: true });
		var stage               = new PIXI.Container();
		var slidesContainer     = new PIXI.Container();
		var displacementSprite  = new PIXI.Sprite.fromImage( options.displacementImage );
		var displacementFilter  = new PIXI.filters.DisplacementFilter( displacementSprite );

		/* SLIDES ARRAY INDEX */
		this.currentIndex = 0;

		/* INITIALISE PIXI */
		this.initPixi = function() {

			// Add canvas to the HTML
			document.getElementsByClassName(options.container)[0].appendChild( renderer.view );

			// Add child container to the main container
			stage.addChild( slidesContainer );

			// Fit renderer to the screen
			displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

			// Set the filter to stage and set some default values for the animation
			stage.filters = [displacementFilter];
			if ( options.wacky === true ) {
				displacementSprite.anchor.set(0.5);
				displacementSprite.x = renderer.width / 2;
				displacementSprite.y = renderer.height / 2;
			}
			displacementSprite.scale.x = 2;
			displacementSprite.scale.y = 2;
			stage.addChild( displacementSprite );
		};

		/* LOAD SLIDES TO CANVAS */
		this.loadPixiSprites = function( sprites ) {
			var rSprites = options.sprites;
			for ( var i = 0; i < rSprites.length; i++ ) {
				var texture   = new PIXI.Texture.fromImage( sprites[i] );
				var image     = new PIXI.Sprite( texture );
				if ( i !== 0  ) {
					TweenMax.set( image, { alpha: 0 } );
				}
				slidesContainer.addChild( image );
			}
		};

		/* DEFAULT RENDER/ANIMATION */
		var render = new PIXI.ticker.Ticker();
		render.autoStart = true;
		render.add(function( delta ) {
			renderer.render( stage );
		});

		/* TRANSITION BETWEEN SLIDES */
		var isPlaying   = false;
		var slideImages = slidesContainer.children;
		this.moveSlider = function( newIndex ) {
			isPlaying = true;
			var baseTimeline = new TimelineMax({
				onComplete: function () {
					that.currentIndex = newIndex;
					isPlaying = false;
					if ( options.wacky === true ) {
						displacementSprite.scale.set( 1 );
					}
				},onUpdate: function() {
					if ( options.wacky === true ) {
						displacementSprite.rotation += baseTimeline.progress() * 0.02;
						displacementSprite.scale.set( baseTimeline.progress() * 3 );
					}
				}
			});
			baseTimeline.clear();
			if ( baseTimeline.isActive() ) {
				return;
			}
			baseTimeline
			.to(displacementFilter.scale, 1, { x: options.displaceScale[0], y: options.displaceScale[1], ease: Power1.easeOut  })
			.to(slideImages[that.currentIndex], 0.5, { alpha: 0, ease: Power2.easeOut }, 0.2)
			.to(slideImages[newIndex], 0.5, { alpha: 1, ease: Power2.easeOut }, 0.3)
			.to(displacementFilter.scale, 1, { x: options.displaceScaleTo[0], y: options.displaceScaleTo[1], ease: Power2.easeOut }, 0.3 );
		};

		/* INIT FUNCTIONS */
		this.init = function() {
			that.initPixi();
			that.loadPixiSprites( options.pixiSprites );
		};

		/* START */
		this.init();
		that.moveSlider( 0 );

		/**
			Experience Carousel
		**/
		var ex_slider = new Swiper('.experience-carousel .swiper-container', {
			effect: 'fade',
			speed: 1500,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		    preventInteractionOnTransition: true,
			on: {
				init: function() {
					setTimeout(function(){
						$('.experience-carousel').find('.swiper-slide.swiper-slide-active').addClass('animate-active');
					}, 500);
				},
				slideChange: function() {
					var swiper = this;
					that.moveSlider( swiper.realIndex );

					$('.experience-carousel').find('.swiper-slide').removeClass('animate-active');
					$('.experience-carousel').find('.swiper-slide').eq(swiper.realIndex).addClass('animate-active');
				}
			}
		});

		$('.experience-carousel .swiper-buttons > div').addClass('enabled');
	};

	if($('.slide-ex-item__image').length) {
		var spriteImagesEx = document.querySelectorAll( '.slide-ex-item__image' );
		var displacement_img_path = document.querySelectorAll( '.experience-carousel' )[0].dataset.dispimgpath;
		var spriteImagesExSrc = [];
		for ( var i = 0; i < spriteImagesEx.length; i++ ) {
			var img = spriteImagesEx[i];
			spriteImagesExSrc.push( img.getAttribute('src' ) );
		}
		var initCanvasSlideshowEx = new CanvasSlideshowEx({
			container: 'slides-ex-items__image',
			sprites: spriteImagesExSrc,
			displacementImage: displacement_img_path,
			wacky: true
		});
	}

} )( jQuery );
