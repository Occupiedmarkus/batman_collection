import { HeartRateSensor } from "heart-rate";
import document from "document";

// Heart Rate Sensor
const hrm = new HeartRateSensor();

// Elements for displaying heart rate digits
let hr1 = document.getElementById("hr1");
let hr2 = document.getElementById("hr2");
let hr3 = document.getElementById("hr3");

// Initialize heart rate display
export function initializeHR() {
    hr1.image = "0.png";
    hr2.image = "0.png";
    hr3.image = "0.png";
}

// Function to handle heart rate readings
hrm.onreading = () => {
    const heartRate = hrm.heartRate;

    if (heartRate) {
        // Display heart rate using images
        displayHeartRate(heartRate);
    } else {
        initializeHR(); // Reset if no valid heart rate
    }
};

// Function to display heart rate using images
function displayHeartRate(rate) {
    const rateString = rate.toString();
    const length = rateString.length;

    // Set images for each digit
    if (length === 1) {
        hr1.x=146;
        hr2.x=166;
        hr1.image = `${rateString[0]}.png`; // First digit
        hr2.image = "0.png"; // Second digit
        hr3.image = ""; // Hide
    } else if (length === 2) {
        hr1.x=146;
        hr2.x=166;
        hr1.image = `${rateString[0]}.png`; // First digit
        hr2.image = `${rateString[1]}.png`; // Second digit
        hr3.image = ""; // Hide
    } else if (length === 3) {
        hr1.x = 136; // Reset to original position
        hr2.x = 156; // Reset to original position
        hr3.x = 176; // Reset to original position

        hr1.image = `${rateString[0]}.png`; // First digit
        hr2.image = `${rateString[1]}.png`; // Second digit
        hr3.image = `${rateString[2]}.png`; // Third digit
    } 
};

// Error handling for heart rate sensor
hrm.onerror = () => {
    initializeHR(); // Reset display on error
};

// Start the heart rate sensor
hrm.start();