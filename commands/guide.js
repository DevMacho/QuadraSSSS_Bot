const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가이드')
		.setDescription('QuadraSSSS API의 사용 방법을 알려드립니다.'),
	async execute(interaction) {
		const embed = {
			color: 0xf5f5f5,
			title: '📝 QuadraSSSS API 사용 가이드',
			description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
			fields: [
				{
					name: '🤖 봇 요청량 증가',
					value: "**GET** | `/addrequestamount/[봇 아이디]`",
				},
				{
					name: '📈 봇 참여 서버 수 설정',
					value: "**GET** | `/updateServerAmount/[봇 아이디]/[서버 개수]`",
				},
				{
					name: '🙍‍♂️ 유저 수 설정',
					value: "**GET** | `/updateUserAmount/[봇 아이디]/[유저 수]`",
				},
				{
					name: '❤ 한디리 하트 수 설정',
					value: "**GET** | `/updateHeartAmount/[봇 아이디]/[하트 개수]`",
				},
			],
			footer: {
				text: 'QuadraSSSS'
			},
		};
		await interaction.reply({ embeds: [embed]})
	},
};