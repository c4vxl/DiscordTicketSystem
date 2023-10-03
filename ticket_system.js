const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ApplicationCommandOptionType } = require("discord.js") // import requirements from discord.js library

const TICKET_ROLE_NAME = "ticketsystemmoderator" // role name for ticket moderators

function init(client) {
    client.guilds.cache.forEach(guild => {
        // register role
        if (!guild.roles.cache.find(role => role.name === TICKET_ROLE_NAME)) {
            guild.roles.create({ name: TICKET_ROLE_NAME });
        }

        // register command
        guild.commands.create({
            name: "ticket",
            description: "Ticket Ticket Ticket!!!",
            options: [
                {
                    name: "title",
                    description: "Please give a title for the Ticket",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },

                {
                    name: "description",
                    description: "Please give a little description!",
                    type: ApplicationCommandOptionType.String,
                }
            ]
        });
    });
}

function register(client) {
    init(client) // init

    // register command and button listener
    client.on("interactionCreate", (interaction) => {
        if (interaction.isButton()) {
            if (interaction.customId !== "ticket_close") return

            interaction.channel.delete()
        } else if (interaction.isCommand()) {
            if (interaction.commandName !== "ticket") return

            const title = interaction.options.getString("title");
            const description = interaction.options.getString("description")
        
            if (description == null) openTicket(interaction.guild, interaction.user, title)
            else openTicket(interaction.guild, interaction.user, title, description)
        
            interaction.reply({ content: "Opening Ticket...", ephemeral: true })
        }
    })
}

function openTicket(guild, user, ticketTitle, ticketDescription="***<Not set>***") {
    guild.channels.create({ // create channel
        name: `ticket-${user.username}>;`, // set name
        type: ChannelType.GuildText, // set type to text channel
        permissionOverwrites: [ // set permissions
            {
                id: guild.roles.everyone.id,
                deny: [PermissionFlagsBits.ViewChannel]
            },
            {
                id: guild.roles.cache.map(r => r).find(r => r.name == TICKET_ROLE_NAME).id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            },
            {
                id: user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            }
        ]
    }).then(channel => {
        channel.send({ embeds: [
            new EmbedBuilder() // init embed builder
                .setColor(0x0099FF) // set color
                .setTitle(`Title: ${ticketTitle}`) // set title
                .addFields([ // add lines
                    { name: 'Author: ', value: `<@${user.id}>` },
                    { name: 'Description: ', value: ticketDescription },
                    { name: ' ', value: ' ' },
                    { name: ' ', value: ' ' },
                    { name: `Dear ${user.username},`, value: "Please specify your problems as exact as you can, to receive the optimal help!" },
                    { name: ' ', value: ' ' },
                    { name: ' ', value: ' ' }
                ])
                .setFooter({ text: `Ticket opened by ${user.username}`, iconURL: user.avatarURL() }) // add footer
                .setThumbnail(user.avatarURL()) // add thumbnail
                .setTimestamp() // add timestamp
        ], components: [
            new ActionRowBuilder() // add buttons
			    .addComponents(
                    new ButtonBuilder()
			            .setCustomId('ticket_close')
			            .setLabel('Close Ticket')
			            .setStyle(ButtonStyle.Danger)
                )
        ] });

        return channel;
    })
}

module.exports = { init, register, openTicket, TICKET_ROLE_NAME }; // export
