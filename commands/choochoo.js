//const { SlashCommandBuilder } = require('discord.js');
import { SlashCommandBuilder } from '@discordjs/builders';

const replies = ["🚂🌈💖", "Choo choo!", "Ding! 🛎", "Never forget this dot!"];


module.exports = {
	data: new SlashCommandBuilder()
		.setName('choochoo')
		.setDescription('Replies with emogies!'),
	async execute(interaction) {
    const index = Math.floor(Math.random() * replies.length);
		await interaction.reply({ content: replies[index], ephemeral: true });
	},
};

