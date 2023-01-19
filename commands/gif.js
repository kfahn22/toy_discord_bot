// Legacy Tenor v1
// https://tenor.com/gifapi/documentation#quickstart-search
// Tenor v2
// https://developers.google.com/tenor/guides/quickstart#setup
// https://developers.google.com/tenor/guides/response-objects-and-errors#response-object
// https://developers.google.com/tenor/guides/endpoints#javascript_1

// https://discordjs.guide/slash-commands/parsing-options.html#command-options

// I am using undici to fetch the url b/c I was getting an error that an import was required with node-fetch
// I am still getting an error that results is undefined, so I assume I am not connecting to tenor

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
            .setDescription('The gif to return')
            .setRequired(false)),
    async execute(interaction) {
        const keywords = interaction.options.getString('keywords') ?? 'codingtrain';
        const url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${process.env.tenor_key}&client_key=${process.env.clientId}&&contentfilter=high`;
        //const url = `https://g.tenor.com/v1/search?q=codingtrain&key=${process.env.tenor_key}&contentfilter=high` // v1

        const response = await fetch(url);
        const { json } = await response.json();

        //const index = Math.floor(Math.random() * json.results.length);
        // const {
        //     gif
        // } = json.results[0]['media'][0]['gif']; //v1
        const { gif } = json.results[0]["media_formats"]['gif']; // v2
        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle('Gif from Tenor')
            .setImage(gif.url) 

        interaction.deferReply({
            embeds: [embed]
        });
    }
}