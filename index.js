const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
var jobList = [];
var foundJob = false;

// const config = require('./config.json')
const {prefix, token, host, password, user, database} = require('./config.json')
var schedule = require('node-schedule-tz');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const attach = new Discord.Attachment();



var pool = mysql.createPool({
	host: host,
	user: user,
	password: password,
	database: database
});


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log("Ready!");
});

var exampleEmbed = new Discord.RichEmbed();


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	exampleEmbed = new Discord.RichEmbed()

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, exampleEmbed, pool);
		// message.reply(exampleEmbed);
		// message.reply(exampleEmbed.length);

	} catch (error) {
		console.error(error);
		exampleEmbed.setTitle('Error with that command. Please Send The Following Error to <@215939953488560128>').setImage('./pictures/technical_difficulties.png').setDescription(error)
		message.reply(exampleEmbed);
	}
});

client.on('error', console.error);


pool.getConnection(function(err, con) {
	if (err) throw err;
	client.on("debug", debug=>{
		console.log(debug);
		var val_guilds = client.guilds.array();
		val_guilds.forEach(function(val_guild){
			var val_guild_pic = val_guild.iconURL;
			var guild_chans = val_guild.channels.array();
			console.log(`${val_guild}`);
			guild_chans.forEach(function(guild_chan){

				if (guild_chan.type == 'text'){
					var chan_mems = guild_chan.members.array();


					con.query(`SELECT * FROM announcements WHERE channel = '${guild_chan}' `, function (err, result, fields) {
				    if (err) throw err;
						if(result.length != 0){


						result.forEach(function(element){
							var schedulename = `JobID: ${element.id}`
							var embd = new Discord.RichEmbed()
							.setTitle(val_guild.name)
							.addField("Channel", guild_chan,true)
							.setFooter("Billosh Scheduler")
							.setTimestamp()
							.setImage(val_guild_pic)
							.setDescription(element.announcement);
							jobList.forEach(function(job){
								if (job.name == `JobID: ${element.id}`){
									foundJob = true;
								}
							});
							if  (foundJob == false) {
								var j = schedule.scheduleJob(`JobID: ${element.id}`,`${element.minute} ${element.hour} * * ${element.day}`, function()
								{
									// console.log(chan_mems);
									chan_mems.forEach(function(member){
										// // console.log(member);
										if(member.user.bot == false){
											console.log(`person ${member} everyone ${chan_mems}`);
											member.send(embd);
										}
									});
								});
								jobList.push(j);

							}
							foundJob = false;
						});
					}

					});
				};
			});
		});
	});
});

// client.login(config.token);
client.login(token);
// // console.log(client.fetchVoiceRegions());
