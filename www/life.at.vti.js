var currentSlideIndex = -1;
var isCancelAutoMove = false;
$(document).ready(function () {
    $('#slider-container').slider();
    $("#cnt-lifeatVTI1").css("display", "block");
    hoverBtnShowContent();
    $("#btn-lifeatVTI1").addClass("active-btn");
    $("#Vector1").addClass("active-icon");
});

(function ($, undefined) {
    $.Slider = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };

    $.Slider.defaults = {
        current: 0,	// index of current item
        autoplay: true,// slideshow on / off
        interval: 8000  // time between transitions
    };
    $.Slider.prototype = {
        _init: function (options) {

            this.options = $.extend(true, {}, $.Slider.defaults, options);

            this.$topBody = this.$el.find('.top-body');
            this.$bottomBody = this.$el.find('.bottom-body');

            this.$wrapper = this.$topBody.find('.slider-container');
            this.$bottomWrapper = this.$bottomBody.find('.bottom-slider-container');

            this.$items = this.$wrapper.children();
            this.itemsCount = this.$items.length;

            this.$bottomItems = this.$bottomWrapper.children();
            this.bottomItemsCount = this.$bottomItems.length;

            this.$navPrev = this.$el.find('.nar-arrow-left');
            this.$navNext = this.$el.find('.nar-arrow-right');

            this.current = this.options.current;

            //this.$items.css({
            //    'opacity': 0,
            //    'visibility': 'hidden'
            //});

            this._validate();

            this._setItems();

            // load the events
            this._loadEvents();

            // set current item
            this.$currentItm.addClass('active-left');
            this.$currentBtmItm.addClass('opacity-off');

            // slideshow
            if (this.options.autoplay) {
                this._startSlideshow();
            }

        },
        _setItems: async function () {
            this.$currentItm = this.$items.eq(this.current);
            this.$currentBtmItm = this.$bottomItems.eq(this.current);
            this.$leftItm = (this.current === 0) ? this.$items.eq(this.itemsCount - 1) : this.$items.eq(this.current - 1);
            this.$rightItm = (this.current === this.itemsCount - 1) ? this.$items.eq(0) : this.$items.eq(this.current + 1);
        },
        _validate: function () {

            if (this.options.current < 0 || this.options.current > this.itemsCount - 1) {

                this.current = 0;

            }

        },
        _loadEvents: function () {
            var _self = this;

            this.$navPrev.on('click.slider', function (event) {
                var _btnPrev = $(this);
                if (_self.options.autoplay) {
                    clearTimeout(_self.slideshow);
                }

                _btnPrev.css('pointer-events', 'none');
                _self._navigate('prev');
                setTimeout(function () {
                    _btnPrev.css('pointer-events', '');
                    _self._removeInactiveClass();
                }, 500);

                if (_self.options.autoplay) {
                    _self._startSlideshow();
                }
                return false;
            });

            this.$navNext.on('click.slider', function (event) {
                var _btnNext = $(this);
                if (_self.options.autoplay) {
                    clearTimeout(_self.slideshow);
                }

                _btnNext.css('pointer-events', 'none');
                _self._navigate('next');
                setTimeout(function () {
                    _btnNext.css('pointer-events', '');
                    _self._removeInactiveClass();
                }, 500);

                //if user click event.ClientX != null else it's autoslider
                if (_self.options.autoplay && event.clientX != null) {
                    _self._startSlideshow();
                }
                return false;
            });

            this.$bottomItems.on('click.slider', function (event) {
                var _bottomSelectedItem = $(this);
                if (_self.options.autoplay) {
                    clearTimeout(_self.slideshow);
                }

                _bottomSelectedItem.css('pointer-events', 'none');
                _self._navigate(_bottomSelectedItem);
                setTimeout(function () {
                    _bottomSelectedItem.css('pointer-events', '');
                    _self._removeInactiveClass();
                }, 500);

                if (_self.options.autoplay) {
                    _self._startSlideshow();
                }
                return false;
            });
        },
        _navigate: async function (dir) {
            switch (dir) {
                case 'next':
                    var _current = this.$rightItm;
                    this.current = this.$rightItm.index();
                    var _currentBtm = this.$bottomItems.eq(this.current);
                    this._removeInactiveClass();
                    this._removeCurrentClass();
                    // current item moves right
                    this.$currentItm.addClass('in-active-right');
                    // right item moves to the center
                    this.$currentBtmItm
                    setTimeout(function () {
                        hideAllSliderItem();
                        _current.addClass('active-right');
                        _currentBtm.addClass('opacity-off');
                    }, 500);
                    break;
                case 'prev':
                    var _current = this.$leftItm;
                    this.current = this.$leftItm.index();
                    var _currentBtm = this.$bottomItems.eq(this.current);
                    this._removeInactiveClass();
                    this._removeCurrentClass();
                    // current item moves left
                    this.$currentItm.addClass('in-active-left');
                    // left item moves to the center
                    setTimeout(function () {
                        hideAllSliderItem();
                        _current.addClass('active-left');
                        _currentBtm.addClass('opacity-off');
                    }, 500);
                    break;
                default:
                    var _self = this;
                    var isMoveNext = dir.index() >= this.current;
                    this.current = dir.index();
                    this._removeInactiveClass();
                    this._removeCurrentClass();
                    // current item moves right
                    if (isMoveNext) {
                        this.$currentItm.addClass('in-active-right');
                        // right item moves to the center
                        setTimeout(function () {
                            var _current = _self.$items.eq(_self.current);
                            var _currentBtm = _self.$bottomItems.eq(_self.current);
                            hideAllSliderItem();
                            _current.addClass('active-right');
                            _currentBtm.addClass('opacity-off');
                        }, 500);
                    }
                    else {
                        this.$currentItm.addClass('in-active-left');
                        // left item moves to the center
                        setTimeout(function () {
                            var _current = _self.$items.eq(_self.current);
                            var _currentBtm = _self.$bottomItems.eq(_self.current);
                            hideAllSliderItem();
                            _current.addClass('active-left');
                            _currentBtm.addClass('opacity-off');
                        }, 500);
                    }
                    break;
            };

            this._setItems();
        },
        _removeInactiveClass: function () {
            var _self = this;
            _self.$items.removeClass("in-active-left");
            _self.$items.removeClass("in-active-right");
        },
        _removeCurrentClass: function () {
            var _self = this;
            _self.$currentItm.removeClass("active-left");
            _self.$currentItm.removeClass("active-right");
            _self.$currentBtmItm.removeClass("opacity-off");
        },
        _startSlideshow: function () {
            var _self = this;
            this.slideshow = setTimeout(function () {
                _self.$navNext.click();
                if (_self.options.autoplay) {
                    _self._startSlideshow();
                }
            }, this.options.interval);
        },
        _timeout: function (interval) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(interval);
                }, interval);
            });
        }
    };

    $.fn.slider = function (options) {
        this.each(function () {
            var instance = $.data(this, 'slider');
            if (!instance) {
                $.data(this, 'slider', new $.Slider(options, this));
            }
        });

        return this;
    };
})(jQuery);

// Fix lifeAtVti slider multi item showing
function hideAllSliderItem() {
    $('.slider-container > div.row', '.top-body').removeClass('active-right');
    $('.slider-container > div.row', '.top-body').removeClass('active-left');
    $('.bottom-slider-container > .slider-preview', '.bottom-body').removeClass('opacity-off');
}

function hoverBtnShowContent() {
    for (let i = 1; i <= 6; i++) {
        $("#btn-lifeatVTI" + i).hover(
            function () {
                $("#btn-lifeatVTI1").removeClass("active-btn");
                $("#Vector1").removeClass("active-icon");
                $(".life-at-vti-content").css("display", "none");
                $("#cnt-lifeatVTI" + i).css("display", "block");

                $(".btn-lifeatVTI").removeClass("active-btn");
                $(".life-vti-icon").removeClass("active-icon");

                $("#btn-lifeatVTI" + i).addClass("active-btn");
                $("#Vector" + i).addClass("active-icon");;

            }
        )
    }
}
