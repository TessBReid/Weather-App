function formateDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  return `${day} ${month} ${date}`;
}

function formateTime(timestamp) {
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getDailyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b1075effe9bc0e836b23229ae5c92544";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function showCurrentWeather(response) {
  celciusTemperature = response.data.main.temp;

  let fullDate = document.querySelector("#today");
  fullDate.innerHTML = formateDate(response.data.dt * 1000);

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formateTime(response.data.dt * 1000);

  let sunriseElement = document.querySelector("#sun-up");
  sunriseElement.innerHTML = formateTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sun-down");
  sunsetElement.innerHTML = formateTime(response.data.sys.sunset * 1000);

  let temp = Math.round(celciusTemperature);
  let currentTemperature = document.querySelector("#today-temp");
  currentTemperature.innerHTML = `${temp}`;

  let feel = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feel}`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humid}`;

  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${windy}`;

  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  let weatherElement = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${weatherElement}`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `src/img-icon/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  getDailyForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "b1075effe9bc0e836b23229ae5c92544";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showCurrentWeather);
}

function displayedSearch(city) {
  let unit = "metric";
  let apiKey = "b1075effe9bc0e836b23229ae5c92544";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showCurrentWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showCurrentLocationTemperature(response) {
  celciusTemperature = response.data.main.temp;

  let fullDate = document.querySelector("#today");
  fullDate.innerHTML = formateDate(response.data.dt * 1000);

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formateTime(response.data.dt * 1000);

  let sunriseElement = document.querySelector("#sun-up");
  sunriseElement.innerHTML = formateTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sun-down");
  sunsetElement.innerHTML = formateTime(response.data.sys.sunset * 1000);

  let locationTemp = Math.round(celciusTemperature);
  let localTemperature = document.querySelector("#today-temp");
  localTemperature.innerHTML = `${locationTemp}`;

  let feel = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feel}`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humid}`;

  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${windy}`;

  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  let weatherElement = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${weatherElement}`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `src/img-icon/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  console.log(response.data.weather);

  getDailyForecast(response.data.coord);
}

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiKey = "b1075effe9bc0e836b23229ae5c92544";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentLocationTemperature);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-finder");
currentLocationButton.addEventListener("click", findCurrentLocation);

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitConversion = (celciusTemperature * 9) / 5 + 32;

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let localTemperature = document.querySelector("#today-temp");
  localTemperature.innerHTML = Math.round(farenheitConversion);
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

function displayCelciusTemp(event) {
  event.preventDefault;
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");

  let localTemperature = document.querySelector("#today-temp");
  localTemperature.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemp);

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let fiveDayWeather = response.data.daily;
  let forecastElement = document.querySelector("#weekday-forcast");

  let forecastHTML = `<div class="row">`;

  fiveDayWeather.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <div class="weekday">${formateDay(forecastDay.dt)}</div>
                <div class="weekday-icon">
                  <img
                  src="src/img-icon/${forecastDay.weather[0].icon}.png"
                  alt=""/>
                </div>
                <div id="five-day">
                 <span class="high" id="temp-max">${Math.round(
                   forecastDay.temp.max
                 )}?? | </span><span class="low" id="temp-min">${Math.round(
          forecastDay.temp.min
        )}??</span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;

displayedSearch("London");
