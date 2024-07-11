const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit)

const apiKey = document.getElementById("apiKey")
const apiKeyError = document.getElementById("apiKey-error")

apiKey.addEventListener("input", (event) => {
  const validity = apiKey.validity
  showApiError(apiKeyError, validity)
})

const searchLocation = document.getElementById("location")
const searchLocationError = document.getElementById("location-error")

searchLocation.addEventListener("input", (event) => {
  const validity = searchLocation.validity
  showLocationError(searchLocationError, validity)
})

function handleSubmit(event) {
  event.preventDefault()
  const form = event.target
  const apiKey = form.elements["apiKey"].value
  const searchLocation = form.elements["location"].value
  if (
    !apiKey ||
    !searchLocation ||
    apiKey.trim() === "" ||
    searchLocation.trim() === ""
  ) {
    alert("Please provide an api key / location")
    return
  }
  const spinner = document.getElementById("spinner")
  spinner.classList.add("active")
  getWeather(searchLocation, apiKey)
    .then((data) => displayWeatherCard(data))
    .catch((error) => alert(error))
    .finally(() => spinner.classList.remove("active"))
}

async function getWeather(searchLocation, apiKey) {
  // https://www.weatherapi.com/docs/#intro-request
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
  const params = new URLSearchParams({
    key: apiKey,
    q: searchLocation,
    aqi: "yes",
  })
  const url = new URL(
    "http://api.weatherapi.com/v1/current.json?" + params.toString()
  )
  const response = await fetch(url.toString()).then((response) =>
    response.json()
  )
  if (response.error) {
    const { message } = response.error
    throw new Error(message)
  }
  return parseWeatherData(response)
}

class CurrentWeatherData {
  constructor(json) {
    this.location = {
      name: json.location.name,
      country: json.location.country,
      lat: json.location.lat,
      lon: json.location.lon,
      localtime: json.location.localtime,
    }
    // e.g. icon = "//cdn.weatherapi.com/weather/64x64/night/116.png"
    const [_, iconWidth, iconHeight] =
      json.current.condition.icon.match(/\/(\d+)x(\d+)\//)
    this.current = {
      last_updated: json.current.last_updated,
      temp_celsius: json.current.temp_c,
      condition: json.current.condition.text,
      humidity: json.current.humidity,
      icon: "https:" + json.current.condition.icon,
      iconWidth,
      iconHeight,
    }
  }

  getLocation() {
    return this.location
  }

  getCurrentWeather() {
    return this.current
  }
}

function parseWeatherData(json) {
  // parse data of weather api and return object consisting of what app needs
  const data = new CurrentWeatherData(json)
  return {
    ...data.getLocation(),
    ...data.getCurrentWeather(),
  }
}

function displayWeatherCard({
  name,
  country,
  condition,
  humidity,
  icon,
  iconHeight,
  iconWidth,
  last_updated,
  temp_celsius,
}) {
  const card = document.querySelector(".weather-card")
  card.classList.add("active")
  const weatherConditionElement = document.getElementById("weather-condition")
  weatherConditionElement.textContent = condition
  const img = document.getElementById("weather-icon")
  img.src = icon
  img.width = iconWidth
  img.height = iconHeight
  const locationElement = document.getElementById("weather-location")
  locationElement.textContent = name + " - "
  const countryElement = document.getElementById("weather-country")
  countryElement.textContent = country
  const humidityElement = document.getElementById("weather-humidity")
  humidityElement.textContent = "Humidity: " + humidity
  const tempElement = document.getElementById("weather-temp-celsius")
  tempElement.textContent = "Current Temp: " + temp_celsius + " °C"
  const lastUpdatedElement = document.getElementById(
    "weather-last-updated-time"
  )
  lastUpdatedElement.textContent = "Last Updated Time: " + last_updated
}

function showLocationError(element, { valueMissing, tooShort }) {
  if (valueMissing) {
    element.textContent = "Please enter a location"
    element.className = "error active"
  } else if (tooShort) {
    element.textContent = "Entered location is too short"
    element.className = "error active"
  } else {
    element.textContent = ""
    element.className = "error"
  }
}

function showApiError(element, { valueMissing, tooShort, tooLong }) {
  if (valueMissing) {
    element.textContent = "Please enter an api key"
    element.className = "error active"
  } else if (tooLong) {
    element.textContent = "Entered WeatherApi key is too long"
    element.className = "error active"
  } else if (tooShort) {
    element.textContent = "Entered WeatherApi key is too short"
    element.className = "error active"
  } else {
    element.textContent = ""
    element.className = "error"
  }
}
