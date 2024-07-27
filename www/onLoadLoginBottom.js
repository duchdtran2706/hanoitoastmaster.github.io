
$(document).ready(function () {
    var isLogin = $("#isLogin").val();
    var lang = localStorage.getItem('lang') || 'vi-VN';
    /*if (location.href.search('en-US') == -1 && location.href.search('vi-VN') == -1 && localStorage.getItem('lang')!= null ){
        location.href = [location.href.slice(0, location.origin.length + location.href.search(location.origin)), '/' + localStorage.getItem('lang'), location.href.slice(location.origin.length + location.href.search(location.origin))].join('');
    }*/
    var logout = lang == 'vi-VN' ? "Đăng xuất" : "Logout";
    var register = lang == 'vi-VN' ? "Đăng ký" : "Register";
    var login = lang == 'vi-VN' ? "Đăng nhập" : "Login";
    var setting = lang == 'vi-VN' ? "Cài đặt" : "Settings";
    var isLoginHtml = `<li class="list-group-item list-item">
                                    <a href="/`+ lang + `/MyAccount/UserSetting" class="no-decor clickNav">`
                                    + setting +
                                    `</a>
                                </li>
                                <li class="list-group-item list-item">
                                    <a href="/`+ lang + `/Logout" class="no-decor clickNav">`
                                    + logout +
                                    `</a>
                                </li>`;
    var notLoginHtml = `<li class="list-group-item list-item">
                                    <a class="no-decor clickNav" id="openLogin" data-toggle="modal" data-target="#loginModal">`
                                        + login + 
                                    `</a>
                                </li>
                                <li class="list-group-item list-item">

                                    <a href="/`+ lang + `/MyAccount/Register" class="no-decor clickNav">`
                                        + register + 
                                    `</a>
                                </li>`;
    if (isLogin == "true") {
        if (document.getElementById("login-footer") != null) {
            document.getElementById("login-footer").classList.add("hide");
        }
       /* $(".loginDropdown").append(isLoginHtml);*/
    }
    else {
        if (document.getElementById("login-footer") != null) {
            document.getElementById("login-footer").classList.add("display");
            document.getElementById("login-footer").classList.remove("hide");
        }
        /*$(".loginDropdown").append(notLoginHtml);*/
    }
});

function enterSubmit() {
    var input1 = document.getElementById("enterForm1");
    var input2 = document.getElementById("enterForm2");

    input1.addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            $("#login-form").submit();
        }
    });
    input2.addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            $("#login-form").submit();
        }
    });

}

