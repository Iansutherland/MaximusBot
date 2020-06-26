const {googlePlaceToken} = require('../secret.json');
const axios = require('axios');

module.exports = {
    name: 'theway',
    description: 'Incant the moral code! Or find your way',
    execute(message, args){
        //use google api for maps to place
        const placeToFind = (args[0]) ? args[0] : null;

        if(placeToFind){
        const placeUrl = `https://www.google.com/maps/place/${placeToFind}`;
        message.reply(`This is the way\n${placeUrl}`);
        }
        else{
            message.reply('This is the way');
        }
    }
};