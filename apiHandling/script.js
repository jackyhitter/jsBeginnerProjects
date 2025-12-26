document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("city-input");
  const weatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temdisplay = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");
  const windSpeed = document.getElementById("wind-speed")

  // console.log(inputElement)
  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

  async function weatherfnc(){
    const inputText = inputElement.value.trim();
    if (!inputText) return;
    try{
        const weatherData = await fectchWeatherData(inputText);
        showWeather(weatherData);
    } catch (error){
        showError();
    }
    inputElement.value = "";
  }

  function weatherKeyupfnc(event){
    if (event.key === 'Enter'){
        weatherfnc();
    }
  }

  weatherButton.addEventListener("click", weatherfnc);
  inputElement.addEventListener('keyup', weatherKeyupfnc);

  async function fectchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data);
        return data;
  }

  function showWeather(data) {
    //access the temdisplay, desc, city to display
    const {name, main, weather, wind} = data;
        cityName.textContent = name;
        temdisplay.textContent = `Temperature : ${main.temp}°C`;
        description.textContent = `Weather : ${weather[0].description}`;
        windSpeed.textContent = `Wind Speed : ${wind.speed} Kmph`
    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }


  //for loading the stylesheet
  const laodstyle = document.getElementById('loadStyle');
  laodstyle.addEventListener('click', loadstylefnc);
  function loadstylefnc(){
    const existstyle = document.querySelector('#dynamicStyle');
    if(!existstyle){
      link = document.createElement('link');
      link.id = 'dynamicStyle';
      link.rel = "stylesheet";
      link.href = "styles.css";
      document.head.appendChild(link)
      console.log("Style loaded");
      console.log(link);
    }else{
      existstyle.remove();
      setTimeout(() => {
        alert("Style removed successfully");
      }, 100);
    }
  }
});
