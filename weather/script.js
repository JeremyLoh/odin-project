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
  console.log({ apiKey, searchLocation })
  getWeather(searchLocation, apiKey)
}

async function getWeather(searchLocation, apiKey) {
  // https://www.weatherapi.com/docs/#intro-request
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
  const params = new URLSearchParams({
    key: apiKey,
    q: searchLocation,
    aqi: "yes",
  })
  const baseUrl = new URL(
    "http://api.weatherapi.com/v1/current.json?" + params.toString()
  )
  // TODO call WeatherAPI to get weather
}

function parseWeatherData(json) {
  // TODO parse data of weather api and return object consisting of what app needs
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
