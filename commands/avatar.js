module.exports = {
  name: 'avatar',
  description: 'Send the Avatar Image of either the Author or a mentioned user',
  args: true,
  guildOnly: true,
  execute(message, args, exampleEmbed){
    if (!message.mentions.users.size) {

      return message.reply(message.author.avatarURL);
    };
    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
    });

// send the entire array of strings as a message
// by default, discord.js will `.join()` the array with `\n`
      message.channel.send(avatarList);



    }

  };
