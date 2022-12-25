const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config()

async function addNotificationChannel(botId, channelId) {
	return new Promise(resolve => {
		axios.get(`${process.env.API_URL}/addNotificationChannel/${botId}/${channelId}`)
		.then((response) => {
			resolve(response.data.message)
		  })
		.catch((error) => {
			console.log(error)
			resolve(undefined)
		})
	})
}


module.exports = {
    data: new SlashCommandBuilder()
		.setName('공지채널')
		.setDescription('봇이 다운됐을 때 자동으로 공지를 보낼 채널을 추가합니다.')
		.addStringOption(option => {
			return option.setName('봇아이디')
				.setDescription('당신의 봇 ID를 입력해주세요.')
				.setRequired(true)
        })
        .addStringOption(option => {
			return option.setName('채널아이디')
				.setDescription('추가할 채널의 ID를 입력해주세요.')
				.setRequired(true)
		}),
	async execute(interaction) {
		const botId = interaction.options.getString('봇아이디')
		const channelId = interaction.options.getString('채널아이디')
		const addNotificationChannelResult = await addNotificationChannel(botId, channelId)
		if (addNotificationChannelResult === "Notification Channel List Updated") {
			const embed = {
				color: 0x2ce82f,
				title: '✅ 공지 채널 추가가 완료되었습니다.',
				description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
				fields: [
					{
						name: '🤖 봇 ID',
						value: botId,
						inline: true,
					},
					{
						name: '📢 채널 ID',
						value: channelId,
						inline: true,
					},
				],
				footer: {
					text: 'QuadraSSSS'
				},
			};
			await interaction.reply({ embeds: [embed]})
		} else {
			const embed = {
				color: 0xe82c2c,
				title: '⛔ 해당 봇은 등록되지 않은 봇입니다.',
				description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
				footer: {
					text: 'QuadraSSSS'
				},
			};
			await interaction.reply({ embeds: [embed]})
		}
	}
} 