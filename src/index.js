// Require the necessary discord.js classes
require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");

// Create a new client instance
const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("error", (error) => {
  console.error("The bot encountered an error:", error);
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});
client.login(process.env.TOKEN).catch((error) => {
  console.error("Failed to log in:", error);
  process.exit(1);
});
