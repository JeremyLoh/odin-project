# Weather App (JavaScript Course)

Create a weather forecast site using the weather API from the previous lesson (WeatherAPI free tier)

You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius

You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather. (You could even use the Giphy API to find appropriate weather-related gifs and display them).

Feel free to use promises or async/await in your code, though you should try to become comfortable with both.

https://www.theodinproject.com/lessons/node-path-javascript-weather-app

# API keys, secrets and security

Not all APIs are free, they can also be rate-limited. If someone else has access to your API key, they can use up all of your uses

One way to prevent this is to store the API key on the server and NEVER send them to the frontend in the first place, using environment variables
This makes the API key available only on the server the code is deployed to

When you leak an API key, Github will alert you that you have committed an API key publicly.
After following this project, and indeed exposing the API key, you may notice that Github will send you this alert. This is totally OK for this project as this API key is publicly available and there is no consequence for exposing it. This is not to say ALL keys are this way.
Later during the backend courses, you will learn ways to securely deal with these topics

# References

Weather API - https://www.weatherapi.com/

Building a CSS Loading Spinner in 3 Minutes - Colt Steele

- https://www.youtube.com/watch?v=VbAD6cifkWM

Background Image - [CHUTTERSNAP](https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/gray-concrete-bridge-on-body-of-water-in-aerial-photography--gS54SWrHMg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

# Assignment

1. Setup a blank HTML document with the appropriate links to your JavaScript and CSS files
2. Write the functions that hit the API. You're going to want functions that can take a location and return the weather data for that location. For now, just `console.log()` the information
3. Write the functions that process the JSON data you are getting from the API and return an object with only the data you require for your app
4. Setup a form that will let users input their location and will fetch the weather info (still just `console.log()` it)
5. Display the information on your webpage
6. Add any styling you like
7. Optional: add a 'loading' component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to test for low-end devices
8. Push to github and share your solution

# Example request to Weather API (current.json endpoint)

q=singapore&aqi=yes

```json
{
  "location": {
    "name": "Singapore",
    "region": "",
    "country": "Singapore",
    "lat": 1.29,
    "lon": 103.86,
    "tz_id": "Asia/Singapore",
    "localtime_epoch": 1720534000,
    "localtime": "2024-07-09 22:06"
  },
  "current": {
    "last_updated_epoch": 1720533600,
    "last_updated": "2024-07-09 22:00",
    "temp_c": 28.2,
    "temp_f": 82.8,
    "is_day": 0,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
      "code": 1003
    },
    "wind_mph": 4.3,
    "wind_kph": 6.8,
    "wind_degree": 140,
    "wind_dir": "SE",
    "pressure_mb": 1010,
    "pressure_in": 29.83,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 74,
    "cloud": 75,
    "feelslike_c": 32.4,
    "feelslike_f": 90.2,
    "windchill_c": 27.7,
    "windchill_f": 81.9,
    "heatindex_c": 31.4,
    "heatindex_f": 88.5,
    "dewpoint_c": 23.4,
    "dewpoint_f": 74.2,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 1,
    "gust_mph": 4.5,
    "gust_kph": 7.3,
    "air_quality": {
      "co": 1428.6,
      "no2": 32.6,
      "o3": 0,
      "so2": 29.1,
      "pm2_5": 12.4,
      "pm10": 15.4,
      "us-epa-index": 1,
      "gb-defra-index": 2
    }
  }
}
```
