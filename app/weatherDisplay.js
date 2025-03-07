import document from "document";
import { peerSocket } from "messaging";

const weatherImage = document.getElementById("weatherImage");

// app/weatherDisplay.js
export function updateWeatherDisplay(data) {
    const { temp, cond, loc, uni } = data;

    console.log(`Weather: ${temp}°${uni} in ${loc}-${cond}.`);

// Set the appropriate weather image based on the condition
switch (cond) {
    case "Cloudy":
    case "cloudy":
    case "Overcast":
    case "overcast":
        weatherImage.href = "../resources/weather/cloudy.png";
        break;
    case "Hot":
    case "hot":
        weatherImage.href = "../resources/weather/hot.png";
        break;
    case "HazySunshineDay":
    case "hazysunshineday":
    case "HazyMoonlight":
    case "hazymoonlight":
    case "PartlySunnyDay":
    case "partlysunnyday":
        weatherImage.href = "../resources/weather/hazy_sunshine_day.png";
        break;
    case "SunnyDay":
    case "sunnyday":
        weatherImage.href = "../resources/weather/sunny_day.png";
        break;
    case "Rain":
    case "rain":
    case "Showers":
    case "showers":
    case "FreezingRain":
    case "freezingrain":
        weatherImage.href = "../resources/weather/rain.png";
        break;
    case "Windy":
    case "windy":
        weatherImage.href = "../resources/weather/windy.png";
        break;
    case "Thunderstorms":
    case "thunderstorms":
        weatherImage.href = "../resources/weather/thunderstorms.png";
        break;
    default:
        weatherImage.href = "../resources/weather/default.png";
        console.log("Default case triggered");
}
}
