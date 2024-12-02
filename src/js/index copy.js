console.log("connected!");
import "regenerator-runtime/runtime";
import { DOMSelectors } from "./DOM";

const init = function () {
    let stateValue;
    let cityValue;
    var apiKey = `ed8cca7e-4108-448e-9918-ef163cfb32af`;

    const grabData = async function (defaultQuery) {
        try {
            const response = await fetch(defaultQuery);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            // console.log(error);
        }
    };

    const grabSearchData = async function (searchQuery) {
        try {
            const response = await fetch(searchQuery);
            const data = await response.json();
            return data;
        } catch (error) {
            //   console.log(error);
        }
    };

    grabData();
    grabSearchData();

    const displayDefaultData = async function () {
        stateValue = DOMSelectors.stateInput.value;
        cityValue = DOMSelectors.cityInput.value;
        const defaultQuery = `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

        const response = await grabData(defaultQuery);
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

    const displaySearchData = async function () {
        stateValue = DOMSelectors.stateInput.value;
        cityValue = DOMSelectors.cityInput.value;

        const searchQuery = `https://api.airvisual.com/v2/city?city=${cityValue}&state=${stateValue}&country=USA&key=${apiKey}`;
        const response = await grabSearchData(searchQuery);
        console.log(response.data);
        const dataResults = response.data;
        const temperature = dataResults.current.weather.tp;
        const pollution = dataResults.current.pollution.aqius;
        const location = dataResults.location.coordinates;
        const lat = location[0];
        const long = location[1];
        console.log(cityValue, temperature, pollution, lat, long);
        //if statement for air quality color
        //if between 0-50 = green     value/200 = %width
        //if between 51-150 = yellow  value /200  = %width
        //if above 151 = red          value/200 = %width

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

        const insertText = function () {
            //   DOMSelectors.infoBox.innerHTML = "";
            DOMSelectors.infoBox.insertAdjacentHTML(
                "afterbegin",
                ` <div class="column">
              <div class="card">
                <h3> ${cityValue}, ${stateValue}</h3>
                <p><span>Coordinates:</span>${lat}, ${long}</p>
                
                <p><span>Weather:</span> ${temperature} °C</p>
                <p><span>Air Quality:</span> ${pollution} AQI US </p>
                <div class="w3-light-grey">
                  <div class="w3-container ${barColor} w3-center" style="width: ${width}%">
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

    displayDefaultData();

    DOMSelectors.submitBtn.addEventListener("click", function () {
        stateValue = DOMSelectors.stateInput.value;
        cityValue = DOMSelectors.cityInput.value;
        // console.log(stateValue, cityValue);
        // grabData();
        displaySearchData();
    });

    DOMSelectors.cityInput.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            DOMSelectors.submitBtn.click();
        }
    });
};

init();
