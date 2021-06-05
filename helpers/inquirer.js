const inquirer = require("inquirer");

const colors = require("colors");

const questions = [
    {
        type: 'list',
        name: 'option',
        message:'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Search city`
            },
            {
                value: 2,
                name: `${ '1.'.green } Record`
            },
            {  
                value: 0,
                name: `${ '1.'.green } Exit`
            },
        ]

    }
];