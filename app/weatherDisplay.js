// app/weatherDisplay.js
import document from "document";
import { peerSocket } from "messaging";

export function updateWeatherDisplay(evt) {
    const { temperature, condition, locationName } = evt.data;

    // Update text display
    const svgText = document.getElementById("weatherText");
    svgText.text = `It's ${temperature}° in ${locationName}`;

    // Update the weather image based on condition
    const weatherImage = document.getElementById("weatherImage");
    switch (condition) {
        case "Cloudy":
        case "Overcast":
            weatherImage.href = "resources/weather/cloudy.png";
            break;
        case "Hot":
            weatherImage.href = "resources/weather/hot.png";
            break;
        case "HazySunshineDay":
        case "HazyMoonlight":
        case "PartlySunnyDay":
            weatherImage.href = "resources/weather/hazy_sunshine_day.png";
            break;
        case "SunnyDay":
            weatherImage.href = "resources/weather/sunny_day.png";
            break;
        case "Rain":
        case "Showers":
        case "FreezingRain":
            weatherImage.href = "resources/weather/rain.png";
            break;
        case "Windy":
            weatherImage.href = "resources/weather/windy.png";
            break;
        case "Thunderstorms":
            weatherImage.href = "resources/weather/thunderstorms.png";
            break;
        default:
            weatherImage.href = "resources/weather/default.png"; // Clear image for unrecognized conditions
    }
}