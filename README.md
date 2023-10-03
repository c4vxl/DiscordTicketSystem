# Discord Bot - Ticket System Library

This Repository provides a library for a simple ticket system for your discord server. Users can create tickets with titles and optional descriptions, and moderators with the specified role can view these tickets.

## Features

- Create tickets with titles and optional descriptions.
- Moderators with the specified role can close/view tickets.
- Easy to set up and use.

## Installation

1. Clone the `ticket_system.js` file from this repository to your local machine.

2. Install the required dependencies:
```bash
npm install discord.js
```

## Usage
Here's an example of how to use this library in your own code:

```js
const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({"intents": [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]});


client.on("ready", () => {
    require("./ticket_system").register(client) // register ticket system
});


client.login("YOUR_BOT_TOKEN"); // connect bot
```
Replace "YOUR_BOT_TOKEN" with your actual bot token.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## Developer
This Project was Developed by [c4vxl](https://c4vxl.de)
