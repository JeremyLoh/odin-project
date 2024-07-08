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

# Assignment

1. Setup a blank HTML document with the appropriate links to your JavaScript and CSS files
2. Write the functions that hit the API. You're going to want functions that can take a location and return the weather data for that location. For now, just `console.log()` the information
3. Write the functions that process the JSON data you are getting from the API and return an object with only the data you require for your app
4. Setup a form that will let users input their location and will fetch the weather info (still just `console.log()` it)
5. Display the information on your webpage
6. Add any styling you like
7. Optional: add a 'loading' component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to test for low-end devices
8. Push to github and share your solution
