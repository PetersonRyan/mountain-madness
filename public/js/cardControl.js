$(document).ready(function(){
    $('body').on('click', '.card', function(){
        $(this).addClass('focus-card');
    });

    $(document).on('click', '.fa-arrow-left', function(){
        console.log($('.card'));
        $("div .card").removeClass('focus-card');
        
    });

});

function addCard(content){

}