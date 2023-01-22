// https://discordjs.guide/interactions/select-menus.html

const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder
} = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select-challenge')
        .setDescription('This command will create a selection menu'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('challenge-select')
                .setPlaceholder('Please select your favorite Coding Challenge')
                .setMinValues(1)
                .setMaxValues(2)
                .addOptions([{
                    label: 'Wave Function Collapse',
                    description: 'Implements WFC collapse algorithm',
                    value: '**Wave Function Collapse**'
                }, {
                    label: 'Image to ASCII',
                    description: 'Image to ASCII',
                    value: '**Image to ASCII**'
                }, {
                    label: 'Mandelbulb',
                    description: 'Renders a mandelbulb point cloud',
                    value: '**Mandelbulb**',
                    emoji: '1066756338799095948'
                }, ]),
            );
        //await interaction.reply( {content: 'What is your favorite Coding Train challenge?', components: [row]});

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Favorite Coding Challenge')
            //.setURL('')
            .setDescription('What is your favorite Coding Challenge');

        await interaction.reply({
            content: 'Select',
            ephemeral: true,
            embeds: [embed],
            components: [row]
        });
    },
};