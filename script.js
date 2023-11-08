window.onload = function (){

document.getElementById("settings-icon").addEventListener('click', () => {
  document.getElementById('pop-up-page').style.display = 'block'
  document.getElementById('dashboard').style.zIndex = '0'
})

document.getElementById("leave-popup-page").addEventListener('click', () => {
  document.getElementById('pop-up-page').style.display = 'none'
  document.getElementById('dashboard').style.zIndex = '1'
})




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
