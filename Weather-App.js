const body = document.body;
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather-container");
const cityName = document.getElementById("city-name");
const tempDisplay = document.getElementById("temp");
const descriptionDisplay = document.getElementById("description");
const humidityDisplay = document.getElementById("humidity");
const windSpeadDisplay = document.getElementById("windSpead");
const img = document.getElementById("weather-icon");
const errorMsg = document.getElementById("error-message");

const apiKey = "91e37ec4b59b1e0ab75cccb944d1f93c";

// When the page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("lastCity");

  if (savedCity) {
    searchInput.value = savedCity; // Put the name back in the box
    getWeather(); // Automatically fetch the weather
  }
});

async function getWeather() {
  const city = searchInput.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      errorMsg.style.display = "block"; // Show error
      weatherContainer.style.opacity = 0;
      searchInput.value = "";
      return;
    }

    const data = await response.json();
    localStorage.setItem("lastCity", city);
    errorMsg.style.display = "none";
    weatherContainer.style.opacity = 0;
    setTimeout(() => {
      cityName.innerText = data.name;
      tempDisplay.innerText = Math.round(data.main.temp) + "°C";
      descriptionDisplay.innerText = data.weather[0].description;
      humidityDisplay.innerText = data.main.humidity;
      windSpeadDisplay.innerText = Math.round(data.wind.speed * 3.6) + " km/h";
      const iconCode = data.weather[0].icon;
      img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherContainer.style.opacity = 1;
    }, 400);
    const weatherMain = data.weather[0].main;

    switch (weatherMain) {
      case "Clear":
        body.style.backgroundColor = "#fef08a"; // Warm Sunny Yellow
        break;
      case "Clouds":
        body.style.backgroundColor = "#cbd5e1"; // Soft Cloudy Gray
        break;
      case "Rain":
      case "Drizzle":
        body.style.backgroundColor = "#93c5fd"; // Rainy Blue
        break;
      case "Thunderstorm":
        body.style.backgroundColor = "#64748b"; // Dark Stormy Slate
        break;
      case "Snow":
        body.style.backgroundColor = "#f8fafc"; // Icy White
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        body.style.backgroundColor = "#94a3b8"; // Foggy Gray
        break;
      default:
        body.style.backgroundColor = "#e0f2fe"; // Your default sky blue
    }
    // Important: Ensure the gradient covers the whole screen
    searchInput.value = "";
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

searchBtn.addEventListener("click", getWeather);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

// switch (weatherMain) {
//   case "Clear":
//     body.style.background =
//       "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"; // Warm Sunny Orange
//     break;
//   case "Clouds":
//     body.style.background =
//       "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"; // Moody Gray-Blue
//     break;
//   case "Rain":
//   case "Drizzle":
//     body.style.background =
//       "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)"; // Deep Rainy Blue
//     break;
//   case "Thunderstorm":
//     body.style.background =
//       "linear-gradient(135deg, #373b44 0%, #4286f4 100%)"; // Dark Stormy Purple/Blue
//     break;
//   case "Snow":
//     body.style.background =
//       "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)"; // Bright Icy White
//     break;
//   case "Mist":
//   case "Smoke":
//   case "Haze":
//   case "Fog":
//     body.style.background =
//       "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)"; // Foggy Teal/Gray
//     break;
//   default:
//     body.style.background =
//       "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)"; // Default Sky Blue
// }
