const Discord = require("discord.js");
const Money = require("../../models/xp.js");

module.exports = {
  config: {
    name: "leaders",
    description: "Leaderboard for users in the server..",
    usage: "",
    accessableby: "Members",
    cooldown: 3,
    enabled: false
  },
  run: async (bot, message, args) => {
    
     Money.find({
    serverID: message.guild.id
  }).sort([
    ['xp', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);

    let embed = new Discord.RichEmbed()
      .setTitle("XP Leaderboard | Top 10 users")
    //if there are no results
    if (res.length === 0) {
      embed.setColor("RED");
      embed.addField("No data found", "Please type in chat to gain XP!")
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor("RANDOM");
      for (let i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**XP:** ${res[i].xp}\n**Level:** ${res[i].level}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP:** ${res[i].xp}\n**Level:** ${res[i].level}`);
        }
      }
    } else {
      //more than 10 results
      embed.setColor("RANDOM");
      for (let i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**XP:** ${res[i].xp}\n**Level:** ${res[i].level}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**XP:** ${res[i].xp}\n**Level:** ${res[i].level}`);
        }
      }
    }

    message.channel.send(embed);
     })
    
  }
}