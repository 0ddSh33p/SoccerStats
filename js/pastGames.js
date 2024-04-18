const side = document.getElementById("side");
const gameData = document.getElementById("data");


function buildPage(){
    side.innerHTML = "";
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++){
            side.innerHTML += "<a onclick = 'fillData("+data[i][0]+")'>"+ data[i][1] + "\nVS " + data[i][2] +"</a> "
        }
    })
    .catch(error => console.error('Error:', error));
}
function fillData(id){
    fetch("http://127.0.0.1:5000/fetchStats/"+id)
   .then(response => response.json())
   .then(data => {
        for(let i = 0; i < data.length; i++){
            let name = data[i][1];
            let numOf = data[i][11];
            let note = data[i][10];
            let player = data[i][9];
        }
    })
    .catch(error => console.error('Error:', error));
}

buildPage();
