$(document).ready(function () {
	$('#hot-job').gallery();
	$('.btn-seeJob').click(function () {
		var lang = localStorage.getItem('lang') || 'vi-VN';
		window.location.href = location.origin + "/" + lang + '/Career/Vietnam' 
	});
});

function SyncWithOfSpan() {
	var maxWidth = -1;
	var minWidth = -1;

	$('.span-title').each(function () {
		maxWidth = maxWidth > $(this).width() ? maxWidth : $(this).width();
		minWidth = (minWidth <= 0 || minWidth > $(this).width()) ? $(this).width() : minWidth;
	});

	$('.span-title').each(function () {
		/*
		//if ($(this).width() === 0) {
	 //      } else if ($(this).width() > 0 && $(this).width() < maxWidth) {
		//	var maxLine = maxWidth / minWidth;
		//	var currentLine = $(this).width() / minWidth;
		//	var addPadding = (maxLine - 1 - currentLine) * minWidth * 7 / 10;
		//	var padding = maxWidth * ($(this).width() / maxWidth) * 3 / 10 + addPadding;
		//	$(this).css({ "padding-right": padding + "px" });
		//	$(this).css({ "padding-left": padding + "px" });
		//} else {

		//}
		*/
		$(this).css({ "width": maxWidth + "px" });
		$(this).css("display", "flex");
		$(this).css("align-items", "center");
		$(this).css("justify-content", "center");
	});
	
}

