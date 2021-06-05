const fs = require('fs');

const axios = require('axios');

class Searches {
    record = [];
    dbPath = './db/database.json';

    constructor(){
        this.readDB();
    }

    get recordCapitalized(){
        return this.record.map( place =>{

            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1) );

            return words.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async city( place = '' ) {

        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
            
        } catch (error) {
            return [];
        }
    }

    

}