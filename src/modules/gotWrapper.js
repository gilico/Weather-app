const got = require("got");
const chulk = require("chalk");

//let url = "https://api.openweathermap.org/data/2.5/onecall?lat=9.7863&lon=100.059&appid=a048a6cf48ea57def54a5c61f1fa8ee1&units=metric";

// to test this module comment in:
//makeRequest(url);

async function makeRequest(url){
    try {
        //call got() to issue a GET request
        const body = await got(url).json(); 
        return body;
    } catch (err) {
        console.log(chulk.bgBlue("Error occured: HTTP request has failed.\n" + 
                                 "URL: " + url + "\n" + 
                                 "Full Error message: \n"), err);

        process.exit(-1); //program exit with failure - Kills the server
    }
}

module.exports = {
    makeRequest: makeRequest
}