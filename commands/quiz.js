import questions from "./questions.json" assert { type: "json" };

import {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("quiz")
  .setDescription("Asks a question!");

// Function to execute when the slash command is called
export async function execute(interaction) {
  console.log("starting");
  let i = Math.floor(Math.random() * questions.length);
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("random-question")
      .setPlaceholder("Please select your answer")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(`questions[${i}]`)
          .setDescription(`Question ${i}`)
          .setValue(
            `questions[${i}].answers.some(answer => answer.toLowerCase() === response.content.toLowerCase())`
          )
      )
  );

  // const item = quiz[Math.floor(Math.random() * quiz.length)];
  const filter = (response) => {
    return questions[`${i}`].answers.some(
      (answer) => answer.toLowerCase() === response.content.toLowerCase()
    );
  };
  await interaction
    .reply({
      content: questions[`${i}`].question,
      fetchReply: true,
    })
    .then(() => {
      interaction.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ["time"],
        })
        .then((collected) => {
          interaction.followUp(
            `${collected.first().author} got the correct answer!`
          );
        })
        .catch((collected) => {
          interaction.followUp("Looks like nobody got the answer this time.");
        });
    });
}
