window.nearBy = [];
window.elevationBy = [];
window.timeBy = [];
window.lengthBy = [];

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

function filterByElevation(level){
    for (let i=0; i<trails.length ; i++){
        let meters = trails[i].elevation;
        meters = meters.replace( /[^\d.]/g, '' );
        if (meters != ''){
            if (meters < level) elevationBy.push(trails[i]);
        }else{
            elevationBy.push(trails[i]);
        }
    }
}

function filterByTime(timeLevel){
    for (let i=0; i<trails.length ; i++){
        let time = trails[i].time;
        time = time.replace( /[^\d.]/g, '' );
        if (time < timeLevel) { 
            timeBy.push(trails[i]);
        }
    }
}

function filterByLength(lenghtLevel){
    for (let i=0; i<trails.length ; i++){
        let length = trails[i].distance;
        length = length.replace( /[^\d.]/g, '' );
        if (length < lenghtLevel) { 
            lengthBy.push(trails[i]);
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