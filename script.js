
window.onload = function (){

//   document.getElementById("buttonSubmitLogin").addEventListener('submit', () => {
//   alert('hee')
//   document.getElementById("password-login").value
//  })
 
if(window.location.href.includes('dashboard.html')){
  
  let currUsername = Object.keys(localStorage)[0]
  document.getElementById('username-dashboard').innerHTML = currUsername
  }

  if(window.location.href.includes('login.html')){

    document.getElementById("buttonSubmitLogin").addEventListener('click', () => {
      checkPassword()})

  }

 
  

  document.getElementById("settings-icon").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'block'
    document.getElementById('dashboard').style.zIndex = '0'
  })
  
  document.getElementById("leave-popup-page").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'none'
    document.getElementById('dashboard').style.zIndex = '1'
  })
  
  function goToDashboard(username){
       
     
    
 
    document.getElementById('username-dashboard').innerHTML = 'blbl'
    
   }
  
  
   function checkPassword(){
  
    currentUsername = document.getElementById('userame-login').value
    let passwordInput =  document.getElementById('password-login').value
   
       // Retrieve stored user data from local storage
       const storedPassword = Object.values(localStorage);
       const storedUsername = Object.keys(localStorage);
      

       storedPassword.forEach((password) => {
         
    
        if(password === passwordInput ){
          storedUsername.forEach((username) => {
            if (username == currentUsername){
              alert("You are logged in")
              
              
              window.location.href = 'dashboard.html';

              //return usernameInput
              //goToDashboard(usernameInput)
            }  else {
              localStorage.removeItem(username)
            }
          })
          
        } })
 
  }

  function drawGraphs(){
    const bar = document.getElementById('myBarChart');
  
    new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Phosporus', 'Nitrogen', 'Potassium'],
        datasets: [{
          label: 'mg/kg',
          xAxisID: 'fds',
          barThickness: 50,
          backgroundColor: 'rgb(45, 206, 250,0.5)',
          data: [12, 19, 3, 5, 2, 3],
           
        }]
      },
      options: {
        scales: {
   
          y: {
            beginAtZero: true,
      
          },
          
        }
      }
    });
  
  
    const ctx = document.getElementById('myLineChart');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1h', '2h', '3h', '4h', '5h', '6h', '7h'],
        datasets: [{
          label: 'Moisture Level',
          backgroundColor: 'rgb(45, 206, 250,0.5)',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
    const bar = document.getElementById('myBarChart');
  
    new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Phosporus', 'Nitrogen', 'Potassium'],
        datasets: [{
          label: 'mg/kg',
          xAxisID: 'fds',
          barThickness: 50,
          backgroundColor: 'rgb(45, 206, 250,0.5)',
          data: [12, 19, 3, 5, 2, 3],
           
        }]
      },
      options: {
        scales: {
   
          y: {
            beginAtZero: true,
      
          },
          
        }
      }
    });
  
  
    const ctx = document.getElementById('myLineChart');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1h', '2h', '3h', '4h', '5h', '6h', '7h'],
        datasets: [{
          label: 'Moisture Level',
          backgroundColor: 'rgb(45, 206, 250,0.5)',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
  
  }
  
  let buttonClicked = false
  
  function emergencyButton(id){
  if(!buttonClicked){
    document.getElementById(id).innerHTML = 'OFF'
    buttonClicked = true
  
  } else {
    document.getElementById(id).innerHTML = 'ON'
    buttonClicked = false
  }
    


  
  }

  function savePassword(){
    

    let password = document.getElementById('password-signup').value
    let username =  document.getElementById('userame-signup').value

    //chatGPT, 'check if a password has at least 8 caracters and has one capital letter and a number'
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(regex.test(password)){
      window.localStorage.setItem(username, password)
      alert('Account created')
      window.location.href = 'dashboard.html';

    } else {
      let checkPassword = document.getElementById('password-check')
      //styling
      checkPassword.style.fontSize = '8px'
      checkPassword.style.color = 'rgb(133, 53, 29)'
      checkPassword.innerHTML = 'password must be at least 8 characters longs, has one number and one capital letter'
    };
  
  }


  

 

  
  