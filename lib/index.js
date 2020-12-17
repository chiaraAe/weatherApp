// TODO: Write your JS code in here
// URL-BERLIN: http://api.openweathermap.org/data/2.5/weather?q=berlin&appid=c4a9d9b83b3b854dad9877889df8241a

const API_KEY = 'c4a9d9b83b3b854dad9877889df8241a';

// Text Output
const city = document.getElementById("city");
const date = document.getElementById("date");
const sky = document.getElementById("sky");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");

const updateCard = (data) => {
  city.innerText = `Weather in ${data.name}`;
  sky.innerText = data.weather[0].description;
  temp.innerText = `${Math.round(data.main.temp)}°C`;
  icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const today = new Date();
  const localOffset = data.timezone + today.getTimezoneOffset() * 60;
  const localDate = new Date(today.setUTCSeconds(localOffset));
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = localDate.toLocaleDateString("en-US", options);
  date.innerText = formattedDate;
};

const fetchWeather = (cityInput = 'Berlin') => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(updateCard);
};

// call default Berlin
fetchWeather("berlin");

// Send button
const form = document.querySelector("form");
const cityInput = document.getElementById('city-input');

// ADD event Listener
form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchWeather(cityInput.value);
});
