import { HeartRateSensor } from "heart-rate";
import document from "document";
import display from "display";
import { me } from "appbit";

// Heart Rate Sensor
const hrm = new HeartRateSensor();

var lastMeasuredHR = 0;
var timeOfLastMeasuredHR = 0;
var lastHRMReading = 0;
var hrmActive = false;
var hrTimer = null;

// Elements for displaying heart rate digits
let hr1 = document.getElementById("hr1");
let hr2 = document.getElementById("hr2");
let hr3 = document.getElementById("hr3");
let hrImage = document.getElementById("hrImage");
let hrText = document.getElementById("hrText")

// Initialize heart rate display
export function initializeHR() {
    hrText.style.fill = '';
    hrText.text="--";
    hr1.image = "0.png";
    hr2.image = "0.png";
    hr3.image = "0.png";
  if (me.permissions.granted("access_heart_rate")) {
    hrm = new HeartRateSensor();
    if (display.on) {
      //already start measurements
      hrm.start();
    }
  }

  //react on display on/off
  display.onchange = function() {
    if (display.on) {
      hrm.start();
    } else {
      hrm.stop();
    }
  }
}

// Function to handle heart rate readings
hrm.onreading = () => {
    const heartRate = hrm.heartRate;
    console.log("Current HR: " + heartRate);
    if (heartRate) {
        // Display heart rate using images
        displayHeartRate(heartRate);
        getHRMReading();
    } else {
        initializeHR(); // Reset if no valid heart rate
        getHRMReading();
    }
};

function getHRMReading() {
  let timeToNextReading = 1000;   //check every second even when no HR is detected
  
  let now = new Date().getTime();
  let hr = hrm.heartRate;
  if (hrm.timestamp === lastHRMReading || !hr) {
    if (now - timeOfLastMeasuredHR >= 3000) {
      //more then 3 seconds no new HR reading, watch probably off wrist
      if (hrmActive) {
        //show as not active
        hrmActive = false;
        showHRMValue("--");
      }
    }
    else {
      //no new reading, but less then 3 seconds ago we still had a valid reading, so keep animating at same speed
      timeToNextReading = 60000/lastMeasuredHR;
    }
  } else {
    //new reading
    if (!hrmActive) {
      hrmActive = true;
    }

    //store last measured to use when we get no new readings next time
    timeOfLastMeasuredHR = now;
    lastMeasuredHR = hr;
    showHRMValue(lastMeasuredHR);
    timeToNextReading = 60000/lastMeasuredHR;
  }
  lastHRMReading = hrm.timestamp;
  
  //animate when active
  if (hrmActive) {
    hrImage.animate("enable");
  }
  
  //set next reading timeout depending on HR
  if (hrTimer) {
    clearTimeout(hrTimer);
    hrTimer = null;
  }
  hrTimer = setTimeout(getHRMReading, timeToNextReading);
}

// Function to change hrText should HR cannot be detected
function showHRMValue(newHRMValue) {
  hrText.text = newHRMValue;
  hrText.style.fill="black";
}

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