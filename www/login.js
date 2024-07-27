$(document).ready(function () {
    onload();
    registEvent();
    registPlaceholder();
    document.getElementById("bg-video").controls = false;
    $('#loadingSpinner').hide();  // Hide it initially
    $(document).ajaxStart(function () {
        $("#loadingSpinner").show();
    })
        .ajaxStop(function () {
            $("#loadingSpinner").hide();
        });
    $.validator.addMethod('isContainSpecialChar', function (value, element) {
        var iChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (iChars.test(value)) {
            return false;
        }
        return true;
    }, 'This field do not allow special character!');
    $('#ResetPassLink').on('click', function () {
        $('#loginModal').modal('hide');
    });
});

function registEvent() {
    $("#btn-login").click(function () {
        $("#login-form").submit();
    });

    $('.btn-apply').click(function () {
        window.location.href = window.location.origin + '/' + localStorage.getItem('lang') + '/MyAccount/Register';
        //$("#loginModal").modal("show");
    });
}

function onload() {
    $(".login_check").hide();
}

function onLoginSuccess(data) {
    registPlaceholder();
    onload();
    if (data == "Login Successfully!" || data == "Đăng Nhập Thành Công!") {
        window.localStorage.setItem("isLogin", true);
        $('#btn-login').hide();
        $('.footer-dis').hide();
        $('.forgot-link').hide();
        $('.close').hide();
        $('.login-hd-content').hide();
        $('.success-img').css('background-image',"url('/images/Checkmark.svg')");
        $('.success-img').css('background-position',"center");
        $('.success-img').css('background-size',"cover");
        $('.success-img').css('height',"80px");
        $('.success-img').css('width',"80px");
        $('.success-img').css('margin-bottom',"20px");
        $('.success-img').css('margin-top',"20px");
        $('.modal-body').css('margin-bottom',"40px");
        window.setTimeout(
            function () {
                $('#loginModal').modal('hide');

            }, 1000);

        if (window.location.href == location.origin + "/" + localStorage.getItem('lang') + '/MyAccount/Register' || window.location.href.includes("ResetPassword")) {
            setTimeout(() => window.location.href = "/", 1200);
            
        }
        else {
            setTimeout(() => window.location.reload(), 1200);
            // remove old local storage data

            sessionStorage.removeItem("fromJobDetail");
            sessionStorage.removeItem("jobFilterData");
            sessionStorage.removeItem("jobFilterSearchValue");
        }
    } else {
        enterSubmit();
    }
}
$('#loginModal').on('hide.bs.modal', function () {
    $('#enterForm1').val("");
    $('#enterForm1 ~ .placeholder').show();
    $('#enterForm2').val("");
    $('#enterForm2 ~ .placeholder').show();
    $('#loginModal .field-validation-error').text("");
})

function showLogin() {
    $("#loginModal").modal("show");
    $("#resetPwModal").modal("hide");
    $("#successResetPwModal").modal("hide");
};

function checkMobileSizeRegister() {
    var $containerWidth = $(window).width();
    if ($containerWidth <= 1024) {
        $(".form-right-content").removeClass("col-8").addClass("col-12").addClass("radius-border");
        $(".form-left-content").removeClass("col-4").css('display','none');
    } else {
        $(".form-right-content").removeClass("col-12").removeClass("radius-border").addClass("col-8");
        $(".form-left-content").addClass("col-4").css('display','inherit');
    }
}

function registPlaceholder() {
    $('input.form-control').each(function() {
        if ($(this).val() !== '') {
            $(this).siblings('span.placeholder').hide();
        }
    })
    $('span.placeholder').on("click", function () {
        $(this).siblings('input.form-control').focus();
    });
    $('input.form-control').on("focus", function () {
        $(this).siblings('span.placeholder').hide();
    });
    $('input.form-control').on("blur", function () {
        if ($(this).val().length == 0) {
            $(this).siblings('span.placeholder').show();
        }
    });
}