const chalk = require("chalk");
const gotWrapper = require("./gotWrapper");

//url - without the coordinates
const openweatherUrlPath = "https://api.openweathermap.org/data/2.5/onecall?";
const excludeParam = `&exclude={minutely,hourly,alerts}`;
const apiKey = "&appid=40c1a600f57b7e70458fe35fb22f553c";
const unitsParam = "&units=metric";



    //'foreCastType' is the user's selcetion
        // 0 - current weather
        // 1 - today's weather
        // 5 - 5 days weather
async function callOpenWestherApi(coordinates, locationData){
    const URL = openweatherUrlPath + "lat=" + coordinates[1] + "&lon=" + coordinates[0] +excludeParam + apiKey + unitsParam;
    let placeName;

    if(locationData !== undefined){
        placeName = setPlaceName(locationData)
    }else{
        placeName = ''
    }

    try 
    {
        let weatherData = await gotWrapper.makeRequest(URL);
        const timeZone = weatherData.timezone;

        return SetAllDataTypes(weatherData.current, placeName, weatherData.daily, timeZone);;

    } 
    catch (error) 
    {
        console.log(chalk.bgBlue("Error occured: HTTP request to OpenWeather has failed"+ 
                                 "URL: " + URL + "\n" + 
                                 "Full Error message: \n"), error);
    }
}


function SetAllDataTypes(current, placeName, daily, timeZone){
    let retValJson = [];
    retValJson[0] =  {
        place: placeName,
        current:
        {
            icon: current.weather[0].icon ,
            date: fullDateString(new Date()),
            description: current.weather[0].description,
            temp: addDegrees(current.temp),
            windSpeed: current.wind_speed + 'kph',
            windDeg: addDegrees(current.wind_deg),
            cloudsCoverage: current.clouds + '%',
        }
    }

    let dailyData = [];

    for (let i = 1; i < 6; i++) {
        dailyData[i-1] =  getDailyWeatherStr(daily[i],timeZone)
        retValJson[1] = { daily: dailyData}
    }
    return retValJson;
}


function getDailyWeatherStr(daily, timeZone){
    return retValJson = 
    {
        forecast:{
            date: fullDateString(daily.dt*1000),
            icon: daily.weather[0].icon,
            description: daily.weather[0].description,
            minTemp: addDegrees(parseInt(daily.temp.min)),
            maxTemp: addDegrees(parseInt(daily.temp.max)),
            sunrise: timeConvert(daily.sunrise,timeZone),
            sunset: timeConvert(daily.sunset,timeZone),
            moonrise: timeConvert(daily.moonrise,timeZone),
            moonset: timeConvert(daily.moonset,timeZone),
            windSpeed: daily.wind_speed + 'kph',
            windDeg: addDegrees(daily.wind_deg),
            cloudsCoverage: daily.clouds + '%',
        }
    }
}


function timeConvert(time,timeZone){

    return new Date(time*1000).toLocaleTimeString([], {timeZone:timeZone,timeStyle: 'short', hourCycle:'h24'});
}

function addDegrees(val){
    return parseInt(val) +  String.fromCharCode(176)
}

function fullDateString(rawDate){
    return new Date(rawDate).toLocaleString('en-En', {weekday: "short", month: "short", day: "numeric"})
}

function setPlaceName(locationData){
    const placeName = locationData.place_name;
    let comma1 = placeName.indexOf(",");
    let comma2 = placeName.lastIndexOf(",")
    let section1;
    let section2;

    if(comma1 !== comma2){
        section1 = placeName.substring(0,comma1+1);
        section2 = placeName.substring(comma2+1);
        return section1 + section2;
    }else{
        return placeName;
    }
}
    

module.exports = {
    callOpenWestherApi: callOpenWestherApi
}