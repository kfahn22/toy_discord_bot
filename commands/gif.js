/* search for excited top 8 GIFs */
// https://stackoverflow.com/questions/64425579/discord-embed-image-response
const {
    request
} = require('undici');

const {
    SlashCommandBuilder
} = require('discord.js');

const keywords = 'codingtrain'
const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.tenor_key}&contentfilter=high`;

module.exports = {

    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Replies with gif')
        .addStringOption(option =>
            option.setName('keyword')
            .setDescription('The gif to return')),

    async execute(interaction) {

        const response = await request(url);
        const json = await response.body.json();
        const index = Math.floor(Math.random() * json.results.length);
        const {
            gif
        } = json.results[index].media[0]["gif"]["url"]
        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle('Gif')
            .setImage(gif.url)

        interaction.reply({
            embeds: [embed]
        });
    }
}