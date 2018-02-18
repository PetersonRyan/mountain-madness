$(document).ready(function(){
    $('body').on('click', '.card-image', function(){
        $(this).parent().toggleClass('focus-card');
    });
    $('body').on('click', '.card .fa-arrow-left', function(){
        //console.log($(".focus-card").removeClass('focus-card'))
        console.log($('body .card'));
        $("body .card").removeClass('focus-card');
        console.log($('body .card'));
    });


});

function addCard(content){

}