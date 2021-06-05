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

    async weatherPlace( lat, lon ) {

        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }

    }

    addRecord( place = '' ) {

        if( this.record.includes( place.toLocaleLowerCase() ) ){
            return;
        }
        this.record = this.record.splice(0,5);

        this.record.unshift( place.toLocaleLowerCase() );

        // Save in DB
        this.saveDB();
    }





}