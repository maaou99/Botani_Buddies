/* 
 * Project myProject
 * Author: Your Name
 * Date: 
 * For comprehensive documentation and examples, please visit:
 * https://docs.particle.io/firmware/best-practices/firmware-template/
 */

// Include Particle Device OS APIs
#include "Particle.h"
#include "JsonParserGeneratorRK.h"


// Let Device OS manage the connection to the Particle Cloud
SYSTEM_MODE(AUTOMATIC);

// Run the application and system concurrently in separate threads
SYSTEM_THREAD(ENABLED);


// Show system, cloud connectivity, and application logs over USB
// View logs with CLI using 'particle serial monitor --follow'
SerialLogHandler logHandler(LOG_LEVEL_INFO);

#define PIN_PIEZO   11 

int sensor_pin = A0;
int sensor_data;


/* WE ASSUME GOOGLE GEOLOCATION FOR ALL EXAMPLES - EXCEPT TURBIDITY SENSOR ;) */
void buildJSON(float lat = 0.0, float lon = 0.0, float accu = 0.0) {

  JsonWriterStatic<512> jw; {
    JsonWriterAutoObject obj(&jw);
    jw.insertKeyValue("sensor", "rgb-colour-sensor");
    jw.insertKeyValue("device-name", "cslab-aspartic");
      jw.insertKeyValue( "moiture_level", sensor_data );
      delay(333);
      jw.insertKeyValue("green", random(0, 255) );
      delay(333);
      jw.insertKeyValue("blue", random(0, 255) );
       jw.insertKeyValue("plant", "aloe" );
      delay(333);
  }

    Serial.println(jw.getBuffer());
    
  /* TRANSMIT DATA TO A HTTPS SERVER OUT OF PARTICLE CLOUD PLATFORM - USE A WEBHOOK */ 
  if ( Particle.publish("something", jw.getBuffer()) ) Serial.println ("botani");
  delay(1002); // WAIT A LITTLE FOR POST TO COMPLETE
}

// setup() runs once, when the device is first turned on
void setup() {
  Serial.begin(115200);
  waitFor(Serial.isConnected, 5000);
  pinMode(sensor_pin, INPUT);
  pinMode(PIN_PIEZO, OUTPUT);

}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  Serial.println("Heelo Negar");

  int sensor_data = analogRead(sensor_pin);
  //Serial.print("Sensor_data:");
  Serial.print(sensor_data);
  Serial.print("\t | ");
  

  if(sensor_data > 950)
  {
    Serial.println("No moisture, Soil is dry");
    delay(250);
    analogWrite(PIN_PIEZO, 0);
  }
  else if(sensor_data >= 400 && sensor_data <= 950)
  {
    Serial.println("There is some moisture, Soil is medium");
    delay(250);
    analogWrite(PIN_PIEZO, 50);
  }
  else if(sensor_data < 400)
  {
    Serial.println("Soil is wet");
    delay(250);
    analogWrite(PIN_PIEZO, 127);
  }

   delay(100);

  buildJSON();
  delay(1256);

  
}
