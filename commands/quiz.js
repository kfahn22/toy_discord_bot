const questions = require('./questions.json');

const {
	SlashCommandBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Asks a question!'),
	async execute(interaction) {
		let i = Math.floor(Math.random() * questions.length);
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
				.setCustomId('random-question')
				.setPlaceholder('Please select your answer')
				.setMinValues(1)
				.setMaxValues(1)
				.addOptions([{
					label: `questions[${i}]`,
					description: `Question ${i}`,
					value: `questions[${i}].answers.some(answer => answer.toLowerCase() === response.content.toLowerCase())`
				}]),
			);

		// const item = quiz[Math.floor(Math.random() * quiz.length)];
		const filter = response => {
			return questions[`${i}`].answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		await interaction.reply({
				content: questions[`${i}`].question,
				fetchReply: true
			})
			.then(() => {
				interaction.channel.awaitMessages({
						filter,
						max: 1,
						time: 30000,
						errors: ['time']
					})
					.then(collected => {
						interaction.followUp(`${collected.first().author} got the correct answer!`);
					})
					.catch(collected => {
						interaction.followUp('Looks like nobody got the answer this time.');
					});
			});
	}
}