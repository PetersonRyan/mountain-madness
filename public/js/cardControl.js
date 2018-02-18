$(document).ready(function(){
    $('body').on('click', '.card-image', function(){
        $(this).parent().toggleClass('focus-card');
    });



    $(document).on('click', '.fa-arrow-left', function(){
        console.log($('.card'));
        $("div .card").removeClass('focus-card');
        
    });

});

function addCard(content){

}