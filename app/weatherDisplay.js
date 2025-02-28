// app/weatherDisplay.js
import document from "document";
import { peerSocket } from "messaging";

const weatherImage = document.getElementById("weatherImage");

export function updateWeatherDisplay(evt) {
    const { temperature, condition, locationName } = evt.data;

    switch (condition) {
        case "Cloudy":
        case "Overcast":
            weatherImage.href = "weather/cloudy.png";
            break;
        case "Hot":
            weatherImage.href = "weather/hot.png";
            break;
        case "HazySunshineDay":
        case "HazyMoonlight":
        case "PartlySunnyDay":
            weatherImage.href = "weather/hazy_sunshine_day.png";
            break;
        case "SunnyDay":
            weatherImage.href = "weather/sunny_day.png";
            break;
        case "Rain":
        case "Showers":
        case "FreezingRain":
            weatherImage.href = "weather/rain.png";
            break;
        case "Windy":
            weatherImage.href = "weather/windy.png";
            break;
        case "Thunderstorms":
            weatherImage.href = "weather/thunderstorms.png";
            break;
        default:
            weatherImage.href = "weather/default.png"; // Clear image for unrecognized conditions
    }
}