let document = require("document");
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { me } from "appbit";

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");
let hrIcon = document.getElementById("hrIcon");

// Initialize the UI with some values
hrLabel.text = "--";

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();

// Event handler for heart rate readings
hrm.onreading = function() {
  let currentHR = hrm.heartRate;
  console.log("Heart rate reading: " + currentHR);
  hrLabel.text = currentHR;

  // Animate the icon based on heart rate
  if (currentHR > 0) {
    hrIcon.animate("enable");
  } else {
    hrIcon.animate("disable");
  }
}

// Function to start heart rate measurements
function startHRMeasurements() {
  if (me.permissions.granted("access_heart_rate")) {
    hrm.start();
    console.log("Heart rate measurements started.");
  } else {
    console.log("Heart rate permission not granted.");
  }
}

// Function to stop heart rate measurements
function stopHRMeasurements() {
  hrm.stop();
  console.log("Heart rate measurements stopped.");
}

// Initialize the heart rate sensor and set up display detection
export function initializeHR() {
  if (display.on) {
    startHRMeasurements();
  }

  // React to display on/off
  display.onchange = function() {
    if (display.on) {
      startHRMeasurements();
    } else {
      stopHRMeasurements();
    }
  }
}

// Start the initialization process
initializeHR();