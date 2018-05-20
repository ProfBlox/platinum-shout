// DEPENDANCIES
let Discord = require('discord.js');
let roblox = require('roblox-js');
let bot = new Discord.Client();

// LOGIN INFO
let username = "FlairHotelsBot"; // ROBLOX
let password = "FlairHotels"; // ROBLOX

// MISC
let prefix = "!" // Prefix used for the command
let GroupId = 4040978;

// COMMAND

bot.on("message", async message => { // Event runs when there is a new message
if(message.author.bot) return; // Here we check if the message sender is the bot, if it is, it returns and does not carry any further.
if(message.content.indexOf(prefix) !== 0) return; // Checks if the message has the Prefix

// Here we separate our "command" and our "arguments/args" for the command. 
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

// Checks if the command is matching the provided string

if(command === "shout") {
    if(!message.member.roles.some(r=>["High Ranks"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
  roblox.login(username, password)
  .then(function () {
    const shoutMSG = args.join(" "); // Joins the arguments minus prefix to form the message to be shouted
        roblox.shout(GroupId, shoutMSG);
        console.log(`Shouted ${shoutMSG}`); // OPTIONAL - Logs specified string to the console
        message.reply(`Shouted ${shoutMSG} to the group.`) // OPTIONAL - Sends a message to the channe
  })
.catch(function (err) { // Catches any errors with the function
    console.error(err.stack);
    });
  }
})

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

bot.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
    	var username = args[1]
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
					} else {
						message.channel.send(`${id} is rank ${rank} and promotable.`)
						roblox.promote(groupId, id)
						.then(function(roles){
							message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
						}).catch(function(err){
							message.channel.send("Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

bot.login(process.env.token) // Logs into Discord
