import {
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
} from "discord.js";

// Define the slash command using SlashCommandBuilder
export const data = new SlashCommandBuilder()
  .setName("select") // Command name that users will type
  .setDescription("Select a Coding Challenge"); // Description of the command

// Function to execute when the slash command is called
export async function execute(interaction) {
  const select = new StringSelectMenuBuilder()
    .setCustomId("challenge")
    .setPlaceholder("What is your favorite Coding Challenge!")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Wave Function Collapse")
        .setDescription("Implements WFC collapse algorithm")
        .setValue("**Wave Function Collapse**"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Image to ASCII")
        .setDescription("Image to ASCII")
        .setValue("**Image to ASCII**"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Mandelbulb") //
        .setDescription("Renders a mandelbulb point cloud")
        .setValue("**Mandelbulb**")
        .setEmoji("1066437493827834008")
    );

  const row = new ActionRowBuilder().addComponents(select);

  const response = await interaction.reply({
    content: "Choose your favorite Coding Challenge!",
    components: [row],
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.StringSelectMenuBuilder,
    time: 3_600_000,
  });

  collector.on("collect", async (i) => {
    const selection = i.values[0];
    await i.reply(`${i.user} has selected ${selection}!`);
  });

  // // Awaiting user's challenge selection (waiting max 10 seconds)
  // const challengeSelection = await interaction.channel
  //   .awaitMessageComponent({
  //     filter,
  //     componentType: ComponentType.StringSelectMenuOptionBuilder,
  //     time: 20000, // Timeout period in milliseconds
  //   })
  //   .catch((err) => {
  //     // Handling the scenario where user doesn’t respond in time
  //     interaction.followUp("Sorry, you took too long!");
  //   });
  // if (!challengeSelection) return; // Exit function if no valid interaction is collected

  // //
  // const userChoice = StringSelectMenuOptionBuilder.customId;
  // await challengeSelection.reply(
  //   `Your favorite Coding Challenge is ${userChoice} - great choice!`
  // );
}
