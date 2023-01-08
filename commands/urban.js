const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

const { request } = require('undici');

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
 
  data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Replies with definition'),
 
  async execute(interaction) {
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({ term });

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const { list } = await dictResult.body.json();

		if (!list.length) {
			return interaction.reply(`No results found for **${term}**.`);
		}

		const [answer] = list;

		const embed = new EmbedBuilder()
			.setColor(0xEFFF00)
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{
					name: 'Rating',
					value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
				},
			);
		interaction.reply({ embeds: [embed] });
  },
};