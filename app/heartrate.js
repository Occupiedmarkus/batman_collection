let document = require("document");
import { HeartRateSensor } from "heart-rate";

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
hrLabel.text = "--";

// This function updates the heart rate display
export function updateHR() {
  // Just log for now to confirm it's being called
  console.log("Current heart rate:"+ hrm.heartRate);
}

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Initialising HeartRateSensor..."+ hrm.heartRate);
  hrLabel.text = hrm.heartRate;

  // Update the last value timestamp
  lastValueTimestamp = Date.now();
}

// Begin monitoring the sensor
hrm.start();