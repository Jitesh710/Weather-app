function fetchCoordinates(cityName) {
    const apiKey = "0593c66ed827d3c07041a568a2f98336";
    const cityURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  
    return fetch(cityURL)
      .then((response) => response.json())
      .then((data) => {
        const name = data[0].name;
        const latitude = data[0].lat;
        const longitude = data[0].lon;
  
        return { name, latitude, longitude };
      })
      .catch((error) => {
        console.log("Error fetching city data:", error);
      });
  }
  
  function fetchWeather(latitude, longitude, name) {
    const apiKey = "0593c66ed827d3c07041a568a2f98336";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    return fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        return { data, name };
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  }
  
  function displayWeather(data, cityName) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const speed = data.wind.speed;
    const icon = data.weather[0].icon;
  
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = desc;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
  
    // Update the city name
    document.querySelector(".city").innerText = "Weather in " + cityName;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + desc + "')"
  }
  
  function FetchFinalAnswer(cityName) {
    fetchCoordinates(cityName)
      .then((coordinates) => {
        const { name, latitude, longitude } = coordinates;
        return fetchWeather(latitude, longitude, name);
      })
      .then((weatherData) => {
        console.log(weatherData);
        displayWeather(weatherData.data, weatherData.name);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  
  function searchWeather() {
    const cityName = document.querySelector(".search-bar").value;
    FetchFinalAnswer(cityName);
  }
  
  document.querySelector(".search button").addEventListener("click", searchWeather);
  document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchWeather();
    }
  });

  
