<?php

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['getMoisture']))
{
  //NEW open a the db and add in the try and catch
// get the contents from the db and output. ..
try {
    require_once __DIR__ . '/vendor/autoload.php';

//1: connect to mongodb atlas
$client = 
new MongoDB\Client(
    "mongodb+srv://negar_CART351:Faramoosh123@cluster0.a0ymu23.mongodb.net/?retryWrites=true&w=majority"
    
);

//2: connect to collection (that exists):
$collection = $client->BOTANI->lasttry;

// // get the search field
// $searchField = $_GET["a_search"];

// //make the request
// $resultObject = $collection->find([]);

$sortOptions = ['_id' => -1];
    
// Fetch the last 10 documents
$resultObject = $collection->find([], ['limit' => 10, 'sort' => ['ts' => -1]]);

$arrayToReturn = [];
foreach($resultObject as $lasttry){
    $myPackagedData=new stdClass();

    foreach($lasttry as $key => $value)
    {
        if($key =="moiture_level"){
            $myPackagedData->$key =$value;
        }
         
    }

    $arrayToReturn[]=$myPackagedData;
 }

 echo(json_encode($arrayToReturn));

//echo(json_encode($arrayToReturn)); 

exit;
}//END TRY
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    
</head>
<body onload=" ">
  
    <div id="container">
    <div id="button-homepage">
    <form action="index.php" method="post">  
    <button><a class="button-hmp" name="submitHomepage" >Homepage</a></button>
    </form>

  </div>
        <div class="blur-layer"></div>
        <div id="dashboard">
            <div class="item barChart">
                <p>Level of nutrient in Soil</p>
                <br>
                <canvas width="200px" height="80px" id="myBarChart"></canvas>
            </div>
            <div class="item updates">

            <?php 

require_once __DIR__ . '/vendor/autoload.php';

//put into try catch clause
try {
 
    //1: connect to mongodb atlas
    $client = 
    new MongoDB\Client(
        "mongodb+srv://negar_CART351:Faramoosh123@cluster0.a0ymu23.mongodb.net/?retryWrites=true&w=majority"
    );
    // echo("valid connection");
    // echo("<br>");
     
    //2: connect to collection (that exists):
    $collection = $client->BOTANI->lasttry;
    //echo($collection);

    $result = $collection->find([]);
   
    $sortOptions = ['_id' => -1];
    
 // Get only the latest document
 $resultObject = $collection->find([], ['sort' => $sortOptions, 'limit' => 1]);
     
 foreach($resultObject as $lasttry){
    
    $moistureMsg = $lasttry["moitureLevelMsg"];
    
    echo "<div id='update-1' class='update'>$moistureMsg</div>";

    $moistureMsg = $lasttry["touchLevelMsg"];
    echo " <div id='update-2' class='update'>$moistureMsg</div>";
 }
    
     
    }
    catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
    
?>
    
                <div id="update-3" class="update">
                    Update #3
                </div>
            </div>
            <div class="item profile">\
            <label for="filename">
                        <img src="/assets/images/upload_icon.png" alt="Upload Icon" width="50px" height="50px" />
            </label>

                <!-- Hidden File Input -->
                 <input type="file" id="filename" name="filename" accept="image/*" onchange="previewImage(event)" />
                <img width = "100px" height = "100px" id = "profile-pic" src="assets/images/placeholder.png">
   
                <div id="update-3" class="  profile-info">
                   

                    <p class="profile-text">@<span id="username-dashboard"> sdfsd </span></p>
                    <p class="profile-text"> Last login <span id="account-creation-date">XX/XX/XXXX</span></p>
                    <p class="profile-text"> Number of plants <span id="num-plants">1</span></p>
                </div>
            </div>
            
            <div class="item item-4">
                <div id="botani-modes">
                    <p class="botani-voice-text">Botani Visual</p>
                    <button class="botani-button">ENABLE</button>
                    
                   
                </div>
                <div id="botani-modes">
                    <p class="botani-voice-text">Botani Voice</p>
                    <button class="botani-button">ENABLE</button>
                    
                   
                </div>
            </div>
            <div id= "settings-icon" class="settings">
                 <img width="50px" height="50px"  src="assets/images/setting_icon.png" alt="">
            </div>
        
            <div class="item lineChart">
               
                
                <canvas width="200px" height="90px" id="myLineChart"></canvas>
            </div>
            <div class="item en-dis-voice">
                <div id="botani-gtk">
                    <p class="botani-gtk">GET TO KNOW MORE YOUR BOTANI</p>
                
                    
                   
                </div>
            </div>

            <div class="item item-9 en-dis-voice">
                <?php
            require_once __DIR__ . '/vendor/autoload.php';

//put into try catch clause
try {
 
    //1: connect to mongodb atlas
    $client = 
    new MongoDB\Client(
        "mongodb+srv://negar_CART351:Faramoosh123@cluster0.a0ymu23.mongodb.net/?retryWrites=true&w=majority"
     
    );
    // echo("valid connection");
    // echo("<br>");
     
    //2: connect to collection (that exists):
    $collection = $client->BOTANI->lasttry;
    //echo($collection);

    $result = $collection->find([]);
   
    $sortOptions = ['_id' => -1];
    
 // Get only the latest document
 $resultObject = $collection->find([], ['sort' => $sortOptions, 'limit' => 1]);
     
 foreach($resultObject as $lasttry){
    
    $moistureEmoji = $lasttry["emojiMsgTouch"];
    $touchEmoji = $lasttry["emojiMsgMoisture"];

    echo "   <div id='botani-modes' class='botani-notification'>
    
    <p>&#$touchEmoji</p>
    <p id = 'botani-emojis'>&#$moistureEmoji;<p>
 </div>";
    
  
 }
    
     
    }
    catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
    
?>
                 
                
            </div>
           
            
        </div>

       
    </div>
    <div id="pop-up-page">
        <div class="text-with-button">
            <p>Emergency</p>
            <button type="button" id="emergency-button" onclick="emergencyButton('emergency-button')">ON</button>
          </div>

          <br>
        
          <div class="text-with-button">
            <p>Notification</p>
            <button id="notification-button" onclick="emergencyButton('notification-button')" type="button">ON</button>
          </div>

          <div id="leave-popup-page">
            <button type="button">Exit</button>
          </div>
    </div>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.0.1/chart.umd.js"> </script>
    <script src="script.js"></script>
   
    
 
</body>
</html>