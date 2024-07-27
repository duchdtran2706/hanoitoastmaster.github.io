$(document).ready(function () {
    defineCapchaBoxWidth();
    var isLogin = $("#isLogin").val();
    window.localStorage.setItem("isLogin", isLogin);
    if (!window.location.href.toLowerCase().includes("career")) {
        // remove old local storage data
        sessionStorage.removeItem("fromJobDetail");
        sessionStorage.removeItem("jobFilterData");
        sessionStorage.removeItem("jobFilterSearchValue");
    }

    // [UI] Animation when document ready
    //$('.home-about-section').addClass('fadeInUp-ab');
    //$('.home-about-section').addClass('animated');

    // clear local storage when click a link
    $('ul.w-nav-list a').on('click', function () {
        localStorage.setItem("currentPage", 1);
    });
    checkScreenPosition();
    // action when scroll to statistic area
    $(window).scroll(startCounterUp);

    jQuery(function ($) {

        // Function which adds the 'animated' class to any '.animatable' in view
        var doAnimations = function () {

            // Calc current offset and get all animatables
            var offset = $(window).scrollTop() + $(window).height(),
                $animatables = $('.animatable');

            // Unbind scroll handler if we have no animatables
            if ($animatables.length == 0) {
                $(window).off('scroll', doAnimations);
            }

            // Check all animatables and animate them if necessary
            $animatables.each(function (i) {
                var $animatable = $(this);
                if (($animatable.offset().top + 50) < offset) {
                    $animatable.removeClass('animatable').addClass('animated');
                }
            });

        };

        // Hook doAnimations on scroll, and trigger a scroll
        $(window).on('scroll', doAnimations);
        $(window).trigger('scroll');

    });
});

// [UI] Animation when scroll down
/*$(document).scroll(function () {
    var y = $(this).scrollTop();

    if (y > 1550) {
        $('.home-statistic-section').addClass('fadeInUp');
    }
});
*/
function statisticAnimation() {
    $('.statisticSection .statistic-num').each(function () {
        var endNum = parseInt($(this).attr('val'));
        if (endNum != 0) {
            $(this).countTo({
                from: 0,
                to: endNum,
                speed: 1750,
                refreshInterval: 50,
                onComplete: function () {
                    $('.has-plus').each(function (el, _) {
                        if (this.innerHTML.trim().indexOf("+") < 0) {
                            this.append('++');
                        }
                    });
                    $('.branches').each(function (el, _) {
                        if (this.innerHTML.length < 2) {
                            this.prepend('0');
                        }
                    });
                }
            });
        }
    })
}
function checkScreenPosition() {
    if ($('.statisticSection').length > 0) {
        var hT = $('.statistic-num').offset().top || 0,
            wH = $(window).height(),
            wS = $(window).scrollTop();
        if (wS > hT - wH) {
            $('.statisticSection .statistic-num').each(function () {
                $(this).text($(this).attr('val'));
            })
            $('.has-plus').each(function (el, _) {
                if (this.innerHTML.trim().indexOf("+") < 0) {
                    this.append('++');
                }
            });
        }
    }

}

function startCounterUp() {
    if ($('.statisticSection').length > 0) {
        var hT = $('.statistic-num').offset().top || 0,
            wH = $(window).height(),
            wS = $(window).scrollTop();
        if (wS > hT- wH) {
            $(window).off("scroll", startCounterUp);
            statisticAnimation();
        }
    }
        
}

function defineCapchaBoxWidth() {
    
    var innerContentWidth = window.innerWidth - 40 - (window.innerWidth / 10) - 17;
    if (innerContentWidth < 304) {
        var ratio = innerContentWidth / 304;
        $(".g-recaptcha").css("transform", "scale( " + ratio + ")");
    }
}


