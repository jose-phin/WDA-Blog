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

function sendReplyForm(id, movie) {
    var data = $('#reply-'+id).serializeArray();

    console.log(id + " data "+ JSON.stringify(data));
    //send the id of the reply
    $.post('/'+movie,data)
        .done(function() {
            window.location.href = "/"+movie;
          })
        .fail(function() {
            console.log("Cant loging m8");
        });
        return false;
}
