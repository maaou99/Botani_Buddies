
window.onload = function (){

let lastWordWithoutQuotes;
console.log()

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
  let usernames = localStorage.getItem('usernames')
  let getUsername;

  // Use regular expression to find all words within double quotes
  let matches = usernames.match(/"([^"]*)"/g);

  console.log(matches)

  // Get the last match (last word within double quotes)
  let  lastWord = matches ? matches[matches.length - 1] : null;

  // Remove the quotes from the last word
  lastWordWithoutQuotes = lastWord ? lastWord.replace(/"/g, '') : null;
 
  document.getElementById('username-dashboard').innerHTML = lastWordWithoutQuotes

  const currentDate = new Date();

  // Format the date as dd/mm/yyyy
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
  lastLogin = formattedDate
  document.getElementById('account-creation-date').innerHTML = lastLogin
  
  if(localStorage.getItem(lastWordWithoutQuotes + "_img")){
    loadImage()
  }

}

document.querySelector("#filename").addEventListener("change", function(){
  event.preventDefault();
  console.log("button clicked");
  console.log("form has been submitted");

  //part two
  let form = document.querySelector("#insertGallery");
  let formData = new FormData(form);
  /*console.log to inspect the data */
 for (let pair of formData.entries()) {
  console.log(pair[0]+ ', ' + pair[1]);

}

fetch('/dashboard.php', {
method: 'POST',
body: formData
})
.then(function (response) {
  console.log("got here with response ...");
  return response.text();
})
  .then(result => {
 
    imgLocalStorage(result, lastWordWithoutQuotes);
  })
})
.catch(error => {
console.error('Error:', error);
});

function imgLocalStorage(imgPath){


  localStorage.setItem(lastWordWithoutQuotes + "_img", imgPath)

}

function loadImage(){
  let location = localStorage.getItem(lastWordWithoutQuotes + "_img")
  let profileImg = document.getElementById('profile-pic')
  profileImg.src = location
}}

  document.getElementById("settings-icon").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'block'
    document.getElementById('dashboard').style.zIndex = '0'
  })
  
  document.getElementById("leave-popup-page").addEventListener('click', () => {
    document.getElementById('pop-up-page').style.display = 'none'
    document.getElementById('dashboard').style.zIndex = '1'
  })
  
  function drawGraphs(response){
   
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


  let buttonClicked = false
  //localStorage.clear()
  function emergencyButton(id){
  if(!buttonClicked){
    document.getElementById(id).innerHTML = 'OFF'
    buttonClicked = true
  
  } else {
    document.getElementById(id).innerHTML = 'ON'
    buttonClicked = false
  }}

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
          
            storedUsername.forEach((username) => {
                if (username === currentUsername) {

                  
                    // Remove the current user's entry from local storage
                    localStorage.removeItem(currentUsername);

                    // Update the current user's password in local storage
                    localStorage.setItem(currentUsername, passwordInput);

                    // Move the updated entry to the end of local storage
                    const updatedKeys = Object.keys(localStorage);
                    const updatedUsernameIndex = updatedKeys.indexOf(currentUsername);
                    if (updatedUsernameIndex !== -1) {
                        updatedKeys.splice(updatedUsernameIndex, 1);
                        updatedKeys.push(currentUsername);

                        // Save the updated order to local storage
                        localStorage.setItem('usernames', JSON.stringify(updatedKeys));
                    }


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

 // Function to preview the selected image
 function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById('imagePreview');
  const imgPreview = document.getElementById('preview');
  const profilePic = document.getElementById('profile-pic');

  while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
  }

  const files = input.files;

  if (files.length > 0) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(files[0]);
      preview.appendChild(img);

      // Set the chosen image as the preview on the upload image button
      imgPreview.src = URL.createObjectURL(files[0]);

      // Set the chosen image for the profile pic display
      profilePic.src = URL.createObjectURL(files[0]);
  }
}

// Function to preview the selected image
function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById('imagePreview');
  const imgPreview = document.getElementById('preview');
  const profilePic = document.getElementById('profile-pic');

  // while (preview.firstChild) {
  //     preview.removeChild(preview.firstChild);
  // }

  const files = input.files;

  if (files.length > 0) {
      const img = document.getElementById('profile-pic');
      img.src = URL.createObjectURL(files[0]);
     
      //preview.appendChild(img);

      // Set the chosen image as the preview on the upload image button
      //imgPreview.src = URL.createObjectURL(files[0]);

      // Set the chosen image for the profile pic display
      profilePic.src = URL.createObjectURL(files[0]);

     
  }
}

  

 

  
  