import * as document from "document";
import clock from "clock";
import { updateDisplay } from "./heartrate.js"; // Ensure this path is correct

const dateLabel = document.getElementById("date-label"); 

/ Tick every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);

// Function to get the ordinal suffix for a given date
function getOrdinalSuffix(date) {
    if (date > 3 && date < 21) return 'TH'; // Special case for 11th to 13th
    switch (date % 10) {
        case 1: return 'ST';
        case 2: return 'ND';
        case 3: return 'RD';
        default: return 'TH';
    }
}

// Set the date only once
const now = new Date();

// Define arrays for day and month names
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Get the day, date, month, and year
const dayName = days[now.getDay()]; // Day name (0-6)
const date = now.getDate(); // Date (1-31)
const monthName = months[now.getMonth()]; // Month name (0-11)
const year = now.getFullYear().toString().slice(-2); // Last two digits of year

// Get the ordinal suffix
const suffix = getOrdinalSuffix(date);

// Construct the formatted date string
const formattedDate = `${dayName} ${date} ${suffix} ${monthName} ${year}`;

// Set the date label
dateLabel.text = formattedDate; // Initialize date display

// Update the display every second (for heart rate)
setInterval(() => {
  console.log("Calling updateDisplay...");
  updateDisplay();  // Ensure this function is defined
}, 1000);

const myAnimation = document.getElementById("myAnimation");
let isAnimating = false; 

// Start the animation initially in a disabled state
if (myAnimation) {
    myAnimation.animate("disable");
}

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (isAnimating) {
        myAnimation.animate("disable"); 
    } else {
        myAnimation.animate("enable"); 
    }
    isAnimating = !isAnimating; 
});
