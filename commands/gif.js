// Legacy Tenor v1
// https://tenor.com/gifapi/documentation#quickstart-search
// Tenor v2
// https://developers.google.com/tenor/guides/quickstart#setup
// https://developers.google.com/tenor/guides/response-objects-and-errors#response-object
// https://developers.google.com/tenor/guides/endpoints#javascript_1

// Other
// https://stackoverflow.com/questions/64425579/discord-embed-image-response
// https://stackoverflow.com/questions/70705460/discord-js-tenor-api-error-displaying-image-from-embed
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

// Switched to undici b/c I was getting an error iwth node-fetch

const {
    fetch
} = require('undici');

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

//const keywords = 'codingtrain';
module.exports = {

    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Replies with gif')
        .addStringOption(option =>
            option.setName('keywords')
            .setDescription('The gif to return')),

    async execute(interaction, keywords) {
        const url = `https://tenor.googleapis.com/v2/search?q=${keywords}&media_filter=gif&key=${process.env.tenor_key}&client_key=${process.env.clientId}&&contentfilter=high`;
        //const url = `https://g.tenor.com/v1/search?q=codingtrain&key=${process.env.tenor_key}&contentfilter=high` // v1

        const response = await fetch(url);
        const { json } = await response.json();

        //const index = Math.floor(Math.random() * json.results.length);
        // const {
        //     gif
        // } = json.results[0]['media'][0]['gif']; //v1
        const { gif } = json.results[0]["media-formats"]['gif']; // v2
        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle('Gif from Tenor')
            .setImage(gif.url) 

        interaction.deferReply({
            embeds: [embed]
        });
    }
}