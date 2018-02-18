window.nearBy = [];

function filterDistance(minDistance, maxDistance){
    var results=[];
    $.each (trails, function(index, object){
        if (object.distance.replace("km","")>minDistance && object.distance.replace("km","")<maxDistance){
            results.push(object);
        }
    });
    drawCards(results);
}

function filterNearBy(range){
    for (let i=0; i<trails.length ; i++){
        let checkPoint = { 'lat': trails[i].latitude, 'long': trails[i].longitude};
        if (arePointsNear(checkPoint, window.pos, range)){
            nearBy.push(trails[i]);
        }
    }
}

//helper functions
function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.long - checkPoint.long) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}