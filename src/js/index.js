console.log("connected!")
const init = function() {
  // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
    });

    const uluru = {
        lat: -25.344,
        lng: 131.036
    };
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}
init();