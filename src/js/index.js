console.log("connected!")
import "regenerator-runtime/runtime";
import { DOMSelectors } from "./DOM";

const init =  function () {
    let stateValue;
    let cityValue;
    var apiKey = `ed8cca7e-4108-448e-9918-ef163cfb32af`;

    DOMSelectors.submitBtn.addEventListener('click', function () {
        if (DOMSelectors.stateInput.value == "") {
            // document.querySelector(".typerError").innerHTML = "";
            document.querySelector(".typeError").insertAdjacentHTML("afterbegin", "Type in value for state");
            // return false;
        } else if (DOMSelectors.cityInput.value == "") {
            // document.querySelector(".typerError").innerHTML = "";
            document.querySelector(".typeError").insertAdjacentHTML("afterbegin", "Type in value for city");
        }
        else {
            stateValue = DOMSelectors.stateInput.value;
            cityValue = DOMSelectors.cityInput.value;
            console.log(stateValue, cityValue);
        }

        grabData();

    })
    
    const grabData = async function () {
        const defaultQuery = `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`;
        const searchQuery = `https://api.airvisual.com/v2/city?city=${cityValue}&state=${stateValue}&country=USA&key=${apiKey}`;
        
        try {
            const response = await fetch(searchQuery);
            const data = await response.json();
            console.log(data);
            // display(data.results);
            // document.querySelector(".typeError").insertAdjacentHTML("afterbegin", data.results);
            // console.log(data.city);
    
        } catch (error) {
            console.log(error);

        }
    
    }

    //if statement for air quality color
    //if between 0-50 = green     value/200 = %width
    //if between 51-150 = yellow  value /200  = %width
    //if above 151 = red          value/200 = %width
};

init();
