function createAccount() {

    var data = $('#loginForm').serializeArray();
    console.log("data: "+JSON.stringify(data));
    $.post('/createAccount',data)
        .done(function() {
            window.location.href = "/";
          })
        .fail(function() {
            console.log("Cant loging m8");
        });

}
