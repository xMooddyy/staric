Documentation
============================================================

I have started working on this bot a month ago and I made a lot of commands and it turned out successful.

I have decided to publish the bot to the public for people to test and use. I am willing to add more commands if Staric receives a lot of attention.

----------------------------------------------------------------------------------------------------

You can invite the bot for yourself here: [Invite Link](https://discordapp.com/oauth2/authorize?client_id=614175460313661470&permissions=8&scope=bot)

If you want to test our bot before adding it, feel free to join the official server here: [Invite Link](https://discord.gg/EFxRUJU)

Visit our website here: [Link](https://staric-official.glitch.me)

# Bot Features

- Economy.
- Moderation.
- Fun commands.
- Custom-configuration.
- Music.
- Logging.
- Utility.

# Required Permissions

The bot requests the following permissions when you add it. Removing any of these permissions later may hinder the bot’s operation:

For fun, miscellaneous, utility, economy commands:

- Read Messages: The bot must be able to listen to text channels.
- Send Messages: The bot needs to be able to post messages.
- Embed Links: The bot will often embeds links for the card answers it provides.
- Attach Files: The bot will often embed files for the card answers it provides.
- Use External Emojis: Required so that the bot can use custom emojis in some commands.
- Add Reactions: The bot has a help menu command that requires the bot to react to the message.

------------------------------------------------------------------------------------------------------------------------------

For Music commands:

- Speak: The bot must be able to speak in voice channels in order to stream music.
- Connect: The bot must be able to connect to voice channels in order to stream music.

------------------------------------------------------------------------------------------------------------------------------

For moderation, configuration commands:

- Kick Members: The bot must be able to kick members when the kick command is used.
- Ban Members: The bot must be able to ban members when the ban command is used.
- Manage Roles: The bot must be able to manage roles when the mute or role command is used.
- Manage Messages: The bot must be able to manage roles when the purge command is used.
- Mention Everyone: The bot must be able to mention everyone or here when the announce command is used.

---------------------------------------------------------------------------------------------------------------------------

That's all the permissions the bot requires in order to function.

# Commands

I will be listing all the commands the bot has, with their description, usage, aliases, etc.

() means optional, [] means required.

## Economy

| Command | Description | Usage |
|--|--|--|
|  addmoney | Add money to the mentioned user or yourself, can be a mention or an ID. | s!addmoney [amount] (user) |
| balance | Shows how much money you have, can be yourself or a mentioned user. Takes a mention or an ID. | s!balance (user) |
| daily | Get your daily money every 24 hours, you get between 100 and 700. | s!daily |
| leaderboard | Shows top 10 users with money in the server, in descending order. | s!leaderboard |
| rob | Rob people's money, you get between 100 and 500 money, requires mention. | s!rob [user] |
| weekly | Get your weekly money every 7 days, you get between 500 and 1500 money. | s!weekly |
| work | Work in order to get money, you can work every hour, you get between 80 and 500 money. | s!work |

------------------------------------------------------------------------------------------------------------------------

## Fun

| Command | Description | Usage |
|--|--|--|
| 8ball | Ask the magic 8ball a question! The answers are random. | s!8ball [question] |
| ascii | Print a keyword in ascii text, might break if you put a lot of words. | s!ascii [text] |
| avatar | Get someone's avatar, works with gifs and pictures, takes a mention or an ID. | s!avatar [user] |
| base64 | Turn your text into a code in base64, you can encode or decode text. | s!base64 [encode / decode] [text] |
| beautify | Turn your JavaScript code into a beautified code, requires [code blocks](https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-). | s!beautify \`\`\`code\`\`\` |
| captcha | Get a captcha that you can solve, it's for fun not for verification. | s!captcha |
| ping | The common ping command, get the API and Bot's latency in ms. | s!ping |
| reminder | Get a reminder to remind you in specified amount of time, requires the format of `10m` or `1d` | s!reminder [time] [reason] |
| uptime | Get the bot's uptime, meaning how long the bot has been online. | s!uptime |

------------------------------------------------------------------------------------------------------------------------

## Miscellaneous

| Command | Description | Usage |
|--|--|--|
| botinfo | Get information about the bot, such as how many guilds, RAM/CPU usage, core, etc. | s!botinfo |
| contact | If you find any issues within the bot, feel free to use this command, don't abuse it. | s!contact [info] |
| emojis | Get the emojis of the server, animated and non-animated. | s!emojis |
| help | A reaction based help menu, get all these commands but in a Discord server. | s!help (command) |
| icon | Get the icon of the server, can be a gif or picture. | s!icon |
| info | Get information about a specified user, can take a mention, ID or yourself. | s!info (user) |
| serverinfo | Get information about the server, such as the member count, channels count, features, etc. | s!serverinfo |
| support | Shows how to contact us and our support server. | s!support |

------------------------------------------------------------------------------------------------------------------------------

## Moderation

| Command | Description | Usage |
|--|--|--|
| announce | Announce a specified announcement, can ping here, everyone or not ping at all. Must configure the announcechannel in the config command | s!announce (here / everyone) [text] |
| ban | Ban a member from the server, can take a mention or an ID. | s!ban [user] (reason) |
| clearwarn | Clear someone's all warnings, can take a mention or an ID. | s!clearwarn [user] |
| config | Configure the settings of your server, such as welcome log, modslogs channel, logs channel, etc. Or simply show them. *For in-depth guide, scroll down.* | s!config (key) [value] |
| disable | Disable a module in your server, must be enabled in order to disable it. *For in-depth guide, scroll down.* | s!disable [module] |
| enable | Enable a module in your server, must be disabled in order to enable it. *For in-depth guide, scroll down.* | s!enable [module] |
| modules | Shows the modules of your server. *For in-depth guide, scroll down.* | s!modules |
| kick | Kick a member from your server, takes a mention or an ID. | s!kick [user] (reason) |
| mute | Mute a member from your server, will give them the `Muted` role. Takes a mention or an ID. | s!mute [user] (reason) |
| purge | Clear a specific number of messages, must be a number between 1 and 99. | s!purge [amount] |
| role | Give/Remove a role from a user, if the user has the role it will remove it instead. The role name is [Case Sensitive](https://developer.mozilla.org/en-US/docs/Archive/Case_Sensitivity_in_class_and_id_Names) | s!role [user] [role] |
| say | Make the bot say something, escapes everyone and here pings. | s!say [text] |
| softban | Ban a member for one day only, takes a mention or an ID. | s!softban [user] (reason) |
| unban | Unban a member from the server, must be an ID. | s!unban [user] |
| unmute | Unmute someone from the server, takes a mention or an ID. | s!unmute [user] |
| warn | Warn a member in the server, takes a mention or an ID. | s!warn [user] [reason] |
| warnings | List all the warnings a member has, takes a mention or an ID. | s!warnings [user] |

------------------------------------------------------------------------------------------------------------------------------

## Music

| Command | Description | Usage |
|--|--|--|
| disconnect | Disconnect the bot from a voice channel. | s!disconnect |
| join | Make the bot join a specific voice channel. | s!join |
| pause | Pause music to resume at any other time. | s!pause |
| play | Play any music from youtube. | s!play [URL / Song name] |
| queue | Shows the queue of the server. | s!queue |
| resume | Resume a paused song. | s!resume |
| search | Search for a song in youtube to play. | s!search [query] |
| skip | Skip the song in the queue. | s!skip |
| volume | Lower/Increase the volume, minimum is 0, maximum is 200. | s!volume [number] |

------------------------------------------------------------------------------------------------------------------------------

## Roblox

| Command | Description | Usage |
|--|--|--|
| whois | Search a user in Roblox, the username is [Case Sensitive](https://developer.mozilla.org/en-US/docs/Archive/Case_Sensitivity_in_class_and_id_Names) | s!whois [username] |

------------------------------------------------------------------------------------------------------------------------------

## Search

| Command | Description | Usage |
|--|--|--|
| docs | Search a query in discord.js library. | s!docs [query] |
| lmgtfy | Short of 'Let me google that for you', google anything in google. | s!lmgtfy [query] |
| mdn | Search a query in MDN (JavaScript). | s!mdn [query] |
| npm | Search for a package in NPM. | s!npm [package-name] |

------------------------------------------------------------------------------------------------------------------------------

# Configuration

We are now done with the commands, this is the in-depth guide for how to configure settings in your server.

Let's see the `s!config` command first.

The config command lets you to change the channels where the modules should take place, example below.

![Testing config command](https://i.gyazo.com/d0006cf61e67936d2338ac249e13e307.gif)

To show the configurations of your server, simply type `s!config` without any arguments, example below.

![Testing config command](https://i.gyazo.com/ba80feaddc336992189a78f544d14d88.gif)

------------------------------------------------------------------------------------------------------------------------------

The configurations that you can change:

- Prefix. Key: `prefix`
- Announcement Channel. Key: `announcechannel`
- Log channel. Key: `logs`
- Welcome channel. Key: `welcomelog`
- Leave channel. Key: `leavelog`
- Modlogs channel. Key: `modlogs`

That's pretty much it, easy right?

# Modules

To change modules, you have to use two commands. `disable` and `enable`. From the name, `enable` enables modules while `disable` disable modules.

To disable/enable a module, check the example below.

![Testing enable/disable command](https://i.gyazo.com/85535aca8f377cd412e94e27e49967fc.gif)

You can't enable/disable a module that's already enabled/disabled, as it will error as example below.

![Testing enable/disable command](https://i.gyazo.com/627da9f10125c896dc04fe202b393b77.gif)

To show which modules that are disable/enabled, simply use the command `s!modules` as example below.

![Testing modules command](https://i.gyazo.com/24986b86fa7636c04d4cbf262e990194.gif)

------------------------------------------------------------------------------------------------------------------------------

Here are the modules that you can enable/disable with description:

| Module | Description | Key |
|--|--|--|
| Logs | Logs for general stuff such as message edit, message delete, etc.  | logs |
|Mod logs| Logs for moderation stuff, such as warn, kick, ban, etc. | modlogs |
|Leave logs | Logs when someone leaves the server, example of this will be down. | leavelog |
| Welcome log | Logs when someone joins the server, example of this will be down. | welcomelog |
| Filter | Filters swear words from the server, if anyone swears the bot would delete the message. | filter |

------------------------------------------------------------------------------------------------------------------------------

Leave and welcome logs:

When someone leaves the server, the bot will respond with a random message in the leavelogs channel as below:

![Leave log](https://i.gyazo.com/7a281e55d11ed77dcdeae03119329aca.png)

When someone joins the server, the bot will respond with a random message in the welcomelogs channel as below:

![Welcome log](https://i.gyazo.com/20ff9bff54758b78e215f5d862dcfddb.png)
