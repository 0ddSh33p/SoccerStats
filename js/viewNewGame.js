var table = document.getElementById('data');
var scores = document.getElementById('scores');
fetchAllData(table);

function fetchAllData(table){
    fetch("http://127.0.0.1:5000/fetchStats")
   .then(response => response.json())
   .then(data => {
        table.innerHTML = "";
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let id = data[i][0];
            let name = data[i][1];
            let inctanceID = data[i][5]
            let gameId = 1; // TODO MAKE THIS AN ACTUAL GAME 

            let numOf = data[i][11];
            let note = data[i][10];
            let player = data[i][9];

            let newRow = table.insertRow();
            if(data[i][2] == 'true'){
                let btn = document.createElement("button");
                btn.textContent = "-";
                btn.onclick = function() {
                    subfinalData(inctanceID);
                    fetchAllData(table);
                };
                btn.style.width = "100px";
                btn.style.height = "100px";
                newRow.insertCell().appendChild(btn);
            }

            newRow.insertCell().textContent = name;

            if(data[i][2] == 'true'){
                btn = document.createElement("button");
                btn.textContent = "+";
                btn.onclick = function() {
                    addfinalData(id,gameId,1);
                    fetchAllData(table);
                };
                btn.style.width = "100px";
                btn.style.height = "100px";
                newRow.insertCell().appendChild(btn);
                newRow.insertCell().textContent = numOf;
            }

            if(data[i][3] == 'true'){

                let playerSelect = document.createElement("select");
                playerSelect.style.width = "100px";
                playerSelect.style.height = "25px";
                for(let p = 1; p <= 5; p++){ //TODO MAKE THE 5 INTO THE PLAYER LIST
                    var op = new Option();
                    op.value = p;
                    op.text = "Player " + p;
                    playerSelect.options.add(op);     
                } 
                newRow.insertCell().appendChild(playerSelect);
            }

            if(data[i][4] == 'true'){
                let notefield = document.createElement("input");
                notefield.style.width = "200px";
                notefield.style.height = "50px";
                notefield.onchange = function() {
                    //TODO make undate for note API call
                }
                newRow.insertCell().appendChild(notefield);
            }
            
        }
   })
   .catch(error => console.error('Error:', error));
   

   fetch("http://127.0.0.1:5000/statByName/Home Goals")
    .then(response => response.json())
    .then(data => {
        fetch("http://127.0.0.1:5000/statByName/Opponent Goals")
        .then(response => response.json())
        .then(data2 => {

            scores.innerHTML = data[0] + " - " + data2[0];
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

