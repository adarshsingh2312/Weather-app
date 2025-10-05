let city =  document.querySelector('.enterCity').value;
let image = document.querySelector('.weather-icon');
let searchBtn = document.querySelector('.searchBtn');
async function checkWeather(){
    city =  document.querySelector('.enterCity').value; 
    let coordToCity = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=5a4293ed09f0f6bf7691e2f53072b63e`
    let lat,long;
    let response = await fetch(coordToCity);
    let data = await response.json();
    if(data.length===0){
        alert('Enter correct city name');
        return;
    }
    lat = data[0].lat;
    long = data[0].lon;
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5a4293ed09f0f6bf7691e2f53072b63e&units=metric`;
    let weatherResponse = await fetch(weatherURL);
    let weatherData = await weatherResponse.json();
    document.querySelector('.city').innerHTML = city.charAt(0).toUpperCase()+city.slice(1).toLowerCase();
    document.querySelector('.temp').innerHTML = Math.round(weatherData.main.temp) +'°C';
    document.querySelector('.humidity').innerHTML = weatherData.main.humidity+'%';
    document.querySelector('.wind').innerHTML = weatherData.wind.speed+'km/hr';
    if(weatherData.weather[0].main==='Clouds'){
        image.src="images/clouds.png";
    }
    else if(weatherData.weather[0].main==='Rain'){
        image.src="images/rain.png";
    }
    else if(weatherData.weather[0].main==='Drizzle'){
        image.src="images/drizzle.png";
    }
    else if(weatherData.weather[0].main==='Mist'){
        image.src="images/mist.png";
    }
    else if(weatherData.weather[0].main==='Clear'){
        image.src="images/clear.png";
    }
    else if(weatherData.weather[0].main==='Snow'){
        image.src="images/snow.png";
    }
    document.querySelector('.weather').style.display='block';
}
searchBtn.addEventListener('click',()=>{
    checkWeather();
});
let cityInput = document.querySelector('.enterCity');
cityInput.addEventListener('keydown', (event)=>{
    if(event.key==='Enter'){
        checkWeather();
    }
});