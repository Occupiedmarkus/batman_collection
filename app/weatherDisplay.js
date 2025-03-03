import document from "document";
import { peerSocket } from "messaging";

const weatherImage = document.getElementById("weatherImage");

export function updateWeatherDisplay(weatherUpdate) {
    const { temp, cond, loc, uni } = weatherUpdate;

    const weatherImage = document.getElementById("weatherImage");
    console.log(`Weather: ${temp}°${uni} in ${loc} - Condition: ${cond}.`);

    // Set the appropriate weather image based on the condition
    switch (cond) {
        case "Cloudy":
        case "Overcast":
            weatherImage.href = "../resources/weather/cloudy.png";
            break;
        case "Hot":
            weatherImage.href = "../resources/weather/hot.png";
            break;
        case "HazySunshineDay":
        case "HazyMoonlight":
        case "PartlySunnyDay":
            weatherImage.href = "../resources/weather/hazy_sunshine_day.png";
            break;
        case "SunnyDay":
            weatherImage.href = "../resources/weather/sunny_day.png";
            break;
        case "Rain":
        case "Showers":
        case "FreezingRain":
            weatherImage.href = "../resources/weather/rain.png";
            break;
        case "Windy":
            weatherImage.href = "../resources/weather/windy.png";
            break;
        case "Thunderstorms":
            weatherImage.href = "../resources/weather/thunderstorms.png";
            break;
        default:
            weatherImage.href = "../resources/weather/default.png"; // Clear image for unrecognized conditions
            console.log("Default case triggered");
    }
}