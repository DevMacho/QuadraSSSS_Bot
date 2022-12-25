const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`로그인 완료! | ${new Date()}`)
        client.user.setActivity("Safe Security Statistics Solution")
	},
}