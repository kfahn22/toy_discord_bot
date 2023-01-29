// https://scripture.api.bible/livedocs
// https://stackoverflow.com/questions/65966363/discord-js-how-to-use-emojies-in-a-embed-showing-user-presence
// Bible version values https://docs.api.bible/guides/bibles
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const bibles = require('./bibles.json');
const {
    request
} = require('undici');
const dotenv = require('dotenv');
dotenv.config();
const {
    EmbedBuilder,
    SlashCommandBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verse')
        .setDescription('Replies with Bible verse')
        .addStringOption(option =>
            option.setName('bible-version')
            .setDescription('Choose a Bible version')
            .setRequired(true)
            .addChoices({
                name: bibles[0].name,
                value: bibles[0].value
            }, {
                name: bibles[1].name,
                value: bibles[1].value
            }, {
                name: bibles[2].name,
                value: bibles[2].value
            }, {
                name: bibles[3].name,
                value: bibles[3].value
            },
            {
                name: bibles[4].name,
                value: bibles[4].value
            },
            {
                name: bibles[5].name,
                value: bibles[5].value
            },
            {
                name: bibles[6].name,
                value: bibles[6].value
            },
            {
                name: bibles[7].name,
                value: bibles[7].value
            },
            {
                name: bibles[8].name,
                value: bibles[8].value
            }
            ))
        .addStringOption(option =>
            option.setName('verse')
            .setDescription('The verse to return')),
    async execute(interaction) {
        const query = interaction.options.getString('verse');
        const BIBLE_ID = interaction.options.getString('bible-version');
        const num = 10;
        const url = `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${query}&limit=${num}&sort=relevance`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'api-key': process.env.API_KEY,
            }
        };

        const verseResult = await request(url, options);
        const list = await verseResult.body.json();
        // if (!list.length) {
        // 	return interaction.reply(`No results found for **${query}**.`);
        // }
        const answer = list;
        const verse = answer["data"]["verses"][Math.floor(Math.random() * num)];
        // console.log(answer["data"]["verses"][0]);
        let version;
        for (let i = 0; i < bibles.length; i++) {
            if (BIBLE_ID === bibles[`${i}`].value) {
                version = bibles[`${i}`].name;
            }
        }
        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle(`Here is a Bible verse that deals with ${query}`)
            .addFields({
                name: 'Reference',
                value: verse["reference"]
            }, {
                name: 'Verse',
                value: trim(verse["text"], 1024)
            }, {
                name: 'Version',
                value: version
            }, {
                name: 'Bible verse provided by ',
                value: `https://scripture.api.bible`,
            }, );
        interaction.reply({
            embeds: [embed]
        });
    }
}