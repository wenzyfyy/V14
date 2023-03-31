//Botun main dosyası
const { Client, GatewayIntentBits, Events, Partials } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits).filter(
    (x) => typeof x === "string"
  ),
  partials: Object.values(Partials).filter((x) => typeof x === "string"),
});
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const discord = require("discord.js");
const db = require("inflames.db");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { token, topgg } = require("./src/base/settings.json");
const DBL = require("dblapi.js");
let dbl;
if (topgg) {
  dbl = new DBL(topgg, { webhookPort: 5000, webhookAuth: "password" });
}
require("./src/base/app.js")(client, dbl);
//
client.distube = new DisTube(client, {
  searchSongs: 0,
  searchCooldown: 0,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  leaveOnEmpty: false,
  emptyCooldown: 0,
  leaveOnFinish: true,
  plugins: [
    new YtDlpPlugin({ update: false }),
    new SoundCloudPlugin(),
    new SpotifyPlugin({
      parallel: true,
      emitEventsAfterFetching: false,
      api: {
        clientId: "05e0ad4f848b4b3fb370424340a5eb6d",
        clientSecret: "88ba1be765944535878fc5cd892a9591",
      },
    }),
  ],
});
//
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Power By FastUptime"));
app.listen(port, () =>
  console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);
//Dm
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  const attachment = message.attachments.first();
  if (message.channel.type === "DM") {
    console.log(message.content);
    const dmLogEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("AQUA")
      .setThumbnail(`${message.author.avatarURL()}`)
      .addField("Gönderen", message.author.tag)
      .addField("Gönderen ID", message.author.id)
      .addField("Gönderilen Mesaj", message.content);
    if (message.attachments.size !== 0) {
      dmLogEmbed.setImage(attachment.url);
    }
    client.users.fetch("564837933912293386").then((channel) => {
      channel.send({ embeds: [dmLogEmbed] });
    });
  }
});
//Distube addSong Komutu
client.distube.on("addSong", (queue, song) => {
  const { MessageEmbed } = require("discord.js");
  const embed = new MessageEmbed()
    .setColor("AQUA")
    .setDescription(
      `<:liste:973937322049548332> | Listeye Eklendi:
**${song.name}**
**Süre:** ${song.formattedDuration}`
    )
    .setTimestamp();
  queue.textChannel.send({
    embeds: [embed],
  });
});
//Distube playSong Komutu
client.distube.on('playSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [new EmbedBuilder().setColor('LuminousVividPink')
				.setDescription(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user
				}\n${(queue)}`)],
		}),
	)
  //
  .on("initQueue", (queue) => {
    queue.volume = 125;
  });
client.distube.on("error", (channel, error) => {
  console.error(error);
  channel.send(`An error encoutered: ${error.slice(0, 1979)}`); // Discord limits 2000 characters in a message
});
//
client.distube.on("searchNoResult", (message, query) =>
  message.reply({
    content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
    allowedMentions: {
      repliedUser: false,
    },
  })
);

client.login(token);
