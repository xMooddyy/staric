const Discord = require("discord.js");
const Xp = require("../../models/xp.js");
const jimp = require("jimp");

module.exports = {
  config: {
    name: "rank",
    description: "See how many xp you have, and what level you're.",
    usage: "",
    accessableby: "Members",
    aliases: ["level"],
    cooldown: 3,
    enabled: false
  },
  run: async (bot, message, args) => {
    
 let target = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;

        Xp.findOne({
            serverID: message.guild.id,
            userID: target.id
        }, async (err, res) => {
            if(err) console.error(err)

            if(!res) {
                message.channel.send(`${target.username} doesn't have any XP.`)
            } else {
              /*  let image = await jimp.read("https://cdn.glitch.com/b0aa5a88-a548-4566-8d92-145fada35740%2Fad9c2bda-7799-4475-bf06-133a1da4ee44.image.png?v=1581451955204");
      
      let avatar = await jimp.read(target.displayAvatarURL)
      
      let font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
      let font2 = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
      
      let rect = await jimp.read("https://cdn.glitch.com/b0aa5a88-a548-4566-8d92-145fada35740%2F52b7df37-c1f3-4874-a85e-345e1f71d8b3.image.png?v=1581455550179")
      
      let mask = await jimp.read("https://cdn.glitch.com/b0aa5a88-a548-4566-8d92-145fada35740%2F9dd2efcc-e14f-4114-8ad2-d24a50ea0ec0.image.png?v=1581453016829")
      
      image.resize(400, 180)
      avatar.resize(128, 128)
      mask.resize(128, 128)
      avatar.mask(mask, 0, 0)
      image.composite(avatar, 20, 26)
      image.print(font2, 23, 148, `${target.username}`)
      image.print(font, 185, 30, `Level: ${res.level}`)
      image.print(font, 228, 115, `XP: ${res.xp}`)
      
      
   const buffer = await image.getBufferAsync(jimp.MIME_JPEG);

  const embed = new Discord.RichEmbed()
  .attachFile({ attachment: buffer, name: "profile.jpeg" })
  .setImage("attachment://profile.jpeg")
      
      message.channel.send(embed)
            } */
              const member = message.guild.member(target);
              let embed = new Discord.RichEmbed()
              .setTitle(`${member.user.username}'s XP`)
              .setThumbnail(member.user.displayAvatarURL)
              .setColor("RANDOM")
              .addField(`Current Level:`, res.level, true)
              .addField(`XP:`, res.xp, true)
              .addField(`Next Level:`, res.level + 1, true)
              
              message.channel.send(embed)
            }
        })    
  }
}