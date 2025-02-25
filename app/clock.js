import { me } from "appbit";
import { preferences } from "user-settings";
import clock from "clock";
import document from "document";
import * as util from "./utils.js";

clock.granularity = "minutes";

// TIME
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

// Function to initialize the clock
export function initializeClock() {
    let today = new Date();
    let hours = today.getHours();
    let mins = today.getMinutes();

    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = util.zeroPad(hours);
    }

    setHours(hours);
    setMins(mins);

}

clock.ontick = () => initializeClock();

// Set hours display
function setHours(val) {
    if (val > 9) {
        drawDigit(Math.floor(val / 10), hours1);
    } else {
        drawDigit("0", hours1);
    }
    drawDigit(Math.floor(val % 10), hours2);
}

// Set minutes display
function setMins(val) {
    drawDigit(Math.floor(val / 10), mins1);
    drawDigit(Math.floor(val % 10), mins2);
}

// Draw a digit on the display
function drawDigit(val, place) {
    place.image = `${val}.png`;
}