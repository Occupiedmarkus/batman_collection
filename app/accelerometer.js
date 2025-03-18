import { Accelerometer } from "accelerometer";
import { display } from "display";
import { initializeHR } from "./hrm.js";
import { updateWeatherDisplay } from "./weatherDisplay.js"; // Ensure these methods exist

let isWorn = true; // Assume it's worn initially
let accel; // Declare the accelerometer variable
accel
// Function to start the accelerometer and add the event listener
function startAccelerometer() {
    accel = new Accelerometer({ frequency: 1 }); // Create a new instance
    accel.addEventListener("reading", handleReading);
    accel.start();
}

// Function to handle accelerometer readings
function handleReading() {
    if (accel.x === 0 && accel.y === 0 && accel.z === 0) {
        // If there's no movement, assume it's off the wrist
        if (isWorn) {
            isWorn = false;
            stopSensors(); // Stop heart rate and weather sensors
        }
    } else {
        if (!isWorn) {
            isWorn = true;
            startSensors(); // Restart sensors if worn again
        }
    }
}
// Function to check wrist status
export function checkWristStatus() {
    startAccelerometer(); // Start the accelerometer

    // Display state listener
    display.addEventListener("change", () => {
        if (display.on) {
            accel.start(); // Start the accelerometer when display is on
            startSensors();
        } else {
            accel.stop(); // Stop the accelerometer when display is off
            stopSensors(); // Optionally stop other sensors
        }
    });

    // Optional: Log every minute
    setInterval(() => {
        console.log("Checking wrist status.");
    }, 600000); // 60,000 milliseconds = 1 minute
}

// Function to stop sensors
function stopSensors() {
    initializeHR().stop(); // Stop heart rate monitoring
    updateWeatherDisplay().stop();
    // Stop weather updates (if applicable)
    console.log("Sensors stopped: off-wrist");
}

// Function to start sensors
function startSensors() {
    initializeHR().start(); // Restart heart rate monitoring
    updateWeatherDisplay().start();
    // Restart weather updates (if applicable)
    console.log("Sensors started: on-wrist");
}

// Call this function to start monitoring
checkWristStatus();