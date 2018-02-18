window.map = [];

function initalize(){
    for(let index=0; index<10; index++){
        var myOptions = {
            zoom: 20,
            center: new google.maps.LatLng(trails[index].latitude, trails[index].longitude),
            mapTypeId: 'terrain'
        }
        map[index] = new google.maps.Map(document.getElementById("map"+index), myOptions);
        new google.maps.Marker({
            position: new google.maps.LatLng(trails[index].latitude, trails[index].longitude),
            map: map[index]
        });
    }
}

setTimeout(function(){initalize();},500);
