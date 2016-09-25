$(document).ready( function() {
    console.log("doc ready");
        setTimeout(function (){
            $('.movies > p:nth-child(1)').text("Just kidding, api calls are NYI /sadface");
        }, 5000);
    }
);