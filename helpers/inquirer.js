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

const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Select an option'.white );
    console.log('==========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'enter'.green } to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}