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
}