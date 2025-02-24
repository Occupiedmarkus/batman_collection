import { me } from "appbit";
import clock from "clock";
import document from "document";
import * as util from "./utils.js";

// TIME
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

// Set clock granularity to seconds for real-time updates
clock.granularity = "seconds";

// Function to initialize the clock
export function initializeClock() {
    clock.ontick = evt => {
        let d = evt.date;

        // HOURS
        let hours = d.getHours();
        if (preferences.clockDisplay === "12h") {
            // 12h format
            hours = hours % 12 || 12;
        } else {
            // 24h format
            hours = util.zeroPad(hours);
        }
        setHours(hours);

        // MINUTES
        let minute = ("0" + d.getMinutes()).slice(-2);
        setMins(minute);
    };
}

// Set hours display
function setHours(val) {
    if (val > 9) {
        drawDigit(Math.floor(val / 10), hours1);
    } else {
        drawDigit("", hours1);
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