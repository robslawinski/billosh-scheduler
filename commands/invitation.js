module.exports = {
  name: 'invitation',
  description: 'Invite Individuals In a Channel, Or Call the Channel',
  args: true,
  guildOnly: true,
  aliases: ['inv','invite'],
  execute(message, args, exampleEmbed, pool){
    var mysql = require('mysql');
    var schedule = require('node-schedule-tz');
    const memburs = message.channel.members.array();
    console.log(args);


    if (args[0] === 'weekly'){
      var re = /[']/g;
      var announce = args.join(' ');
        console.log(`${announce.replace(re,"’")}`);

      // announce = args.slice(0).join(' ');
      // console.log(announce);



      if (typeof args[1] == 'number'){
              console.log(parseInt(args[1],10));
            };
       if (parseInt(args[1],10) <=7 && parseInt(args[1],10) >=0 ) {
         console.log("NIce");
         console.log(parseInt(args[1],10));
         console.log(args[2].split(":").length);
         console.log(args[2].split(":"));
         const time_ = args[2].split(":");
         var hour = 0;
         var minute = 0;
         if (time_.length == 2){
           var announce = args.slice(3).join(' ');

           console.log("Nice");
           console.log(args.slice(2).join(' '));
           console.log(args);
           console.log(time_);

           // if parseInt(time_[0],10)
           hour = parseInt(time_[0].replace(/\D+/i,""),10);
           minute= parseInt(time_[1].replace(/\D+/i,""), 10);
           console.log(hour);
           console.log(minute);
           if ((hour >= 0 && hour <= 23) && (minute >= 0 && minute <= 59)){
             pool.getConnection(function(err, con) {
               if (err) throw err;
               const query_insert = `INSERT INTO announcements (announcement, hour, minute, day, channel, server_name) `;
               var query_add = `SELECT * FROM (SELECT '${announce.replace(re,"’")}', ${hour}, ${minute}, ${args[1]}, '${message.channel}', '${message.guild}') AS tmp `;
               var query_check = `WHERE NOT EXISTS(SELECT channel, day FROM announcements WHERE channel = '${message.channel}' AND day = '${args[1]}') LIMIT 1`;
               var query_full = query_insert+query_add+query_check;
               console.log(query_full);
               con.query(query_full, function (err, result) {
                 if (err) throw err;
                 console.log(`Result ${result}`);
                 if (!result.length){
                   console.log("Null");
                   message.author.send(`here's what you typed in: \`\`\`${message}\`\`\``)
                   return message.reply(`There already exists an event in the ${message.channel} channel for the specific day`);

                 }
               });
               con.release();

             });
           }
           else {
             console.log('wtf');
             message.author.send(`Please use a correct time slot between 0 and 23 hours and 0 and 59 minutes time like so\`\`\`[23]:[59]]\`\`\` to create a message in ${message.channel}`);

           }

         console.log(`announce ${announce} guild ${message.guild} channel ${message.channel} timezone ${message.createdAt} `);
         var embedMsg = exampleEmbed.setTitle(message.guild).addField("Channel", message.channel,true).setDescription(announce).setFooter("Billosh Scheduler").setTimestamp().setImage(message.guild.iconURL);
         console.log(memburs);
      }
      else{
        return message.author.send(`Please use a correct time slot in 24 hr time like so\`\`\`[13]:[01]\`\`\` to create a message in ${message.channel}`);
      }

      // return message.channel.send(`TimeZone ${message.createdAt} Weekly Test ${memburs}`);
      // return message.channel.send(`TimeZone ${message.embeds} Weekly Test ${memburs}`);
    }
  }

  }
};