(function ($, undefined) {

	/*
	 * Gallery object.
	 */
	$.Gallery = function (options, element) {
		this.$el = $(element);
		this._init(options);
	};

	$.Gallery.defaults = {
		current: 0,	// index of current item
		autoplay: true,// slideshow on / off
		interval: 3000  // time between transitions
	};

	$.Gallery.prototype = {
		_init: function (options) {

			this.options = $.extend(true, {}, $.Gallery.defaults, options);

			this.$wrapper = this.$el.find('.dg-wrapper');

			this.$items = this.$wrapper.children();
			this.itemsCount = this.$items.length;

			this.$navPrev = this.$el.find('.nar-arrow-left');
			this.$navNext = this.$el.find('.nar-arrow-right');

			this.current = this.options.current;

			this.$items.css({
				'opacity': 0,
				'visibility': 'hidden'
			});

			this._validate();

			// calc padding title
			SyncWithOfSpan();

			this._layout();

			// load the events
			this._loadEvents();

			// slideshow
			if (this.options.autoplay) {

				this._startSlideshow();

			}

		},
		_validate: function () {

			if (this.options.current < 0 || this.options.current > this.itemsCount - 1) {

				this.current = 0;

			}

		},
		_layout: function () {

			// current, left and right items
			this._setItems();

			// current item is not changed
			// left and right one are rotated and translated
			var leftCSS, rightCSS, currentCSS;

			leftCSS = {
				'-webkit-transform': 'translate(-50%) scale(0.7)',
				'-moz-transform': 'translate(-50%) scale(0.7)',
				'-o-transform': 'translate(-50%) scale(0.7)',
				'-ms-transform': 'translate(-50%) scale(0.7)',
				'transform': 'translate(-50%) scale(0.7)'
			};

			rightCSS = {
				'-webkit-transform': 'translate(50%) scale(0.7)',
				'-moz-transform': 'translate(50%) scale(0.7)',
				'-o-transform': 'translate(50%) scale(0.7)',
				'-ms-transform': 'translate(50%) scale(0.7)',
				'transform': 'translate(50%) scale(0.7)'
			};

			currentCSS = {
				'z-index': 999
			};

			leftCSS.opacity = 1;
			leftCSS.visibility = 'visible';
			rightCSS.opacity = 1;
			rightCSS.visibility = 'visible';

			this.$leftItm.css(leftCSS || {});
			this.$rightItm.css(rightCSS || {});

			this.$currentItm.css(currentCSS || {}).css({
				'opacity': 1,
				'visibility': 'visible'
			}).addClass('dg-center');

		},
		_setItems: async function () {

			this.$currentItm = this.$items.eq(this.current);
			this.$leftItm = (this.current === 0) ? this.$items.eq(this.itemsCount - 1) : this.$items.eq(this.current - 1);
			this.$rightItm = (this.current === this.itemsCount - 1) ? this.$items.eq(0) : this.$items.eq(this.current + 1);

			// this.$items.removeClass('dg-center');
			this.$currentItm.addClass('dg-center');

			this.$items.not(this.$currentItm).css('z-index', 1);
			this.$currentItm.css('z-index', 999);

			// next & previous items
			if (this.itemsCount > 3) {

				// next item
				this.$nextItm = (this.$rightItm.index() === this.itemsCount - 1) ? this.$items.eq(0) : this.$rightItm.next();
				this.$nextItm.css(this._getCoordinates('outright'));

				// previous item
				this.$prevItm = (this.$leftItm.index() === 0) ? this.$items.eq(this.itemsCount - 1) : this.$leftItm.prev();
				this.$prevItm.css(this._getCoordinates('outleft'));
			}
			// await this._timeout(250);
			$(".dg-over-lay").not(this.$currentItm).addClass('over-lay');
			await this._timeout(600);
			this.$items.not(this.$currentItm).removeClass('dg-center');
			
		},
		_loadEvents: function () {

			var _self = this;

			this.$navPrev.on('click.gallery', function (event) {
				var _btnPrev = $(this);
				if (_self.options.autoplay) {

					clearTimeout(_self.slideshow);
					_self.options.autoplay = true;

				}
				_btnPrev.css('pointer-events', 'none');
				_self._navigate('prev');
				setTimeout(function () {
					_btnPrev.css('pointer-events', '');
				}, 600);
				if (_self.options.autoplay) {
					_self._startSlideshow()

				}
				return false;
			});

			this.$navNext.on('click.gallery', function (event) {
				var _btnNext = $(this);
				if (_self.options.autoplay) {

					clearTimeout(_self.slideshow);
					_self.options.autoplay = true;

				}
				_btnNext.css('pointer-events', 'none');
				_self._navigate('next');
				setTimeout(function () {
					_btnNext.css('pointer-events', '');
				}, 600);
				if (_self.options.autoplay) {
					_self._startSlideshow()

				}
				return false;

			});

			this.$wrapper.on('webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function (event) {

				_self.$currentItm.addClass('dg-center');
				_self.$items.removeClass('dg-transition');
			});

		},
		_getCoordinates: function (position) {
			switch (position) {
				case 'outleft':
					return {
						'opacity': 0,
						'visibility': 'hidden'
					};
					break;
				case 'outright':
					return {
						'opacity': 0,
						'visibility': 'hidden'
					};
					break;
				case 'left':
					return {
						'-webkit-transform': 'translate(-50%) scale(0.7)',
						'-moz-transform': 'translate(-50%) scale(0.7)',
						'-o-transform': 'translate(-50%) scale(0.7)',
						'-ms-transform': 'translate(-50%) scale(0.7)',
						'transform': 'translate(-50%) scale(0.7)',
						'opacity': 1,
						'visibility': 'visible'
					};
					break;
				case 'right':
					return {
						'-webkit-transform': 'translate(50%) scale(0.7)',
						'-moz-transform': 'translate(50%) scale(0.7)',
						'-o-transform': 'translate(50%) scale(0.7)',
						'-ms-transform': 'translate(50%) scale(0.7)',
						'transform': 'translate(50%) scale(0.7)',
						'opacity': 1,
						'visibility': 'visible'
					};
					break;
				case 'center':
					return {
						'-webkit-transform': 'translate(0px) scale(1)',
						'-moz-transform': 'translate(0px) scale(1)',
						'-o-transform': 'translate(0px) scale(1)',
						'-ms-transform': 'translate(0px) scale(1)',
						'transform': 'translate(0px) scale(1)',
						'opacity': 1,
						'visibility': 'visible'
					};
					break;
			};

		},
		_navigate: async function (dir) {
			switch (dir) {

				case 'next':

					this.current = this.$rightItm.index();

					// current item moves left
					this.$currentItm.addClass('dg-transition').css(this._getCoordinates('left'));

					// right item moves to the center
					this.$rightItm.addClass('dg-transition').css(this._getCoordinates('center'));

					// next item moves to the right
					if (this.$nextItm) {

						// left item moves out
						this.$leftItm.addClass('dg-transition').css(this._getCoordinates('outleft'));

						this.$nextItm.addClass('dg-transition').css(this._getCoordinates('right'));
					}
					else {
						// left item moves right
						this.$leftItm.addClass('dg-transition').css(this._getCoordinates('right'));
					}
					break;
				case 'prev':

					this.current = this.$leftItm.index();

					// current item moves right
					this.$currentItm.addClass('dg-transition').css(this._getCoordinates('right'));

					// left item moves to the center
					this.$leftItm.addClass('dg-transition').css(this._getCoordinates('center'));

					// prev item moves to the left
					if (this.$prevItm) {

						// right item moves out
						this.$rightItm.addClass('dg-transition').css(this._getCoordinates('outright'));

						this.$prevItm.addClass('dg-transition').css(this._getCoordinates('left'));

					}
					else {

						// right item moves left
						this.$rightItm.addClass('dg-transition').css(this._getCoordinates('left'));

					}
					break;
			};

			this._setItems();
		},
		_startSlideshow: function () {

			var _self = this;

			this.slideshow = setTimeout(function () {

				_self._navigate('next');

				if (_self.options.autoplay) {

					_self._startSlideshow();

				}

			}, this.options.interval);

		},
		destroy: function () {

			this.$navPrev.off('.gallery');
			this.$navNext.off('.gallery');
			this.$wrapper.off('.gallery');

		},
		_timeout: function (interval) {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(interval);
				}, interval);
			});
		}
	};

	var logError = function (message) {
		if (this.console) {
			console.error(message);
		}
	};

	$.fn.gallery = function (options) {

		if (typeof options === 'string') {

			var args = Array.prototype.slice.call(arguments, 1);

			this.each(function () {

				var instance = $.data(this, 'gallery');

				if (!instance) {
					logError("cannot call methods on gallery prior to initialization; " +
						"attempted to call method '" + options + "'");
					return;
				}

				if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
					logError("no such method '" + options + "' for gallery instance");
					return;
				}

				instance[options].apply(instance, args);

			});

		}
		else {

			this.each(function () {

				var instance = $.data(this, 'gallery');
				if (!instance) {
					$.data(this, 'gallery', new $.Gallery(options, this));
				}
			});

		}

		return this;

	};

})(jQuery);