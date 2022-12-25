const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config()

async function addDeveloperRequest(botId, devId) {
	return new Promise(resolve => {
		axios.get(`${process.env.API_URL}/addDeveloper/${botId}/${devId}`)
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
		.setName('개발자추가')
		.setDescription('봇에 개발자를 추가합니다.')
		.addStringOption(option => {
			return option.setName('봇아이디')
				.setDescription('당신의 봇 ID를 입력해주세요.')
				.setRequired(true)
        })
        .addStringOption(option => {
			return option.setName('개발자아이디')
				.setDescription('추가할 개발자의 ID를 입력해주세요.')
				.setRequired(true)
		}),
	async execute(interaction) {
        const botId = interaction.options.getString('봇아이디')
		const devId = interaction.options.getString('개발자아이디')
        const addDeveloperResult = await addDeveloperRequest(botId, devId)
        console.log(addDeveloperResult)
		if (addDeveloperResult === "Developer List Updated") {
			const embed = {
				color: 0x2ce82f,
				title: '✅ 개발자 추가가 완료되었습니다.',
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