
<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Acme&amp;display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />

<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body class="login">
  <div class="homepage">
    <a href="homepage.html"><button  type="submit">Homepage</button></a> 
  </div>
  
<div class = "wrapper">  

<!-- <div class="plant-image">
 
  <img id="img3" src="images/jungle top.png" alt="Your Image">


</div> -->

<div class="background-image"></div>

  <div class="form-box login" ><div>

  <h2> Login </h2>
  <!-- making a get request. encoded in the url -->
  <!-- dont have to put the script in the same page! action can be put to another script -->
  <!-- everything that is send thorugh the get request is a srting -->
<br><br><br><br>

<!-- name fields will become your keys -->
<!-- when sumbmit is pressed it gets the key encodes it using "get" and sends it to login.php -->

<div class="input-box">
  <span class="icon"> <i class="bi bi-person"></i> </span> 
  <input type ="text" size="24" maxlength = "40" id="userame-login"  name = "username" required>
  <label for="">Username</label>
</div>

<br>

<div class="input-box">
  <input id="password-login" type ="password" size="24" maxlength = "40"  name = "password" required>
<span class="icon" > <i class="bi bi-eye-slash" id="togglePasswordLogin" style=" cursor: pointer;"></i> </span> 
  
  <label for="">Password</label>

</div>

<div class="remember-forget">
<input type="checkbox"> 
<p> Remember me?  <p>
 
 
</div>

 
<br>
<div class="login-signup">
<p> <a href= "signup.php" class="register" > Don't have an account? <span style="text-decoration:underline ;">Sign-up here</span> </a>
</div>

<br>
 
<button id ="buttonSubmitLogin"    class="btn"  onclick="checkPassword()" > Submit </button>
 
</div>



<script src= "script.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

</body>
</html>

 



 