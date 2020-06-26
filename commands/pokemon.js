const axios = require('axios');

module.exports = {
    name: "pokemon",
    description: "name a pokemon and get it's pic!",
    execute(message, args){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
        .then(function (response) {
            // handle success
            //console.log(response);
            message.reply(`${response.data.name} #${response.data.id}\n${response.data.sprites.front_default}`);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
};