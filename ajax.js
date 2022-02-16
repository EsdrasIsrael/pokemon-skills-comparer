const nameSelect = document.getElementById("datalistOptions");
const colors = [{name:"black",color:'#363635'},{name:"blue",color:'#0eb1d2'},{name:"brown",color:'#3D1D1F'},{name:"gray",color:'#7D7C7A'},{name:"green",color:'#81e979'},{name:"pink",color:'#ffafcc'},{name:"purple",color:'#735290'},{name:"red",color:'#ef233c'},{name:"white",color:'#deaaff'},{name:"yellow",color:'#fcf300'}];

const data = {
  labels: ['Special Defense', 'Attack', 'Defense', 'Special Attack', 'HP', 'Speed'],
  datasets: [{
    label: '???',
    backgroundColor: '#7D7C7A',
    borderColor: '#7D7C7A',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    data: [],
    fill: false,
    pointStyle: 'circle'
  },{
    label: '???',
    backgroundColor: '#7D7C7A',
    borderColor: '#7D7C7A',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    data: [],
    fill: false,
    pointStyle: 'circle'
  }]
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config = {
    type: 'radar',
    data: data,
    options: {
      scales:{
        r: {
          ticks: {
            color: '#363635',
            backdropColor: '#f1faee'
          },
          angleLines: {
            color:'#cbc0d3'
          },
          grid:{
            color:'#cbc0d3'
          },
          pointLabels:{
            color:'#363635'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        }
      },
    }
  }
);
function xhttpAssincrono(callBackFunction, type, value) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
    callBackFunction(this.responseText);
    }
  };
  var url = "https://pokeapi.co/api/v2/";
  switch (type) {
    case 1:
    url += "pokemon?offset=0&limit=151";
    break;
    case 2:
    url += "pokemon/" + value;
    break;
    case 3:
    url += "pokemon-species/" + value;
    break;
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}
function selectPokemon(dado){
  let pokeList = JSON.parse(dado);
  let namePokeList = pokeList.results;
  namePokeList.forEach(item => nameSelect.appendChild( new Option('',item.name)));
  document.getElementById("exampleDataList1").value = window.localStorage.getItem("pokeSelecionado1");
  pegarInput1();
  document.getElementById("exampleDataList2").value = window.localStorage.getItem("pokeSelecionado2");
  pegarInput2();
  console.log(pokeList.results);
}

xhttpAssincrono(selectPokemon, 1);

function pegarInput1(){
  let pokeSelecionado = document.getElementById("exampleDataList1").value;
  window.localStorage.setItem("pokeSelecionado1",pokeSelecionado); 
  xhttpAssincrono(changePokemon1, 2, pokeSelecionado);
  xhttpAssincrono(colorPokemon1, 3, pokeSelecionado);
}
function changePokemon1(dado){
  let pokeInfos = JSON.parse(dado);
  console.log(pokeInfos);
  let stats = pokeInfos.stats.map(item => item.base_stat);
  let reserveStat = stats[0];
  stats[0] =  stats[4];
  stats[4] = reserveStat;
  
  data.datasets[0].data = stats;
  data.datasets[0].label = pokeInfos.name.charAt(0).toUpperCase() + pokeInfos.name.slice(1);
  myChart.update();

  img = document.getElementById("pokemon-image1");
  img.src = pokeInfos.sprites.other.home.front_default;
}
function colorPokemon1(dado){
  let pokeInfos = JSON.parse(dado);
  let pokeColor = pokeInfos.color.name;
  colors.forEach(color => {
    if(color.name === pokeColor){
      data.datasets[0].backgroundColor = color.color;
      data.datasets[0].borderColor = color.color;
    }
  });
  myChart.update();
}
function pegarInput2(){
  let pokeSelecionado = document.getElementById("exampleDataList2").value;
  window.localStorage.setItem("pokeSelecionado2",pokeSelecionado);
  xhttpAssincrono(changePokemon2, 2, pokeSelecionado);
  xhttpAssincrono(colorPokemon2, 3, pokeSelecionado);
}
function changePokemon2(dado){
  let pokeInfos = JSON.parse(dado);
  let stats = pokeInfos.stats.map(item => item.base_stat);
  let reserveStat = stats[0];
  stats[0] =  stats[4];
  stats[4] = reserveStat;
  data.datasets[1].data = stats;
  data.datasets[1].label = pokeInfos.name.charAt(0).toUpperCase() + pokeInfos.name.slice(1);

  myChart.update();

  img = document.getElementById("pokemon-image2");
  img.src = pokeInfos.sprites.other.home.front_default;
}
function colorPokemon2(dado){
  let pokeInfos = JSON.parse(dado);
  let pokeColor = pokeInfos.color.name;
  colors.forEach(color => {
    if(color.name === pokeColor){
      data.datasets[1].backgroundColor = color.color;
      data.datasets[1].borderColor = color.color;
    }
  });
  myChart.update();
}

