/* 
 * Project Botani Buddies
 * Author: Mariam Aoune and Negar Roofigariesfahani
 * Date: December 11th 2021
 * For comprehensive documentation and examples, please visit:
 * https://docs.particle.io/firmware/best-practices/firmware-template/
 */

// Include Particle Device OS APIs
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


//TOUCHE

// import the library (must be located in the Arduino/libraries directory)


// create an instance of the library
// pin 4 sends electrical energy
// pin 2 senses senses a change
CapacitiveSensor capSensor = CapacitiveSensor(7, 8);

// threshold for turning the lamp on

int threshold = 2000;
int threshold2 = 1000;

int sensor_moiture = 0;
String moitureLevelMsg;
int sensor_touch =0;
String touchLevelMsg;
String emojiMsgTouch;

String emojiMsgMoisture;



// pin the LED is connected to
//red
const int ledPin = D3;
//green
const int ledPin2 = D2;

//MOISTURE

#define PIN_PIEZO   11 
#define PIN_SOUNDBOARD_SAD 6
#define PIN_SOUNDBOARD_HAPPY 5


//Port 4

int sensor_pin = A0;
 
// Initialize the OLED display
SH1106 display(0x3C);


#define DEMO_DURATION 3000
typedef void (*Demo)(void);

int demoMode = 0;
int counter = 1;


/* WE ASSUME GOOGLE GEOLOCATION FOR ALL EXAMPLES - EXCEPT TURBIDITY SENSOR ;) */
void buildJSON(float lat = 0.0, float lon = 0.0, float accu = 0.0) {

  JsonWriterStatic<512> jw; {
    JsonWriterAutoObject obj(&jw);
    jw.insertKeyValue("device-name", "cslab-aspartic");
      jw.insertKeyValue( "moiture_level", sensor_moiture );
      delay(333);
      jw.insertKeyValue( "moitureLevelMsg", moitureLevelMsg);
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
    
  /* TRANSMIT DATA TO A HTTPS SERVER OUT OF PARTICLE CLOUD PLATFORM - USE A WEBHOOK */ 
  if ( Particle.publish("CART360-BOTANI", jw.getBuffer()) ) Serial.println ("botani");
  delay(1002); // WAIT A LITTLE FOR POST TO COMPLETE
}

 

 
 

// setup() runs once, when the device is first turned on
void setup() {
  Serial.begin(115200);
 
  waitFor(Serial.isConnected, 5000);

  // set the LED pin as an output
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);


  pinMode(sensor_pin, INPUT);
 
  pinMode(PIN_SOUNDBOARD_SAD, OUTPUT);
    pinMode(PIN_SOUNDBOARD_HAPPY, OUTPUT);

 // Initialising the UI will init the display too.
  display.init();

  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);

}

void drawHappyFace() {
 
    display.setColor(WHITE);
    display.drawCircle(34, 15, 3*3);
    display.drawCircle(84, 15, 3*3);

    // Draw a line horizontally
    display.drawHorizontalLine(40 , 50, 40);
    
    // Draw a line vertically
    display.drawVerticalLine(40, 40, 10);
    display.drawVerticalLine(80, 40, 10);

   
}

void drawSadFace(){

   display.setColor(WHITE);
   display.drawCircle(34, 15, 3*3);
   display.drawCircle(84, 15, 3*3);

  // Draw a line horizontally
  display.drawHorizontalLine(40 , 50, 40);

  display.drawVerticalLine(33, 30, 7);
}

 void drawNormalFace(){
   display.setColor(WHITE);
   display.drawCircle(34, 15, 3*3);
   display.drawCircle(84, 15, 3*3);

  // Draw a line horizontally
  display.drawHorizontalLine(40 , 50, 40);

 }

  void drawNormalFaceFill(){
   display.setColor(WHITE);
   display.drawCircle(34, 15, 3*3);
   display.drawCircle(84, 15, 3*3);
   display.fillCircle(34, 15, 32 - (23/3)* 3);
   display.fillCircle(84, 15, 32 - (23/3)* 3);

  // Draw a line horizontally
  display.drawHorizontalLine(40 , 50, 40);

 }


 
// loop() runs over and over again, as quickly as it can execute.
void loop() {
 // clear the display

  display.setTextAlignment(TEXT_ALIGN_RIGHT);
  display.drawString(10, 128, String(millis()));

  // write the buffer to the display
  display.display();
 
  counter++;
  delay(10);
   
   ///////////////////TOUCHE 

  // store the value reported by the sensor in a variable
  sensor_touch = capSensor.capacitiveSensor(30);

  // print out the sensor value

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
    Serial.println("in sad face");
    // turn the LED off
    digitalWrite(ledPin2, LOW);

  }
  delay(10);

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
  emojiMsgTouch = "129760";
  Serial.println(touchLevelMsg);

    drawSadFace();
    display.display();
} else {
  display.clear();

  touchLevelMsg = "touched alot :D";

  emojiMsgTouch = "129303";

  Serial.println(touchLevelMsg);
     drawHappyFace();
    display.display();
}

/////////////////////////MOISTURE

  sensor_moiture = analogRead(sensor_pin);
  Serial.print(sensor_moiture);
  Serial.print("\t | ");
  
  if(sensor_moiture> 3500)
  {
    // Declare a string with an initial value
    moitureLevelMsg = "SOIL IS DRY :(";
    emojiMsgMoisture = "127797";

    Serial.println("SOIL IS DRY :(");
    delay(50);
   digitalWrite(PIN_SOUNDBOARD_HAPPY, HIGH);
    digitalWrite(PIN_SOUNDBOARD_SAD, LOW);
  }
  else if(sensor_moiture >= 3500 && sensor_moiture <= 1000)
  {
    moitureLevelMsg = "SOIL IS OK :)";
    emojiMsgMoisture = "129716";

    Serial.println("SOIL IS OK :)");
    delay(50);
    digitalWrite(PIN_SOUNDBOARD_SAD, LOW);
    digitalWrite(PIN_SOUNDBOARD_HAPPY, HIGH);
 
  }
  else if(sensor_moiture < 2000)
  {
    moitureLevelMsg = "SOIL IS WET :D";
    emojiMsgMoisture = "128703";

    Serial.println("SOIL IS WET :D");
    delay(50);
    
    digitalWrite(PIN_SOUNDBOARD_SAD, HIGH);
    digitalWrite(PIN_SOUNDBOARD_HAPPY, LOW);
  };

   delay(100);
  buildJSON();
  delay(1256);
  
}