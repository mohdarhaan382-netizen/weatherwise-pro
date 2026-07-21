// =================================
// WEATHERWISE PRO JAVASCRIPT
// =================================


// API KEY
const API_KEY = "50dc14ade1448d940bb05b6a006fa0000";


// Elements

const searchBtn =
document.getElementById("searchBtn");

const cityInput =
document.getElementById("cityInput");

const cityName =
document.getElementById("city");

const temperature =
document.getElementById("temp");

const description =
document.getElementById("description");

const humidity =
document.getElementById("humidity");

const wind =
document.getElementById("wind");

const pressure =
document.getElementById("pressure");

const weatherIcon =
document.getElementById("weatherIcon");

const forecastContainer =
document.getElementById("forecastContainer");




// Search Weather

searchBtn.addEventListener(
"click",
()=>{

let city =
cityInput.value;


if(city===""){

alert("Please enter city name");

return;

}


getWeather(city);


});





// Get Weather Function


async function getWeather(city){


try{


let url =

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;



let response =
await fetch(url);



let data =
await response.json();




if(data.cod !== 200){

alert("City not found");

return;

}




displayWeather(data);



getForecast(city);



}

catch(error){

alert("Something went wrong");

}



}





// Display Weather


function displayWeather(data){


cityName.innerHTML =
`${data.name}, ${data.sys.country}`;


temperature.innerHTML =
`${Math.round(data.main.temp)}°C`;


description.innerHTML =
data.weather[0].description;



humidity.innerHTML =
`${data.main.humidity}%`;


wind.innerHTML =
`${data.wind.speed} km/h`;


pressure.innerHTML =
`${data.main.pressure} hPa`;



weatherIcon.src =

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;



}





// Forecast


async function getForecast(city){


let url =

`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;



let response =
await fetch(url);



let data =
await response.json();



forecastContainer.innerHTML="";



for(let i=0;i<40;i+=8){


let item =
data.list[i];


let date =
new Date(item.dt_txt);



forecastContainer.innerHTML += `


<div class="forecast-item">


<h3>

${date.toLocaleDateString(
"en-US",
{
weekday:"short"
}
)}

</h3>



<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">


<h3>

${Math.round(item.main.temp)}°C

</h3>


<p>

${item.weather[0].main}

</p>


</div>


`;



}



}






// Location Detection


const locationBtn =
document.getElementById("locationBtn");



locationBtn.addEventListener(
"click",
()=>{


navigator.geolocation.getCurrentPosition(

async(position)=>{


let lat =
position.coords.latitude;


let lon =
position.coords.longitude;



let url =

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;



let response =
await fetch(url);


let data =
await response.json();


displayWeather(data);



getForecast(data.name);



}


);


});






// Dark Mode


const themeBtn =
document.getElementById("themeBtn");



themeBtn.addEventListener(
"click",
()=>{


document.body.classList.toggle("dark");


}

);
