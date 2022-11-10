( function( $ ) {
	"use strict";

	window.CanvasStarted = function( options ) {

		/* SCOPE */
		var that = this;

		/* OPTIONS */
		options                     = options || {};
		options.container           = options.hasOwnProperty('container') ? options.container : '';
		options.pixiSprite          = options.hasOwnProperty('sprite') ? options.sprite : '';
		options.displacementImage   = options.hasOwnProperty('displacementImage') ? options.displacementImage : '';
		options.displaceScale       = [200, 70];
		options.displaceScaleTo     = [ 0, 0 ];

		/* PIXI VARIABLES */
		var renderer            = new PIXI.autoDetectRenderer( 1920, 1080, { transparent: true });
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
			displacementSprite.anchor.set(0.5);
			displacementSprite.x = renderer.width / 2;
			displacementSprite.y = renderer.height / 2;
			displacementSprite.scale.x = 2;
			displacementSprite.scale.y = 2;
			stage.addChild( displacementSprite );
		};

		/* LOAD SLIDES TO CANVAS */
		this.loadPixiSprite = function( sprite ) {
			var texture   = new PIXI.Texture.fromImage( sprite );
			var image     = new PIXI.Sprite( texture );
			slidesContainer.addChild( image );
		};

		/* DEFAULT RENDER/ANIMATION */
		var render = new PIXI.ticker.Ticker();
		render.autoStart = true;
		render.add(function( delta ) {
			renderer.render( stage );
		});

		/* TRANSITION BETWEEN SLIDES */
		var slideImages = slidesContainer.children;
		this.moveSlider = function( newIndex ) {
			var baseTimeline = new TimelineMax({
				onComplete: function () {
					displacementSprite.scale.set( 1 );
				},onUpdate: function() {
					displacementSprite.rotation += baseTimeline.progress() * 0.02;
					displacementSprite.scale.set( baseTimeline.progress() * 3 );
				}
			});
			baseTimeline
			.to(displacementFilter.scale, 1, { x: options.displaceScale[0], y: options.displaceScale[1], ease: Power1.easeOut  })
			.to(slideImages[that.currentIndex], 0.5, { alpha: 0, ease: Power2.easeOut }, 0.2)
			.to(slideImages[newIndex], 0.5, { alpha: 1, ease: Power2.easeOut }, 0.3)
			.to(displacementFilter.scale, 1, { x: options.displaceScaleTo[0], y: options.displaceScaleTo[1], ease: Power2.easeOut }, 0.3 );
		};

		/* INIT FUNCTIONS */
		that.initPixi();
		that.loadPixiSprite( options.pixiSprite );
		that.moveSlider( 0 );

	};

	var width = $(window).width();
	var scr_h = $(window).height();

	/*if( $('.hero-started').length && width >= 1200 ){
        scrollFadeInAnimation();

        $(window).on('scroll', function(){
            scrollFadeInAnimation();
        });
    }

    function scrollFadeInAnimation() {
		var scr_top = $(window).scrollTop();
		var m_started = $('.hero-started');

		if ( m_started.length ){
		    var m_started_t = m_started.offset().top  - scr_top;
		    var m_started_b = m_started.offset().top + scr_h - scr_top;

		    //add shadow & hide content
		    if ( scr_top == 0 ) {
		        m_started.find('.hero-started__shadow').css({'opacity': '0'});
		        m_started.find('.titles, .h-titles').css({'opacity': '1'});
		        m_started.find('.titles, .h-titles').css({'transform': 'translateY(0px)'});
		    } else if ( scr_top >= m_started_t && scr_top <= m_started_b ) {
		        var opacity = (scr_top/(m_started_b/100))/94;
		        m_started.find('.hero-started__shadow').css({'opacity': opacity});
		        m_started.find('.titles, .h-titles').css({'opacity': 1 - opacity});
		        m_started.find('.titles, .h-titles').css({'transform': 'translateY(-'+opacity*100+'px)'});
		    } else if ( scr_top >= m_started_b + 100 ) {

		    }
		}
	}*/

} )( jQuery );

function initHeroStarted() {
	var spriteImgStarted = document.querySelectorAll('.started-item__image')[0].getAttribute('src');
	var displacement_img_path = document.querySelectorAll( '.hero-started' )[0].dataset.dispimgpath;
	var initCanvasStarted = new CanvasStarted({
		container: 'started-items__image',
		sprite: spriteImgStarted,
		displacementImage: displacement_img_path
	});
}
