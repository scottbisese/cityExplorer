const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

//localhost:3000/location?location=blah
app.get('/location', (request,response) => {        //server route
    try{
        const geoData = require('./data/geo.json');
        const location = new Location(request.query.location, geoData)
        // throw new Error();
        response.send(location);
       
    } catch(error){
        response.status(500).send('sorry something went wrong.')
    }
});

function Location(query, geoData) {
    this.search_query = query;
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('/weather',(request,response) => {
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is listening');
});