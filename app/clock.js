import { me } from "appbit";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings"; 
import * as util from "./utils.js";

// TIME
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

// Set clock granularity to seconds for real-time updates
clock.granularity = "seconds";

export function initializeClock() {
    clock.ontick = evt => {
        let d = evt.date;

        // HOURS
        let hours = d.getHours();
        if (preferences.clockDisplay === "12h") {
            // 12h format
            hours = hours % 12 || 12;
        }
        setHours(hours);

        // MINUTES
        let minutes = d.getMinutes();
        setMins(minutes);
    }
}

// Set hours display
function setHours(val) {
    drawDigit(Math.floor(val / 10), hours1); // Tens place
    drawDigit(val % 10, hours2);             // Ones place
}

// Set minutes display
function setMins(val) {
    drawDigit(Math.floor(val / 10), mins1); // Tens place
    drawDigit(val % 10, mins2);             // Ones place
}

// Draw a digit on the display
function drawDigit(val, place) {
    place.image = `${val}.png`; // Set the image to the corresponding digit PNG
}