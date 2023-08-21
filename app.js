const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_Img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wingSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apikey = "ddbd96f429facbe3187cdaf0558f7ddd"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if (weather_data.cod === `404`) {
        locationNotFound.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wingSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_Img.src = "assets/cloudy.png";
            break;
        case 'Clear':
            weather_Img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_Img.src = "assets/raining.png";
            break;
        case 'Mist':
            weather_Img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_Img.src = "assets/snow.png";
            break;
    }
    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})