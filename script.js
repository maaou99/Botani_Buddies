
window.onload = function (){

let lastLogin;

if(window.location.href.includes('dashboard.php')){
  
  //console.log("ready");

  fetch("dashboard.php/?getMoisture=true")
     .then(function (response) {
      return response.json();
    })

    .then(function (jsonData) {
    //console.log(jsonData);
    drawGraphs(jsonData)
  
  });

  const keys = Object.keys(localStorage);
  const lastElement = keys[keys.length - 1];
  let currUsername = lastElement;
  
  document.getElementById('username-dashboard').innerHTML = currUsername

  const currentDate = new Date();

  // Format the date as dd/mm/yyyy
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  lastLogin = formattedDate
  document.getElementById('account-creation-date').innerHTML = lastLogin

}

  document.getElementById("settings-icon").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'block'
    document.getElementById('dashboard').style.zIndex = '0'
  })
  
  document.getElementById("leave-popup-page").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'none'
    document.getElementById('dashboard').style.zIndex = '1'
  })
  
  function drawGraphs(response){
    console.log('sooo', response[0].moiture_level)
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
          data: [response[0].moiture_level, response[1].moiture_level, 
          response[2].moiture_level, response[3].moiture_level, 
          response[4].moiture_level, response[5].moiture_level, response[6].moiture_level,
          response[7].moiture_level, response[8].moiture_level, response[9].moiture_level],
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

  }
  
  let buttonClicked = false
  //localStorage.clear()
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
      window.location.href = 'dashboard.php';

    } else {
      let checkPassword = document.getElementById('password-check')
      //styling
      checkPassword.style.fontSize = '8px'
      checkPassword.style.color = 'rgb(133, 53, 29)'
      checkPassword.innerHTML = 'password must be at least 8 characters longs, has one number and one capital letter'
    };
  
  }

  function checkPassword() {
    const currentDate = new Date();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    lastLogin = formattedDate;

    let currentUsername = document.getElementById('userame-login').value;
    let passwordInput = document.getElementById('password-login').value;

    // Retrieve stored user data from local storage
    const storedPassword = Object.values(localStorage);
    const storedUsername = Object.keys(localStorage);

    let found = false;

    storedPassword.forEach((password, index) => {
        if (password === passwordInput) {
            console.log(password, passwordInput)
            storedUsername.forEach((username) => {
                if (username === currentUsername) {
              

                      // Update the current user's password in local storage
                      localStorage.setItem(currentUsername, passwordInput);;

                    alert("You are logged in");
                    found = true;
                    window.location.href = 'dashboard.php';
                    
                }
            });
        }
    });

    if (!found) {
        alert("Incorrect username or password");
    }
}

function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById('imagePreview');

  while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
  }

  const files = input.files;

  if (files.length > 0) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(files[0]);
      preview.appendChild(img);
  }
}




  

 

  
  