let vn = 'vi-VN';
let en = 'en-US'
let lang = localStorage.getItem('lang') || vn
var isCapchaExpried = false;

$(document).ready(function () {
    modifyingValidationMessage(lang);
    hideValidation();
    regisQAaction();
    addValidationMethod(lang);
})

function modifyingValidationMessage(lang) {
    delete $.validator.methods.maxlength;
    switch(lang) {
        case vn:
            jQuery.extend(jQuery.validator.messages, {
                required: "Trường này là bắt buộc.",
            });
            break;
        case en:
            jQuery.extend(jQuery.validator.messages, {
                required: "This field is required.",
            });
            break;
        default:
            break;
    }
}

function addValidationMethod(lang) {
    var scriptMessage = 'This field do not allow script tags!'
    switch (lang) {
        case vn:
            scriptMessage = 'Trường này không được chứa cú pháp Html!';
        case en:
            break;
        default:
            break;
    }
    $.validator.addMethod('isContainScriptTags', function (value, element) {
        var iChars = /<script[^>]*>/;
        if (iChars.test(value)) {
            return false;
        }
        return true;
    }, scriptMessage);
}

function regisQAaction() {
    $('#qa-submit').on("click", function () {
        validateFormQA();
    });
    $("#SubmitQAForm input").on("change paste keyup", function () {
        if ($(this).val() === undefined || $(this).val() === "") {
            $("#SubmitQAForm span.field-validation-error").text("");
        }
    });
    $("#SubmitQAForm textarea").on("change paste keyup", function () {
        if ($(this).val() === undefined || $(this).val() === "") {
            $("#SubmitQAForm span.field-validation-error").text("");
        }
    });
}
// hide initial validation
function hideValidation() {
    $("#name").change(function () {
        $("#name-error").hide();
    });
    $("#email").change(function () {
        $("#email-error").hide();
    });
    $("#subject").change(function () {
        $("#subject-error").hide();
    })
    $("#message").change(function () {
        $("#message-error").hide();
    })
}

// fill confirm modal content from QA form
function fillConfirmModal() {
    $("#name-modal").text($("#name").val());
    $("#email-modal").text($("#email").val());
    $("#subject-modal").text($("#subject").val());
    $("#message-modal").text($("#message").val());
}

function initMap() {
    let locationInfo = {
        infoHtml: getInforAddressHtml(),
        location: {
            lat: Number($(this).data('lat')),
            lng: Number($(this).data('lng'))
        }
    };
    //var label = "Hanoi Toastmasters"
    var location = { lat: 21.0221682, lng: 105.7783353 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById("map-section"), { zoom: 16, center: location });
    // Create a custom info window
    var infoWindow = new google.maps.InfoWindow({
        content: locationInfo.infoHtml
    });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: location, map: map });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}

function getInforAddressHtml() {
    // auto insert style when open infoWindow                      
    return `<div class='info-header'>
              <span class="map-marker-title">Hanoi Toastmasters</span>
            </div>`;
}

function submit() {
    $("#form-field").submit();
}

function validateFormQA() {
    // clear current validation
    $("#SubmitQAForm span.field-validation-error").text("")
    var captcha_response = grecaptcha.getResponse()
    // validate form if valid, show modal
    $("#form-field").validate({
        rules: {
            "Name": {
                isContainScriptTags: true
            },
            "Subject": {
                isContainScriptTags: true
            },
            "Email": {
                isContainScriptTags: true
            },
            "Message": {
                isContainScriptTags: true
            }
        }
    });
    if (captcha_response.length == 0) {
        let errorMes = "";
        switch (lang) {
            case vn:
                errorMes = "Trường này là bắt buộc!";
                break;
            case en:
                errorMes = "This field is required!";
                break;
        }
        document.getElementById("error-capcha").style.display = "block";
        document.getElementById("error-capcha").innerHTML = errorMes;
    }
    if ($("#form-field").valid() && captcha_response.length > 0) {
        fillConfirmModal();
        $("#confirmModal").modal("show");
        document.getElementById("error-capcha").style.display = "none";
        isCapchaExpried = false;
    }
    else {
        if ($(".success").length == 1) {
            $(".success").hide();
        }
    }
}

function closeModal() {
    $("#confirmModal").modal("hide");
}

function checkCapchaBeforeSubmit() {
    if (isCapchaExpried) {
        $("#confirmModal").modal("hide");
        $(".success").hide();
        isCapchaExpried = false;
    }
    else {
        document.getElementById("sb-button-send-qa").click();
        $("#confirmModal").modal("hide");
        localStorage.setItem("nameQa", document.getElementById("name-modal").textContent);
        localStorage.setItem("emailQa", document.getElementById("email-modal").textContent);
        localStorage.setItem("subjectQa", document.getElementById("subject-modal").textContent);
        localStorage.setItem("messageQa", document.getElementById("message-modal").textContent);
    }
}

function isValid(name, email, subject, message) {    
    if (!name || !email || !subject || !message) {
        return false;
    }
    return true;
}

function onSubmitSuccess() {
    // if submit success on the client side
    regisQAaction();
    if ($('#SubmitQAForm .text-danger').contents().length == 0) {
        var isLogin = $("#isLogin").val();
        $(".form-input").each(function () {
            if ((isLogin == 'true') && ($(this).attr('id') != 'name' )&& ($(this).attr('id') != 'email')) {
                $(this).val("");

            }
            else if (isLogin == '') {
                $(this).val("");
            }
         
        });
    }
    if ($(".success").length == 1) {
        $(".success").show();
        isCapchaExpried = false;
        localStorage.removeItem("nameQa");
        localStorage.removeItem("emailQa");
        localStorage.removeItem("subjectQa");
        localStorage.removeItem("messageQa");
    } else {
        document.getElementById("name").value = localStorage.getItem("nameQa");
        document.getElementById("email").value = localStorage.getItem("emailQa");
        document.getElementById("subject").value = localStorage.getItem("subjectQa");
        document.getElementById("message").value = localStorage.getItem("messageQa");
    }
}

function recaptchaCallbackQa() {
    document.getElementById("error-capcha").style.display = "none";
    isCapchaExpried = false;
}

function handleCaptchaExpiredQa() {
    isCapchaExpried = true;
} 
