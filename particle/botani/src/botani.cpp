/* 
 * Project Botani Buddies
 * Author: Mariam Aoune & 
 * Date: 
 * For comprehensive documentation and examples, please visit:
 * https://docs.particle.io/firmware/best-practices/firmware-template/
 */

// Capacitive sensor code: https://github.com/plemaster01/ArduinoCapactiveTouch/blob/main/CapTouch_2Leds/CapTouch_2Leds.ino
// Include Particle Device OS APIs
// Include libraries for the capacitive sensor and for the OLED display
#include "Particle.h"
#include "JsonParserGeneratorRK.h"
#include <string>
#include "CapacitiveSensor.h"
#include "Adafruit_GFX.h"
#include <SH1106.h>

// Let Device OS manage the connection to the Particle Cloud
SYSTEM_MODE(AUTOMATIC);

// Run the application and system concurrently in separate threads
SYSTEM_THREAD(ENABLED);

// Show system, cloud connectivity, and application logs over USB
// View logs with CLI using 'particle serial monitor --follow'
SerialLogHandler logHandler(LOG_LEVEL_INFO);

// Capacitive sensor setup
CapacitiveSensor capSensor = CapacitiveSensor(7, 8);

// Thresholds for turning the lamp on
int threshold = 2000;
int threshold2 = 1000;

// Variables to store sensor data
int sensor_moisture = 0;
String moistureLevelMsg;
int sensor_touch = 0;
String touchLevelMsg;
String emojiMsgTouch;
String emojiMsgMoisture;

// Pins for LEDs
const int ledPin2 = D2; // Red
const int ledPin = D3;  // Green

// Pins for soundboard
#define PIN_PIEZO   11 
#define PIN_SOUNDBOARD_SAD 6
#define PIN_SOUNDBOARD_HAPPY 5

// Analog pin for moisture sensor
int sensor_pin = A0;

// Initialize the OLED display
SH1106 display(0x3C);

#define DEMO_DURATION 3000
typedef void (*Demo)(void);

int demoMode = 0;
int counter = 1;

// Function to build and transmit JSON data
void buildJSON(float lat = 0.0, float lon = 0.0, float accu = 0.0) {
  JsonWriterStatic<512> jw; {
    JsonWriterAutoObject obj(&jw);
    jw.insertKeyValue("device-name", "cslab-aspartic");
    jw.insertKeyValue( "moiture_level", sensor_moisture );
    delay(333);
    jw.insertKeyValue( "moitureLevelMsg", moistureLevelMsg);
    delay(33);
    jw.insertKeyValue( "touch_level", sensor_touch);
    delay(33);
    jw.insertKeyValue( "touchLevelMsg", touchLevelMsg);
    delay(33);
    jw.insertKeyValue( "emojiMsgTouch", emojiMsgTouch);
    delay(33);
    jw.insertKeyValue( "emojiMsgMoisture", emojiMsgMoisture);
  }
  Serial.println(jw.getBuffer());
  // Transmit data to a HTTPS server out of Particle Cloud platform - use a webhook
  if ( Particle.publish("CART360-BOTANI", jw.getBuffer()) ) Serial.println ("botani");
  delay(1002); // Wait a little for the POST to complete
}

// Setup function
void setup() {
  Serial.begin(115200);
  waitFor(Serial.isConnected, 5000);

  //Set the LED pins as outputs
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);

  pinMode(sensor_pin, INPUT);

  //Set speakers as outputs 
  pinMode(PIN_SOUNDBOARD_SAD, OUTPUT);
  pinMode(PIN_SOUNDBOARD_HAPPY, OUTPUT);

  // Initialize the OLED display
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
}

// Function to draw a happy face on the OLED display
void drawHappyFace() {
  display.setColor(WHITE);
  display.drawCircle(34, 15, 3*3);
  display.drawCircle(84, 15, 3*3);
  display.drawHorizontalLine(40 , 50, 40);
  display.drawVerticalLine(40, 40, 10);
  display.drawVerticalLine(80, 40, 10);
}

