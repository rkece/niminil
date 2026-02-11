# Guardian Arduino Connection Guide

This guide explains how to connect your Arduino Uno SOS button to the Guardian Admin Dashboard.

## 1. Hardware Setup (Arduino)
1.  **Components**: Arduino Uno, Push Button, Jumper Wires.
2.  **Wiring**:
    *   One leg of Button -> **GND** on Arduino.
    *   Other leg of Button -> **Pin 2** on Arduino.
    *   (No resistor needed, we use the internal pull-up resistor).
3.  **Upload Code**:
    *   Open `guardian.ino` in Arduino IDE.
    *   Select your Board (Arduino Uno) and Port.
    *   Upload the sketch.
    *   **Test**: Open Serial Monitor (9600 baud). Press button. You should see "ALERT". Close Serial Monitor (Important: Node.js cannot connect if Serial Monitor is open).

## 2. Firebase Setup (Credentials)
The bridge script needs permission to write to your database.
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Select your project (`niminil`).
3.  Go to **Project Settings** -> **Service accounts**.
4.  Click **Generate new private key**.
5.  A JSON file will download. Rename it to `serviceAccountKey.json`.
6.  Move this file to your project folder: `c:\niminil\serviceAccountKey.json`.

## 3. Run the Bridge
1.  Open VS Code Terminal.
2.  Make sure you are in `c:\niminil`.
3.  Check which COM port your Arduino is on (e.g., `COM3`, `COM4`).
    *   Edit `arduino-bridge.js` line 23: `const PORT_NAME = 'COM3';` to match yours.
4.  Run the bridge:
    ```bash
    node arduino-bridge.js
    ```
5.  If successful, you will see:
    ```
    ✅ Firebase Admin Initialized
    ✅ Serial Port COM3 Opened...
    ```
6.  Press the Button on Arduino. You should see `🚨 SOS Signal Received!` and the data will appear on your `admin-dashboard.html`.

## Troubleshooting
- **Error: Access Denied / COM busy**: Close Arduino IDE Serial Monitor. Only one app can use the port at a time.
- **Error: Module not found**: Run `npm install serialport firebase-admin`.
