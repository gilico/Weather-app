const options = document.querySelectorAll('.weather-type div');
const dataTypesContainers = document.querySelectorAll('.data-container .weather-data');
const currWeather = document.getElementById('type-curr');
const todayWeather = document.getElementById('type-today');
const fiveWeather = document.getElementById('type-five');


function ShowWeatherType(element){
    options.forEach(option => {
      option.classList.remove('chosen-opt');
    })

    element.classList.add('chosen-opt');

    dataTypesContainers.forEach(cont => {
        cont.style.display = 'none';
    })

    if (element.id === 'current') 
    {
        currWeather.style.display = 'unset';
    }
    else if(element.id === 'today')
    {
        todayWeather.style.display = 'unset'
    }
    else if(element.id === 'five')
    {
        fiveWeather.style.display = 'unset'
    }

}