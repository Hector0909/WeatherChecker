// getting all objects
const searchInput = document.querySelector("#searchInput")
searchButton = document.querySelector("#searchButton")
weatherIcon = document.querySelector("#weatherIcon")
windSpeed = document.querySelector("#windSpeed")
humidity = document.querySelector(".humidity")
weather = document.querySelector(".weather")
desc = document.querySelector(".desc")
API = "8cf5ac5621c8d0266298a149e49d7514";

const myElement = document.querySelector('.my-element');
// clear(light blue), clouds(bluish gray), snowy(light gray)

const setWeatherDetails = (data) => {

    // Adds the weather data to their corresponding elements.
    desc.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";

    // Shows the weather image and color that matches the current weather of a city.
    switch (data.weather[0].main) {
        case 'Clouds':                   
            weatherIcon.src = "images/Clouds.png";
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#d4d4d4"; // gray
            break;
        case 'Clear':  
            weatherIcon.src = "images/sun.png";
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#ccf2ff"; // sky blue
            break;
        case 'Rain':          
            weatherIcon.src = "images/rainy.png";
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#8cadf2"; // darker light blue
            break;
        case 'Mist':         
            weatherIcon.src = "images/mist.png";
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#bdd1db"; // bluish gray
            break;
        case 'Snow':         
            weatherIcon.src = "images/snow.png";
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#eaeef0"; // white
            break;
        case 'Haze':
            document.body.style.transition = "background 2s";
            document.body.style.backgroundColor = "#bdd1db"; 
            weatherIcon.src = "images/haze.png";
            myElement.style.backgroundColor = colors[1];
            break;
    }
}

// gets the weather data
const callAPI = (id) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
        .then(response => {

            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                alert("Check spelling of City and try again or Something Went Wrong!");
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setWeatherDetails(data); 
        })
        .catch(error => console.log(error))
}

// if the input value is empty, it outputs an alert message. 
// if its not empty, it calls a function to get the weather data.
searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        alert("Please Enter City Name.");
    } else {
        callAPI(API);
    }
})

// Does the same thing, but activates when the user presses enter on the keyboard.
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }
})

searchButton.click();