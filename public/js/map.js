window.map = [];

function initalize(){
    for(let index=0; index<50; index++){
        var myOptions = {
            zoom: 14,
            center: new google.maps.LatLng(trails[index].latitude, trails[index].longitude),
            mapTypeId: google.maps.MapTypeId.terrain
        }
        console.log(document.getElementById("map"+index));
        map[index] = new google.maps.Map(document.getElementById("map"+index), myOptions);
        new google.maps.Marker({
            position: new google.maps.LatLng(trails[index].latitude, trails[index].longitude),
            map: map[index]
        });
    }
}

setTimeout(function(){initalize();},4000);
