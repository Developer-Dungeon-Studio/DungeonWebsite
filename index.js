/* Import modules */
const express = require("express");
const path = require("path");
const { Client, Intents } = require("discord.js");
const { writeFileSync, readFileSync } = require("fs");
require("dotenv").config();

/* Misc */
const app = express();
app.listen(6080);
app.set("view engine", "ejs");
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


console.clear();
console.log(" > Website started on port 6080");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.TOKEN);

client.on("messageCreate", (message) => {
  if (message.content == "<@980421710685831209>")
  message.reply(`Hey, Im the Guard of this Dungeon`);
})

client.on("guildMemberAdd", (member) => {

  let date = (Date.now() / 1000) | 0;

  const welcomeembed = new MessageEmbed()
    .setColor("#7f2b3c")
    .setTitle(
      `Welcome **${member.user.username}** to the **Developers Dungeon** discord server!`
    )
    .setDescription(`> You are member number: **${member.guild.memberCount}!**`)
    .addField("User joined:", `> <t:${date}:F>`, false)
    .addFields(
      {
        name: "Make sure to read the **Rules** before you continue!",
        value: `> <#965018961727074354>`,
        inline: false,
      },
      {
        name: "Check out our pinned repos to see what we are currently working on!",
        value: `> <#965018977501847633>`,
        inline: false,
      },
      {
        name: "Show of your own projects using out Showcase Channel!",
        value: `> <#978711221794639903>`,
        inline: false,
      }
    )
    .setThumbnail(`${member.user.displayAvatarURL()}`)
    .setFooter({
      text: "Developers Dungeon",
      iconURL:
        "https://cdn.discordapp.com/attachments/983499700021907468/983499795501043753/DD-Logo.png",
    })
    .setTimestamp();

  const channel = member.guild.channels.cache.get(process.env.WELCOMECHANNEL);

  channel.send({ embeds: [welcomeembed] });
});

client.on("ready", () => {
  console.log(" > Logged in as " + client.user.tag);


  const setName = async (data) => {
    setInterval(async ()  => {
    let servers = 0;
    servers += data.wouldyou.servers;
    servers += data.cryptohelper.servers;
    servers += data.ticketer.servers;
    servers += data.portfoliobot.servers;
    let users = 0;
    users += data.wouldyou.users;
    users += data.cryptohelper.users;
    users += data.ticketer.users;
    users += data.portfoliobot.users;

    client.user.setActivity(`${servers} guilds`, { type: "WATCHING" });

    const channel = await client.channels.cache.get("983403204790345779");
    channel.setName(`🤖・Total guilds: ${servers}`);

    const channel1 = await client.channels.cache.get("985337755045355520");
    channel1.setName(`🤖・Bot users: ${users}`);
      
    const channel2 = await client.channels.cache.get("983488300801200158");
    channel2.setName(
      `👀・Members:  ${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}`
    );
  }, 15000);
  };

    
  setInterval(() => {
    let rawdata = readFileSync(
      path.join(__dirname, "/assets/json/servers.json")
    );
    let data = JSON.parse(rawdata);
    setName(data);
  }, 1.8e+6);

  let rawdata = readFileSync(path.join(__dirname, "/assets/json/servers.json"));
  let data = JSON.parse(rawdata);
  setName(data);



});
/* Code */
// Website
app.get("/", (req, res) => {
  let rawservers = readFileSync(
    path.join(__dirname, "/assets/json/servers.json")
  );
  let servers = JSON.parse(rawservers);
  let rawspotify = readFileSync(
    path.join(__dirname, "/assets/json/spotify.json")
  );
  let spotify = JSON.parse(rawspotify);

  res.render(path.join(__dirname, "/views/index.ejs"), {
    servers,
    spotify: spotify.spotify,
  });
});

// Api
app.post("/api/servers", (req, res) => {
  let rawdata = readFileSync(path.join(__dirname, "/assets/json/servers.json"));
  let data = JSON.parse(rawdata);
  if (req.query.code == process.env.APITOKENWEB) {
    switch (req.body.bot) {
      case "wouldyou":
        data.wouldyou = {
          servers: Number(String(req.body.servers)),
          ping: Number(String(req.body.ping)),
          users: Number(String(req.body.users.replaceAll(',', '')))
        }
        writeFileSync(
          path.join(__dirname, "/assets/json/servers.json"),
          JSON.stringify(data, null, 4)
        );
        break;
      case "cryptohelper":
        data.cryptohelper = {
          servers: Number(String(req.body.servers)),
          ping: Number(String(req.body.ping)),
          users: Number(String(req.body.users.replaceAll(',', '')))
        }
        writeFileSync(
          path.join(__dirname, "/assets/json/servers.json"),
          JSON.stringify(data, null, 4)
        );
        break;
      case "ticketer":
        data.ticketer = {
          servers: Number(String(req.body.servers)),
          ping: Number(String(req.body.ping)),
          users: Number(String(req.body.users.replaceAll(',', '')))
        }
        writeFileSync(
          path.join(__dirname, "/assets/json/servers.json"),
          JSON.stringify(data, null, 4)
        );
        break;
      case "portfoliobot":
        data.portfoliobot = {
          servers: Number(String(req.body.servers)),
          ping: Number(String(req.body.ping)),
          users: Number(String(req.body.users.replaceAll(',', '')))
        }
        writeFileSync(
          path.join(__dirname, "/assets/json/servers.json"),
          JSON.stringify(data, null, 4)
        );
        break;
      default:
        break;
    }
  }
  res.json({ fetched: true });
});

// Api
app.post("/api/spotify", (req, res) => {
  let rawdata = readFileSync(path.join(__dirname, "/assets/json/spotify.json"));
  let data = JSON.parse(rawdata);
  if (req.query.code == "5BhTaxnK3zbhQ3dkaqBBgJB3rgrDEb5T") {
    if (req.body.spotify) {
      if (req.body.spotify.length >= 3) {
        data.spotify = req.body.spotify;
      }
      writeFileSync(
        path.join(__dirname, "/assets/json/spotify.json"),
        JSON.stringify(data, null, 4)
      );
    }
  }
  res.json({ fetched: true });
});
