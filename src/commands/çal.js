const { PermissionsBitField } = require("discord.js");
const { EmbedBuilder } = require("discord.js")
module.exports = {
        enable: true,
        dbl: false,
        slash: false,
        name: ["oynat", "pplay", "p", "play", "çal"],
    async execute(client, message, args) {
        const { channel } = message.member.voice;
        if (!channel) return message.reply({
          content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
          allowedMentions: {
          repliedUser: false
          }
        })
                   if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) return message.reply({
                     content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
                     allowedMentions: {
                     repliedUser: false
                     }
                   })
        if (!message.guild.members.me.permissionsIn(channel).has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) return message.reply({
                   content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
                   allowedMentions: {
                   repliedUser: false
                   }
                   })
        const string = args.join(" ");
        if (!string) {
            return message.reply({
              content: "<a:hata:967431448539848754> | Çalmam için birşey belirtmedin!",
              allowedMentions: {
              repliedUser: false
              }
            });
        }
        const options = {
          member: message.member,
          textChannel: message.channel, message
        }
   client.distube.play(message.member.voice.channel, string, options);
    }
}

   