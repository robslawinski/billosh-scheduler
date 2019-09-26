module.exports = {
  name: 'memes',
  description: 'A nice little easter egg',
  args: true,
  guildOnly: true,
  execute(message, args, exampleEmbed){

    var sendfile = 0;
    if(args[0].toLowerCase() == "judge"){
      sendfile = "./pictures/should we judge.mp4"
    }
    if(args[0].toLowerCase() == "perverted"){
      sendfile = "./pictures/laughing custodes.mp4"
    }
    if(args[0].toLowerCase() == "delete" || args[0].toLowerCase() == "delet"){
      sendfile = "./pictures/delet.mp4"
    }
    // exampleEmbed.setTitle(args.join(' ')).attachFiles(['/home/rob/Videos/laughing custodes.mp4']);
    exampleEmbed.setTitle(args.join(' ')).attachFiles([sendfile]);

    message.channel.send(exampleEmbed);
    message.delete(10);
    //






    }

  };
