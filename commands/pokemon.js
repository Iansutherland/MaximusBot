const axios = require('axios');

module.exports = {
    name: "pokemon",
    description: "name a pokemon and get it's pic!",
    execute(message, args){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`)
        .then(function (response) {
            // handle success
            //console.log(response);
            message.reply(`${response.data.name} #${response.data.id}\n${response.data.sprites.front_default}`);
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            if(error.response.status === 404){
                message.reply(`Looks like that one is missing from the PokeDex \n https://i.ytimg.com/vi/KOuNgUkm2x0/hqdefault.jpg`)
            }
        })
        .then(function () {
            // always executed
        });
    }
};