let currentLink = window.location.href;
let baseHomeLink = window.location.origin + '/';
let homeLink = window.location.origin + "/" + localStorage.getItem('lang');
let pageURL = [{ subLinks: homeLink + '/MyAccount', id: 'myaccount-page', mbID: 'myaccount-page-mb' },
{ subLinks: homeLink + '/Blog', id: 'blogs-page', mbID: 'blogs-page-mb' },
{ subLinks: homeLink + '/Career', id: 'career-page', mbID: 'career-page-mb' },
{ subLinks: homeLink + '/WhyVTI', id: 'whyvti-page', mbID: 'whyvti-page-mb' },
{ subLinks: homeLink + '/News', id: 'news-page', mbID: 'news-page-mb' },
{ subLinks: homeLink + '/QA', id: 'qa-page', mbID: 'qa-page-mb' },
{ subLinks: homeLink + '/ContactUs', id: 'contactus-page', mbID: 'contactus-page-mb' }];

$(document).ready(function () {
    dropdown();

    $('.loginDropdown').click(function () {
        document.getElementById("myLinks").style.display = "none";
    });

    beforeNavigate();
    activeCurrentPage();
    activeFooterCurrentPage();

    //Click outside then auto close navigator
    $(document).mouseup(function (e) {
        var container = $("#toggle-menu-icon, #myLinks");
        let windowWidth = $(window).width();
        var headerNavbar = document.getElementById("myLinks");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && windowWidth <= 1024 && headerNavbar.style.display === 'block') {
            showMenu();
        }
    });
});

function activeCurrentPage() {
    if (currentLink === baseHomeLink || currentLink === homeLink || currentLink === homeLink + "/"
        || currentLink.toLocaleLowerCase().includes(homeLink.toLocaleLowerCase() + '/home')) {
        $('#home-page').addClass('current-link');
        $('#home-page-mb').addClass('current-link');
        return;
    }

    for (let e of pageURL) {
        if (currentLink.toLowerCase().includes(e.subLinks.toLowerCase())) {
            $('#' + e.id).addClass('current-link');
            $('#' + e.mbID).addClass('current-link');
            return;
        }
    }
}
function activeFooterCurrentPage() {
    if (currentLink === baseHomeLink || currentLink === homeLink || currentLink === homeLink + "/"
        || currentLink.toLocaleLowerCase().includes(homeLink.toLocaleLowerCase() + '/home')) {
        $('#footer-home-page').addClass('current-link');
        $('#footer-home-page-mb').addClass('current-link');
        return;
    }

    for (let e of pageURL) {
        if (currentLink.toLowerCase().includes(e.subLinks.toLowerCase())) {
            $('#footer-' + e.id).addClass('current-link');
            $('#footer-' + e.mbID).addClass('current-link');
            return;
        }
    }
}

function showMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        $('.l-subheader a.icon-menu-link').toggleClass('is-drop-active');
        $('#myLinks').stop(true, true).slideToggle();
        $("#menu-toggle-wrapper .icon-menu").toggleClass("close-menu");
    } else {
        $('.l-subheader a.icon-menu-link').toggleClass('is-drop-active');
        $('#myLinks').stop(true, true).slideToggle();
        $("#menu-toggle-wrapper .icon-menu").toggleClass("close-menu");
    }

}

function beforeNavigate() {
    $(".clickNav").on("click", function () {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            $('.l-subheader a.icon-menu-link').toggleClass('is-drop-active');
            $('#myLinks').hide();
            $("#menu-toggle-wrapper .icon-menu").toggleClass("close-menu");
        }
    });

}

function dropdown() {
    $('.w-nav-anchor').click(function () {
        var dropItems = $(this).siblings('.ma-list-mobile');
        var displayIcon = $(this).children('.w-nav-arrow-mobile');
        dropItems.toggleClass("show-item");
        if (dropItems.css("display") == "none") {
            displayIcon.children('.see-more').css("display", "none");
            displayIcon.children('.see-less').css("display", "unset");
        }
        else {
            displayIcon.children('.see-more').css("display", "unset");
            displayIcon.children('.see-less').css("display", "none");
        }
        dropItems.stop().slideToggle('slow');
    });
}
