$(document).ready(function () {
    
})
$("#resetPwModal").on("hidden.bs.modal", function () {
    $("#input-reset-id").val('');
    $("#validate-text-id").text('');
})

function validateResetForm() {
    if ($("#form-reset").valid()) {
        $("#form-reset").submit();
    }
}

function onResetSuccess() {
    let status = $(':input#Status').val();

    if (status == "200") {
        transformPopupAndRemoveStatusCode($('#resetPwModal'), $('#successResetPwModal'));
    }
}
function transformPopupAndRemoveStatusCode(closePopup = null, openPopup = null) {
    $(':input#Status').val('');
    $(':input#input-reset-id').val('');
    if (closePopup) $(closePopup).modal("hide");
    if (openPopup) $(openPopup).modal("show");
}