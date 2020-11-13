console.log("connected!")


import "regenerator-runtime/runtime";

const init = async function () {
    var apiKey = `ed8cca7e-4108-448e-9918-ef163cfb32af`;
    var userInput = document.getElementById("citySearch").value;
    // const defaultQuery = `https://api.airvisual.com/v2/city?city=${userInput}state=California&country=USA&key=${apiKey}`;
    const defaultQuery = `https://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=${apiKey}`;
    // const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=false`;

    try {
        const response = await fetch(defaultQuery);
        const data = await response.json();

        console.log (data);

    } catch (error) {
        console.log(error);
    }


    // // The map, centered at Uluru
    // var map = new google.maps.Map(document.getElementById("map"), {
    //     zoom: 4,
    //     center: uluru,
    // });

    // var uluru = {
    //     lat: -25.344,
    //     lng: 131.036
    // };
    // // The marker, positioned at Uluru
    // var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map,
    // });
};

init();