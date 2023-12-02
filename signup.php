
<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Acme&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body class="signup">
  <div id="login-homepage" class="login-hm">
    <a href="index.html"><button  type="submit">Homepage</button></a> 
  </div>
  
<div class = "wrapper">  

<div class="background-image"></div>

  <div class="form-box login" ><div>

  <h2> Sign up </h2>
  <!-- making a get request. encoded in the url -->
  <!-- dont have to put the script in the same page! action can be put to another script -->
  <!-- everything that is send thorugh the get request is a srting -->
<br><br><br><br>

 
 
<!-- name fields will become your keys -->
<!-- when sumbmit is pressed it gets the key encodes it using "get" and sends it to login.php -->

<div class="input-box">
  <span class="icon"> <ion-icon name="person-circle-outline"></ion-icon>  </span> 
  <input type ="email" id="userame-signup"  size="24" maxlength = "40"  name = "username" required>
  <label>Username</label>
</div>
<br>
<div class="input-box">
  <span class="icon">  <ion-icon name="eye"></ion-icon> </span> 
  <input id="password-signup" type ="password" size="24" maxlength = "40"  name = "password" required>
  <label> New Password:</label>
</div>

<div class="remember-forget">
<input type="checkbox"> 
<p> Remember me?  <p>
 
 
</div>

<p id="password-check"></p>
 
<br>
 

<br>

 <button id ="buttonSubmitSignup"  type = "submit" class="btn"  onclick="savePassword()" > Submit </button>

</div>


<script src= "script.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

</body>
</html>



<!-- should the client side be doing this or the server side -->