module.exports = {
  name: 'time',
  description: 'Used for Timezone testing',
  args: true,
  guildOnly: true,
  execute(message, args, exampleEmbed){
    var today = Date.now();
    var time = require('time');
    const memburs = message.channel.members.array();
    var currtime = new time.Date(message.createdTimestamp);
    var writer = message.author;
    message.channel.send(`The fucker who wrote the message ${writer} and the possible correct time he joined ${writer.createdAt}`)

    exampleEmbed.setTitle("Time Test").addField("JS Date timestamp", today)
    .addBlankField()
    .addField("Message Timestamp", message.createdAt)
    .addBlankField()
    .addField("currtime", currtime)
    .addBlankField()
    .addField("Message Snowflake", message.id)
    .addBlankField()
    // .addField("nerd shit", JSON.stringify(time.localtime(currtime)))
    .addField("nerd shit", JSON.stringify(time.localtime(writer.createdAt)))
    .addBlankField()
    .addField("Message Guild ID", message.guild.id)
    console.log(`Message Client${JSON.stringify(message.client.users)}`);

    // var weekday = today.getDay();

    // var options = { weekday: 'long'};

    // console.log(` at timestamp ${message.createdTimestamp}`);

    // console.log(`Date Test ${today}`);


    // message.reply(`Message Created At: ${message.createdAt} at timestamp ${message.createdTimestamp}`)

    console.log(time.localtime(currtime));

    memburs.forEach(function(element){
      console.log(`user ${element}\t bot status ${element.user.bot}\t timezone ${element.user.id}`);
      exampleEmbed.setDescription(element)
      .setFooter(`other misc nerd shit ${element.joinedAt} ${Date.now()}`)
      // console.log(`${element} ${element.client}`);
      message.client.fetchUser(element.user.id);
      // .setFooter(`other misc nerd shit ${JSON.stringify(time.localtime(element.createdAt))}`)
      message.channel.send(exampleEmbed)
      // if (element.user.bot == false){
        // element.send(`An Important Announcement From __*${message.guild}*__ \n ${message.channel} Channel:\n \`\`\`${announce}\`\`\``);
        // message.reply(`Time Zone For User ${element}: ${element.joinedAt}`)
      // }
    });


    }

  };
