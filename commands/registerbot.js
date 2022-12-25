const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config()

async function registerRequest(botId, devId) {
	return new Promise(resolve => {
		axios.get(`${process.env.API_URL}/register/${botId}/${devId}`)
		.then((response) => {
			resolve(response.data)
		  })
		.catch((error) => {
			console.log(error)
			resolve(undefined)
		})
	})
}


module.exports = {
    data: new SlashCommandBuilder()
		.setName('봇등록')
		.setDescription('자신의 봇을 등록합니다.')
		.addStringOption(option => {
			return option.setName('봇아이디')
				.setDescription('당신의 봇 ID를 입력해주세요.')
				.setRequired(true)
		}),
	async execute(interaction) {
		const botId = interaction.options.getString('봇아이디')
		const devId = interaction.user.id
		const registerResult = await registerRequest(botId, devId)
		if (registerResult === "Created") {
			const embed = {
				color: 0x2ce82f,
				title: '✅ 봇 등록이 완료되었습니다.',
				description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
				fields: [
					{
						name: '🤖 봇 ID',
						value: botId,
						inline: true,
					},
					{
						name: '😎 개발자 ID',
						value: devId,
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
				title: '⛔ 오류가 발생했습니다.',
				description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
				footer: {
					text: 'QuadraSSSS'
				},
			};
			await interaction.reply({ embeds: [embed]})
		}
	}
} 