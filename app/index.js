import * as document from "document";
import clock from "clock";
import { updateDisplay } from "./heartrate.js"; // Ensure this path is correct

// Set clock granularity to seconds for real-time updates
clock.granularity = "minutes"; 

const clockLabel = document.getElementById("clock-label");
const dateLabel = document.getElementById("date-label"); 

// Update time and date every tick
clock.addEventListener("tick", (evt) => {
  clockLabel.text = evt.date.toTimeString().slice(0, -7);
});

dateLabel.text = evt.date.toDateString();

// Function to update the clock and date
function updateTimeAndDate() {
  const now = new Date();
  
  // Format time
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0'); 
  clockLabel.text = `${hours}:${minutes}:${seconds}`;
  
  // Format date as dd/mm
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  dateLabel.text = `${day}/${month}`; 
}



// Initial call to set the time and date immediately
updateTimeAndDate();

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