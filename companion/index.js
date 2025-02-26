import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Handle socket open event
messaging.peerSocket.onopen = () => {
    restoreSettings();
};

// Handle incoming messages
messaging.peerSocket.onmessage = evt => {
    if (evt.data.key === "animationEnabled") {
        updateAnimationState(evt.data.value); // Update animation state based on incoming message
    }
};

// Handle settings change
settingsStorage.onchange = evt => {
    let data = {
        key: evt.key,
        newValue: evt.newValue
    };
    sendVal(data);
    if (evt.key === "animationEnabled") {
        updateAnimationState(evt.newValue); // Pass the new value to the function
    }
};

// Restore saved settings and send them to the device
function restoreSettings() {
    for (let index = 0; index < settingsStorage.length; index++) {
        let key = settingsStorage.key(index);
        if (key) {
            let data = {
                key: key,
                value: settingsStorage.getItem(key)
            };
            sendVal(data);
        }
    }
}

// Send data to the device
function sendVal(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    }
}

// Function to update animation state based on settings
function updateAnimationState(isEnabled) {
    const animationEnabled = isEnabled === "true";
    console.log(`Animation Enabled: ${animationEnabled}`); // Log the animation state
    // Send the animation state to the device
    sendVal({ key: "animationEnabled", value: animationEnabled });
}

// Start listening for settings
restoreSettings();