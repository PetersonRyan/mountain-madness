$(document).ready(function(){
    $.each(trails, function(k,v){
        setTimeout(function(){
            addCard(v);
        }, 10);
    });
});