// Function to draw a sad face on the OLED display
void drawSadFace() {
  display.setColor(WHITE);
  display.drawCircle(34, 15, 3*3);
  display.drawCircle(84, 15, 3*3);
  display.drawHorizontalLine(40 , 50, 40);
  display.drawVerticalLine(33, 30, 7);
}

// Function to draw a normal face on the OLED display
void drawNormalFace() {
  display.setColor(WHITE);
  display.drawCircle(34, 15, 3*3);
  display.drawCircle(84, 15, 3*3);
  display.drawHorizontalLine(40 , 50, 40);
}

// Loop function
void loop() {
  // Display current millis on the OLED
  display.setTextAlignment(TEXT_ALIGN_RIGHT);
  display.drawString(10, 128, String(millis()));
  display.display();
  counter++;
  delay(10);

  // Touch sensor logic
  sensor_touch = capSensor.capacitiveSensor(30);
  delay(200);

  // if the value is greater than the threshold
  if (sensor_touch > threshold) {
    // turn the LED on
    digitalWrite(ledPin, HIGH);
  }
  // if it's lower than the threshold
  else {
    // turn the LED off
    digitalWrite(ledPin, LOW);
  }

// if the value is greater than the threshold
  if (sensor_touch > threshold2) {
    // turn the LED on
    digitalWrite(ledPin2, HIGH);
  }
  // if it's lower than the threshold
  else {
    // turn the LED off
    digitalWrite(ledPin2, LOW);
  }
  delay(10);

  // OLED display messages based on touch sensor values
  //touchLevelMsg and emojiMsgTouch display emoji on our
  if (sensor_touch < 50){
    display.clear();
    touchLevelMsg = "not touched :(";
    emojiMsgTouch = "129402";
    Serial.println(touchLevelMsg);
    drawNormalFace();
    display.display();
  } else if (sensor_touch > 50 && sensor_touch < 200){
    display.clear();
    touchLevelMsg = "softly touched :)";
    emojiMsgTouch = "128527";
    Serial.println(touchLevelMsg);
    drawSadFace();
    display.display();
  } else {
    display.clear();
    touchLevelMsg = "touched a lot :D";
    emojiMsgTouch = "129760";
    Serial.println(touchLevelMsg);
    drawHappyFace();
    display.display();
  }

  // Moisture sensor logic
  sensor_moisture = analogRead(sensor_pin);
  //Serial.print("Sensor_data:");
  Serial.print(sensor_moisture);
  Serial.print("\t | ");
  
  if(sensor_moisture> 3500)
  {
    // Declare a string with an initial value
    moistureLevelMsg = "SOIL IS DRY :(";
    emojiMsgMoisture = "127797";
    Serial.println("SOIL IS DRY :(");
    delay(50);
    digitalWrite(PIN_SOUNDBOARD_HAPPY, HIGH);
    digitalWrite(PIN_SOUNDBOARD_SAD, LOW);
  }
  else if(sensor_moisture >= 3500 && sensor_moisture <= 1000)
  {
    moistureLevelMsg = "SOIL IS OK :)";
    emojiMsgMoisture = "129716";
    Serial.println("SOIL IS OK :)");
    delay(50);
    digitalWrite(PIN_SOUNDBOARD_SAD, LOW);
    digitalWrite(PIN_SOUNDBOARD_HAPPY, HIGH);
 
  }
  else if(sensor_moisture < 2000)
  {
    moistureLevelMsg = "SOIL IS WET :D";
    emojiMsgMoisture = "128703 OK";
    Serial.println("SOIL IS WET :D");
    delay(50);
    digitalWrite(PIN_SOUNDBOARD_SAD, HIGH);
    digitalWrite(PIN_SOUNDBOARD_HAPPY, LOW);
  };

   delay(100);
  buildJSON();
  delay(1256);
  
}