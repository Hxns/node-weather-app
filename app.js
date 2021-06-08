require('dotenv').config();

const { readInput, inquirerMenu, pause, listPlaces} = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async() => {

    const searches =  new Searches();
    let opt;

    do{

        opt = await inquirerMenu();

        switch( opt ) {
            case 1:
                const text =  await readInput('City: ');

                const places = await searches.city( text );

                const id = await listPlaces(places);
                if ( id === '0' ) continue;

                const placeSel = places.find( l => l.id === id );

                searches.addRecord( placeSel.name );

                const weather = await searches.weatherPlace(placeSel.lat, placeSel.lng );

                console.clear();
                console.log('\nCity information\n'.green);
                console.log('City:', placeSel.name.green);
                console.log('Lat:', placeSel.lat);
                console.log('Lng:',placeSel.lng);
                console.log('Temperature:', weather.temp);
                console.log('Minimum:', weather.min);
                console.log('Maximum:', weather.max);
                console.log('What is the weather like:', weather.desc.green );
            
            break;

            case 2:
                searches.recordCapitalized.forEach( (place, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ place } ` );
                })

            break;

        }

        if ( opt !== 0 ) await pause();

    } while (opt !== 0)

}


main();