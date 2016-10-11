function showReplyForm(id) {
    var formId = 'reply-div-'+id;
    var buttonId = 'reply-button-'+id;
    console.log("form: "+buttonId);
    if(document.getElementById(formId).style.display == 'block') {
        document.getElementById(buttonId).innerHTML = "reply";
        document.getElementById(formId).style.display = 'none';
    } else  {
        document.getElementById(buttonId).innerHTML = "hide";
        document.getElementById(formId).style.display = 'block';
    }
}
