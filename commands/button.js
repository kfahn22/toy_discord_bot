// https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons

// https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md
// To find id for  custom emojis \emoji and object will show i.e. <:mandelbulb:1066115755172700281> 

// https://discordjs.guide/popular-topics/collectors.html#await-reactions

const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('This command will allow the user to press some buttons'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('primary')
                .setLabel('PRIMARY')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('773986657921794078'),
                new ButtonBuilder()
                .setCustomId('secondary')
                .setLabel('SECONDARY')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('697520562200772688'),
                new ButtonBuilder()
                .setCustomId('Success')
                .setLabel('SUCCESS')
                .setStyle(ButtonStyle.Success)
                .setEmoji('664125053008609300'),
                new ButtonBuilder()
                .setCustomId('danger')
                .setLabel('DANDER')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('697519758920253540'),
                new ButtonBuilder()
                .setURL('https://thecodingtrain.com')
                .setLabel('Coding Train')
                .setStyle(ButtonStyle.Link)
                .setEmoji('378587886704001025')
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('button')
            .setDescription('button');

        await interaction.reply({
                content: 'Click a button',
                fetchReply: true,
                embeds: [embed],
                components: [row]
            })
            .then(() => {
                //const filter = i => i.customId === 'secondary-button';
                const collector = interaction.channel.createMessageComponentCollector({
                    //filter,
                    time: 15000
                });

                collector.on('collect', async i => {
                    await i.update({
                        content: 'A button was clicked!',
                        components: []
                    });
                });

                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            })
    }
}