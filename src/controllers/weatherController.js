const express = require('express')
const processLocation = require('../modules/process_location');
const processWeather = require('../modules/process_weather');
const path = require('path');
const app = express();

const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

let hiddenInputVal;

//---- Routes Methods -----//
//index get
const IndexMain = (req, res) => {
    const data = undefined;
    res.render(publicPath + '/views/index', {title: 'Home', formtitle: 'Quick Search', data});
}
//index post
const QuickSearch = async (req, res) => {
    hiddenInputVal = req.body.hidden; // to set the redirect button
    const data = await SetLocationFromUser(req);
    res.render(publicPath + '/views/index', {title: 'Home',formtitle: 'Quick Search', data});
} 

//search get
const LocationSearchPage = async(req, res) => {
    
    let data = undefined;
    
    if(hiddenInputVal !== undefined)
    {
        data = await SetLocationFromUser(null, hiddenInputVal)
    }
    res.render(publicPath+ '/views/locationSearch' , {title: 'Location Forecast', formtitle: 'Enter Location', data})
}

// search post
const LocationSearch = async (req, res) => {
    
    const data = await SetLocationFromUser(req);
    res.render(publicPath+ '/views/locationSearch' , {title: 'Location Forecast', formtitle: 'Enter Location', data})
}

const MapPage = (req, res) => {
    const data = undefined;
    res.render(publicPath + '/views/map-page', {title: 'Map Search', data})
}

const MapPagePost = async(req, res) => {
    let location = [];
    location[0] = parseFloat(req.body.hidden1);
    location[1] = parseFloat(req.body.hidden2);

    const data = await SetDataWithCoords(location)
    res.render(publicPath + '/views/map-page', {title: 'Map Search', data})
}




const SetLocationFromUser = async(req, transVal) => {
    try 
    {
        let data;
        let userPlace;

        // if the input came from the search page
        if (transVal === undefined) 
        {
            // set the 'userPlace' to the 'place' input
            userPlace = req.body.place;
        }
        else
        {
            // set the 'userPlace' to the hidden input that came from main
            userPlace = transVal;
        }
        
        // only if the varible has been set 
        if(userPlace !== '')
        {
            const locationData = await processLocation.callMapboxAPI(userPlace);
            
            if(locationData !== undefined)
            {
                data = await SetDataWithCoords(locationData.center, locationData); 
            }
            else
            {
                data = null;
            }
        }
        else
        {
            data = null;
        }
        
        return data;
        
    } 
    catch (error) 
    {
        console.log("Search for place error: ", error);
    }
}

const SetDataWithCoords = async (coordinate, locationData) => {

    let weatherData;
    if(locationData !== undefined)
    {
        weatherData = await processWeather.callOpenWestherApi(coordinate, locationData); 
    }
    else
    {
        if (!(Number.isNaN(coordinate[0]))) 
        {
            weatherData = await processWeather.callOpenWestherApi(coordinate);
        }
        else
        {
            weatherData = null;
        }   
    }

    return weatherData;
}



module.exports = {
    IndexMain: IndexMain,
    QuickSearch: QuickSearch,
    LocationSearchPage: LocationSearchPage,
    LocationSearch: LocationSearch,
    MapPage:MapPage,
    MapPagePost:MapPagePost
}