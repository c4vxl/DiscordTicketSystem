const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();


const flags = IntentsBitField.Flags;
const client = new Client({"intents": [flags.Guilds, flags.GuildMessages]});


client.on("ready", () => {
    require("./ticket_system").register(client) // register ticket system
});


client.login(process.env.TOKEN); // connect bot