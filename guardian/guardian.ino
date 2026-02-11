/*
 * GUARDIAN SYSTEM - HARDWARE SELF-TEST
 * ------------------------------------
 * USE THIS IF YOU HAVE NO BUTTON CONNECTED!
 * 
 * Function:
 * - This code automatically sends an "ALERT" signal every 10 seconds.
 * - This allows you to test if your Admin Portal is receiving data
 *   without needing to wire up a real button yet.
 *
 * INSTRUCTIONS:
 * 1. Upload this to Arduino.
 * 2. Close Arduino IDE.
 * 3. Run 'start-guardian.bat'.
 * 4. Watch your Admin Dashboard - you should see a new Alert appear every 10 seconds.
 */

const int LED_PIN = 13;

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  
  // Flash quickly 5 times to show restart
  for(int i=0; i<5; i++) {
    digitalWrite(LED_PIN, HIGH); delay(50);
    digitalWrite(LED_PIN, LOW); delay(50);
  }
}

void loop() {
  // Wait 10 seconds
  delay(10000);

  // ------------------------------------------------
  // SIMULATE BUTTON PRESS
  // ------------------------------------------------
  Serial.println("ALERT"); 
  
  // Turn on LED for 1 second to show we sent it
  digitalWrite(LED_PIN, HIGH);
  delay(1000); 
  digitalWrite(LED_PIN, LOW);
}
