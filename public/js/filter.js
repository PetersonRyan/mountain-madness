function filterDistance(minDistance, maxDistance){
    var results=[];
    $.each (trails, function(index, object){
        if (object.distance.replace("km","")>minDistance && object.distance.replace("km","")<maxDistance){
            results.push(object);
        }
    });
    drawCards(results);
}