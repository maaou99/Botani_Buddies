


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
        <?php
echo phpinfo();
?>
            <div class="item barChart">
                <p>Level of nutrient in Soil</p>
                <br>
                <canvas width="200px" height="80px" id="myBarChart"></canvas>
            </div>
            <div class="item updates">
                <div id="update-1" class="update">
                    Your plant needs water!
                </div>
                <div id="update-2" class="update">
                    Your Botani plants wants 10 mg of Nitrogen.
                </div>
                <div id="update-3" class="update">
                    Update #3
                </div>
            </div>
            <div class="item profile">
                <img width = "100px" height = "100px" id = "profile-pic" src="assets/images/placeholder.png">
   
                <div id="update-3" class="  profile-info">
                    <p class="profile-text">@<span id="username-dashboard"> sdfsd </span></p>
                    <p class="profile-text"> Botani owner since <span id="date">XX/XX/XXXX</span></p>
                    <p class="profile-text"> Number of plants <span id="date">XX</span></p>
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
                <div id="botani-modes" class="botani-notification">
                    <p>&#128532;</p>
                    <p id = "botani-emojis" class="">🚰〰️〰️💦🌱<p>
                </div>
                
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