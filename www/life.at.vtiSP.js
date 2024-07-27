$(document).ready(function () {
    $('.is-mobile .life-at-vti .slider-for').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
    });

    $('.collapse-toggle').on('click', function () {
        let isColapsed = $(this).parent().hasClass('collapsed');
        if (isColapsed) {
            $(this).parent().removeClass('collapsed');
        } else {
            $(this).parent().addClass('collapsed');
        }
        
    })
});
