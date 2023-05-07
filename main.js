//create const
const inputBox = document.querySelector(".input-box")
const searchBtn = document.getElementById("searchBtn")
const city_name = document.querySelector(".city")
const weather_img = document.querySelector(".weather-img")
const description = document.querySelector(".description")
const temperature = document.querySelector(".temperature")
const humidity = document.getElementById("humidity")
const wind_speed = document.getElementById("wind-speed")
const location_not_found = document.querySelector(".location-not-found")
const weater_body = document.querySelector(".weather-body")

async function checkWeather(city) {
  //create URL
  const url = `${import.meta.env.VITE_WEATHER_URL}/weather?q=${city}&appid=${
    import.meta.env.VITE_API_KEY
  }&units=metric`

  const weather_data = await fetch(`${url}`).then((response) => response.json())

  //404 error
  if (weather_data.cod === `404`) {
    location_not_found.style.display = "inline"
    weater_body.style.display = "none"
    console.log("error")
    return
  }

  //data display
  weater_body.style.display = "inline"
  location_not_found.style.display = "none"
  city_name.innerHTML = `${weather_data.name}`
  description.innerHTML = `${weather_data.weather[0].main}`
  temperature.innerHTML = `${Math.round(weather_data.main.temp)} °C`
  humidity.innerHTML = `${weather_data.main.humidity} %`
  wind_speed.innerHTML = `${weather_data.wind.speed} km/h`

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "assets/clouds.png"
      break
    case "Clear":
      weather_img.src = "assets/clear.png"
      break
    case "Rain":
      weather_img.src = "assets/rain.png"
      break
    case "Mist":
      weather_img.src = "assets/mist.png"
      break
    case "Snow":
      weather_img.src = "assets/snow.png"
      break
  }

  console.log(weather_data)
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value)
})
