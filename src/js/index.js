console.log("connected!");
import "regenerator-runtime/runtime";
import { DOMSelectors } from "./DOM";

const init = function () {
    let stateValue;
    let cityValue;
    var apiKey = `ed8cca7e-4108-448e-9918-ef163cfb32af`;

    const grabData = async function (query) {
        try {
            const response = await fetch(query);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const displayData = async function () {
        let query;
        console.log(cityValue);
        if (cityValue == undefined) {
            query = `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`;
        } else {
            query = `https://api.airvisual.com/v2/city?city=${cityValue}&state=${stateValue}&country=USA&key=${apiKey}`;
        }
        stateValue = DOMSelectors.stateInput.value;
        cityValue = DOMSelectors.cityInput.value;

        const response = await grabData(query);
        const dataResults = response.data;
        const nearestCity = dataResults.city;
        const state = dataResults.state;
        const temperature = dataResults.current.weather.tp;
        const pollution = dataResults.current.pollution.aqius;
        const location = dataResults.location.coordinates;
        const lat = location[0];
        const long = location[1];
        console.log(nearestCity, temperature, pollution, lat, long);

        const green = "w3-green";
        const yellow = "w3-yellow";
        const orange = "w3-orange";
        const red = "w3-red";
        let barColor;
        let width;
        let description;
        if (pollution <= 25) {
            barColor = green;
            width = 25;
            description = "Good";
        } else if (pollution >= 26 && pollution <= 50) {
            barColor = yellow;
            width = 50;
            description = "Moderate";
        } else if (pollution >= 51 && pollution <= 100) {
            barColor = orange;
            width = 75;
            description = "Breathe with Caution";
        } else if (pollution > 101) {
            barColor = red;
            width = 100;
            description = "Escape Immediately";
        }
                        // <video src="../media/Time Lapse Video Of Clouds And Sun.mp4" ></video>

        const insertText = function () {
            //   DOMSelectors.infoBox.innerHTML = "";
            DOMSelectors.infoBox.insertAdjacentHTML(
                "afterbegin",
                ` <div class="column">

                    <div class="card">
                        <h3> ${nearestCity}, ${state}</h3>
                        <p><span>Coordinates:</span>  ${lat}, ${long}</p>
                        
                        <p><span>Weather:</span> ${temperature} °C</p>
                        <p><span>Air Quality:</span>  ${pollution} AQI US </p>
                        
                        <div class="w3-light-grey">
                            <div class="w3-container  ${barColor} w3-center" style="width: ${width}%">
                                ${description}
                            </div>
                        </div>
                    </div>
                 </div>
              `
            );
        };
        insertText();
    };

    displayData();

    DOMSelectors.submitBtn.addEventListener("click", function () {
        stateValue = DOMSelectors.stateInput.value;
        cityValue = DOMSelectors.cityInput.value;
        // console.log(stateValue, cityValue);
        // grabData();
        displayData();
    });

    DOMSelectors.cityInput.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            DOMSelectors.submitBtn.click();
        }
    });
};

init();
