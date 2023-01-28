// https://premium.zenquotes.io/zenquotes-documentation/
// !! Required Attribution: Inspirational quotes provided by https://zenquotes.io/

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const {
    request
} = require('undici');

const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('randomquote')
        .setDescription('Replies with a random quote'),  // remove comma if you uncomment .addStringOption
        // .addStringOption(option =>
		// 	option.setName('category')
		// 		.setDescription('The quote category')
		// 		.setRequired(true)
		// 		.addChoices(
		// 			{ name: 'Anixety', value: 'anxiety' },
		// 			{ name: 'Confidence', value: 'confidence' },
        //             { name: 'Happiness', value: 'happiness' },
		// 		)),
    async execute(interaction) {
        const quoteResult = await request(`https://zenquotes.io/api/random`);

        // The premium version of zenquotes allows you to add query terms
        // https://zenquotes.io/keywords
        //const category = interaction.options.getString('category');
        //const quoteResult = await request(`https://zenquotes.io/api/quotes/[YOUR_API_KEY]&keyword=${category}`);
        const list = await quoteResult.body.json();
        // if (!list.length) {
        //     return interaction.reply(`No results found for **${term}**.`);
        // }
        //console.log(list);
        const [answer] = list;

        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle('Random Quote')
            .setURL('https://zenquotes.io/')
            .addFields({
                name: 'Quote',
                value: trim(answer.q, 1024)
            }, {
                name: 'Author',
                value: answer.a
            },
            {
                name: 'Inspirational quotes provided by',
                value: 'https://zenquotes.io/'
            },
             );
        interaction.reply({
            embeds: [embed]
        });
    },
};