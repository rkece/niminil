const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You need to download this from Firebase Console

// 1. Initialize Firebase Admin
// If you haven't set up serviceAccountKey.json yet, follow the instructions in README_ARDUINO.md
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://niminil-default-rtdb.firebaseio.com"
    });
    console.log("✅ Firebase Admin Initialized");
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
    console.log("-> Make sure you downloaded serviceAccountKey.json and placed it in this folder.");
    process.exit(1);
}

const db = admin.firestore();

// 2. Configure Serial Port
// Change 'COM3' to your Arduino's port (e.g., 'COM3' on Windows, '/dev/ttyUSB0' on Linux/Mac)
const PORT_NAME = 'COM7';
const BAUD_RATE = 9600;

const port = new SerialPort({
    path: PORT_NAME,
    baudRate: BAUD_RATE,
    autoOpen: false
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.open((err) => {
    if (err) {
        console.log("\n❌ COULD NOT OPEN PORT " + PORT_NAME);
        console.log("------------------------------------------------");
        console.log("Attempting to list available ports for you...");
        SerialPort.list().then((ports) => {
            if (ports.length === 0) {
                console.log("-> No ports found. Is the Arduino plugged in?");
            } else {
                console.log("-> Found these ports:");
                ports.forEach(p => {
                    console.log(`   * ${p.path}\t${p.manufacturer || ''}`);
                });
                console.log("\n-> Please edit 'arduino-bridge.js' line 23 with one of the paths above.");
            }
            console.log("------------------------------------------------\n");

            console.log("⚠️  ENTERING SIMULATION MODE ⚠️");
            console.log("Type 'SOS' and press ENTER to test Firebase without Arduino.");
        });
        return;
    }
    console.log(`✅ Serial Port ${PORT_NAME} Opened at ${BAUD_RATE} baud`);
});

// Helper to handle manual input for simulation or extra control
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input.trim().toUpperCase().includes("SOS") || input.trim().toUpperCase().includes("ALERT")) {
        console.log("🚨 Manual/Simulated SOS Triggered!");
        sendEmergencyAlert();
    }
});

// 4. Listen for Data
parser.on('data', async (data) => {
    console.log(`Arduino says: ${data}`);

    // Check if the message is an ALERT
    // The Arduino sends "ALERT" or JSON like {"type":"SOS"}
    if (data.includes("ALERT") || data.includes("SOS")) {
        console.log("🚨 SOS Signal Received! Sending to Firebase...");
        await sendEmergencyAlert();
    }
});

async function sendEmergencyAlert() {
    // Simulate a database of Keychain Devices
    const mockUsers = [
        { id: "DEV-001", name: "Priya Sharma", email: "priya.s@example.com" },
        { id: "DEV-002", name: "Anjali Gupta", email: "anjali.g@example.com" },
        { id: "DEV-003", name: "Sneha Reddy", email: "sneha.r@example.com" }
    ];

    // Pick a random user to simulate distinct device alerts
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];

    const alertData = {
        userId: randomUser.id,
        userName: randomUser.name,
        userEmail: randomUser.email,
        status: "active",
        timestamp: Date.now(),
        // Simulating GPS Data (Bangalore Coordinates Center + Random Jitter)
        location: {
            lat: 12.9716 + (Math.random() * 0.05 - 0.025),
            lng: 77.5946 + (Math.random() * 0.05 - 0.025)
        },
        deviceType: "LoRa Keychain (Simulated)",
        details: "Panic Button Pressed (Long Range)"
    };

    try {
        // 1. Write to Firestore (DISABLED due to API Error)
        // const res = await db.collection('emergencies').add(alertData);
        // console.log(`✅ Alert sent to Firestore! ID: ${res.id}`);

        // 2. Write to Realtime Database (As requested by User)
        // This ensures data appears at your provided link: niminil-default-rtdb
        const rtdb = admin.database();
        await rtdb.ref('emergencies').push(alertData);

        // 3. Update Stats in Realtime Database
        await rtdb.ref('stats/activeEmergencies').transaction(current => (current || 0) + 1);
        await rtdb.ref('stats/totalEmergencies').transaction(current => (current || 0) + 1);
        console.log("✅ Alert sent to Realtime Database and Stats updated!");

    } catch (error) {
        console.error("❌ Error sending alert:", error);
    }
}
