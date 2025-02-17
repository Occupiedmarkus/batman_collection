import * as document from "document";
import clock from "clock";
import { updateDisplay, hrm } from "./heartrate.js";

// Update the display every second
setInterval(updateDisplay, 1000);

// Set clock granularity to minutes
clock.granularity = "minutes"; // seconds, minutes, or hours

const clockLabel = document.getElementById("clock-label");
const dateLabel = document.getElementById("date-label"); // New date label

// Function to update the clock and date
function updateTimeAndDate() {
  const now = new Date();
  
  // Format time
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clockLabel.text = `${hours}:${minutes}`;
  
  // Format date (e.g., "Mon, Jan 1")
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  dateLabel.text = now.toLocaleDateString("en-US", options);
}

// Update time and date every minute
clock.addEventListener("tick", (evt) => {
  updateTimeAndDate();
});

// Initial call to set the time and date immediately
updateTimeAndDate();

const myAnimation = document.getElementById("myAnimation");
let isAnimating = false; // Track the animation state

// Start the animation initially in a disabled state
myAnimation.animate("disable");

// Toggle animation on touch
document.addEventListener("touchstart", () => {
    if (isAnimating) {
        myAnimation.animate("disable"); // Stop the animation
    } else {
        myAnimation.animate("enable"); // Start the animation
    }
    isAnimating = !isAnimating; // Toggle the state
});