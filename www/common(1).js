var langArr = ["vi-VN", "en-US"];
$(document).ready(function () {
    //var height = window.innerHeight;
    //var heightvideo = $('#bg-video').height();
    //if (heightvideo > height) {
    //    $('.main-intro').height(height);

    //}
    //$(window).resize(function () {
    //    if (heightvideo > height)
    //        $('.main-intro').height(height);
    //});
    let url = window.location.href;
    if (url.includes('en-US')) {
        localStorage.setItem('lang', 'en-US');
    } else {
        localStorage.setItem('lang', 'vi-VN');
    }
    
    if (checkAssignLang(window.location.href, langArr)) {
        currentLang = checkAssignLang(window.location.href, langArr);
        localStorage.setItem('lang', currentLang);
    }
    changeLangImg(localStorage.getItem('lang'));
    $('#btn-register').click(function () {
        var lang = localStorage.getItem('lang') || 'vi-VN';
        window.open(
            'https://forms.gle/aJMWihsaMsZc9WKv5',
            '_blank' 
          );
    });
    /*if (window.location.href.includes(localStorage.getItem('lang')) == false) {
        if (window.location.href != window.location.origin + '/') {
            currentLang = localStorage.getItem('lang') || "vi-VN";
            currentLink = $("#current-val-href").attr('val').toString();
            // hotlink career screen
            if (currentLink.toLowerCase().indexOf("career") !== -1) { 
                location.href = window.location.origin + "/" + currentLang + window.location.pathname;
                localStorage.setItem('lang', currentLang);
            }
            else {
                result = currentLang + currentLink;
                location.href = window.location.origin + "/" + result;
            }
        
        }
        else {
            localStorage.setItem('lang', 'vi-VN');
        }
        
    }*/
    var lang = localStorage.getItem('lang') || 'vi-VN';
    if (lang == 'vi-VN') {
        $('.tit-lang').children().text('VN');
    }
    if (lang == 'en-US') {
        $('.tit-lang').children().text('EN');
    }

});
function ChangeLang(lang, controller, action, countryName, id) {
    localStorage.setItem("lang", lang);
    //$('.tit-lang').children().text(lang)
    changeLangImg(lang);
    if (countryName) {
        location.href = "/" + lang + '/' + controller + '/' + countryName;
    }
    else {
        if (id) {
            location.href = "/" + lang + '/' + controller + '/' + action + '/' + id;
        }
        else {
            location.href = "/" + lang + '/' + controller + '/' + action
        }
    }
   
}
function changeLangImg(lang) {
    switch (lang) {
        case "en-US":
            $('#language-flag-vn').hide();
            $('#language-flag-en').show();
            break;
        case "vi-VN":
            $('#language-flag-en').hide();
            $('#language-flag-vn').show();
            break;
        default:
            $('#language-flag-en').hide();
            $('#language-flag-vn').show();
            break;
    }
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkAssignLang(url, langArr) {
    let result = false
    langArr.forEach(function (item) {
        if (url.indexOf(item) !== -1) {
            result = item;
        }
    })
    return result;
}