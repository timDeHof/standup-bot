const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

// Modular function to create a TextInput
function createTextInput(id, label, placeholder) {
  return new TextInputBuilder({
    customId: id,
    label: label,
    placeholder: placeholder,
    style: TextInputStyle.Paragraph,
    required: true,
  });
}

module.exports = {
  run: async ({ interaction }) => {
    const modal = new ModalBuilder({
      customID: `standupModal-${interaction.user.id}`,
      title: "Daily Standup",
    });

    const name = interaction.user.globalName || interaction.user.username;

    // Create text inputs
    const yesterdayInput = createTextInput(
      "yesterdayInput",
      "what did you do yesterday?",
      "e.g. Had a sprint planning meeting",
    );

    const todayInput = createTextInput(
      "todayInput",
      "what are you doing today?",
      "e.g. start working on the project's backlog",
    );

    const blockersInput = createTextInput(
      "blockersInput",
      "what blockers do you have?",
      "e.g. had no internet connection",
    );

    // Create action rows
    const yesterdayActionRow = new ActionRowBuilder().addComponents(
      yesterdayInput,
    );
    const todayActionRow = new ActionRowBuilder().addComponents(todayInput);
    const blockersActionRow = new ActionRowBuilder().addComponents(
      blockersInput,
    );

    modal.addComponents(yesterdayActionRow, todayActionRow, blockersActionRow);
    await interaction.showModal(modal);

    // Wait for modal to be submitted
    const filter = (interaction) =>
      interaction.customId === `standupModal-${interaction.user.id}`;

    interaction
      .awaitModalSubmit({ filter, time: 300000 })
      .then((modalInteraction) => {
        try {
          const yesterday =
            modalInteraction.fields.getTextInputValue("yesterdayInput");
          const today = modalInteraction.fields.getTextInputValue("todayInput");
          const blockers =
            modalInteraction.fields.getTextInputValue("blockersInput");

          // Validate inputs
          if (!yesterday || !today || !blockers) {
            throw new Error("Please fill out all fields.");
          }

          const response = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Daily Standup")
            .addFields(
              { name: "Yesterday:", value: yesterday },
              { name: "Today:", value: today },
              { name: "Blockers:", value: blockers },
            )
            .setFooter({
              text: `standup by ${name}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

          modalInteraction.reply({ embeds: [response] });
        } catch (error) {
          console.error("An error occurred:", error);
          modalInteraction.reply({
            content: "An error occurred. Please try again later.",
            ephemeral: true,
          });
        }
      })
      .catch((error) => {
        console.error(
          "Modal submission timed out or another error occurred:",
          error,
        );
        interaction.followUp({
          content:
            "Modal submission timed out or another error occurred. Please try again later.",
          ephemeral: true,
        });
      });
  },

  data: {
    name: "standup",
    description: "Replies with a daily standup form for a team member fill out",
  },
};
