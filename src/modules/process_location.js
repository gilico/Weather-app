const chalk = require("chalk");
const gotWrapper = require("./gotWrapper");

const mapboxUrlPath = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const jsonOutput = ".json";
const mapboxApiKey = "?access_token=pk.eyJ1IjoiZ2lsaWNvIiwiYSI6ImNrc3NucmRnZDBxcmEzMXBua2g3cjdjYjMifQ.1DIvZtAtBoI8ItCTqR8cJw";
const limitString = "&limit=1";

async function callMapboxAPI(location){
    
    const URL = mapboxUrlPath + location + jsonOutput + mapboxApiKey + limitString;
    
    try {
        let locationResponse = await gotWrapper.makeRequest(URL);
        
        if (locationResponse.features.length > 0) 
        {
            //return all the 'features' element that contains name place and cordinates
            return locationResponse.features[0];
        }
        
    } catch (err) {
        console.log(chalk.bgBlue("Error occured: HTTP request to Mapbox has failed"+ 
                                 "URL: " + URL + "\n" + 
                                 "Full Error message: \n"), err);
    }

}

module.exports = {
    callMapboxAPI: callMapboxAPI
}

