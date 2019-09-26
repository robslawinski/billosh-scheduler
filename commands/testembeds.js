
module.exports = {
  name: 'testembeds',
  description: 'Send an example rich embed',
  args: true,
  guildOnly: true,
  execute(message, args, exampleEmbed){
    console.log(`args ${args}`);
    exampleEmbed
    .setTitle(message.guild)
    // .addBlankField()
    .addField("Channel", message.channel,true)
    .setFooter("Billosh Scheduler")
    .setImage(message.guild.iconURL)
    .setDescription(args.join(" "))
    .setTimestamp();
    const memburs = message.channel.members.array();


// send the entire array of strings as a message
// by default, discord.js will `.join()` the array with `\n`

    message.channel.send(exampleEmbed);
    message.reply(exampleEmbed.timestamp);
    // memburs.forEach(function(element){
    //   if (element.user.bot == false){
    //     console.log(`person ${element} ${typeof(element)} everyone ${memburs}`);
    //     console.log(element.client);
    //   }
    // });
    // message.channel.send(message.embeds)




    }

  };
