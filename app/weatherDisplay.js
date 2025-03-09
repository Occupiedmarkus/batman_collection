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
    case "IntermittentCloudsDay":
    case "intermittentcloudsday":
    case "IntermittentCloudsNight":
    case "intermittentcloudsnight":
        weatherImage.href = "../resources/weather/hazy_sunshine_day.png";
        break;

    case "SunnyDay":
    case "sunnyday":
    case "MostlyClearNight":
    case "mostlyclearnight":
    case "ClearNight":
    case "clearnight":
        weatherImage.href = "../resources/weather/sunny_day.png";
        break;

    case "Snow":
    case "snow":
    case "Flurries":
    case "flurries":
    case "MostlyCloudyWithSnowDay":
    case "mostlycloudywithsnowday":
    case "MostlyCloudyWithSnowNight":
    case "mostlycloudywithsnownight":
    case "Sleet":
    case "sleet":
    case "Ice":
    case "ice":
        weatherImage.href = "../resources/weather/snow.png";
        break;

    case "Rain":
    case "rain":
    case "Showers":
    case "showers":
    case "FreezingRain":
    case "freezingrain":
    case "RainAndSnow":
    case "rainandsnow":
    case "MostlyCloudyWithShowersDay":
    case "mostlycloudywithshowersday":
    case "MostlyCloudyWithShowersNight":
    case "mostlycloudywithshowersnight":
        weatherImage.href = "../resources/weather/rain.png";
        break;

    case "Windy":
    case "windy":
        weatherImage.href = "../resources/weather/windy.png";
        break;

    case "Thunderstorms":
    case "thunderstorms":
    case "MostlyCloudyWithThunderstormsDay":
    case "mostlycloudywiththunderstormsday":
    case "MostlyCloudyWithThunderstormsNight":
    case "mostlycloudywiththunderstormsnnight":
    case "PartlyCloudyWithThunderstormsNight":
    case "partlycloudywiththunderstormsnnight":
    case "PartlySunnyWithThunderstormsDay":
    case "partlysunnywiththunderstormsday":
        weatherImage.href = "../resources/weather/thunderstorms.png";
        break;

    default:
        weatherImage.href = "../resources/weather/default.png";
        console.log("Default case triggered");
}
}
