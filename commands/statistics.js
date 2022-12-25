const { SlashCommandBuilder } = require('discord.js');
const ChartJsImage = require("chartjs-to-image")
const axios = require('axios');

require('dotenv').config()

async function getBotData(botId) {
	return new Promise(resolve => {
		axios.get(`${process.env.API_URL}/botData/${botId}`)
		.then((response) => {
			resolve(response.data)
		  })
		.catch((error) => {
			resolve(undefined)
		})
	})
}

const labels = [-30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18,
                -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4,
                -3, -2, -1, 0]

module.exports = {
    data: new SlashCommandBuilder()
		.setName('통계')
		.setDescription('봇에 대한 통계를 받아옵니다.')
		.addStringOption(option => {
			return option.setName('봇아이디')
				.setDescription('당신의 봇 ID를 입력해주세요.')
				.setRequired(true)
        })
        .addStringOption(option => {
			return option.setName('종류')
                .setDescription('조회하고 싶은 통계 자료의 종류를 선택해주세요.')
                .setRequired(true)
                .addChoices(
                    { name: '요청량', value: 'request' },
                    { name: '서버수', value: 'server' },
                    { name: '유저수', value: 'user'},
                    { name: '한디리하트', value: 'heart'},
                )
		}),
	async execute(interaction) {
		const botId = interaction.options.getString('봇아이디')
        const type = interaction.options.getString('종류')
        const botDataResult = await getBotData(botId)
        if (!botDataResult) {
            const embed = {
				color: 0xe82c2c,
				title: '⛔ 해당 봇은 등록되지 않은 봇입니다.',
				description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
				footer: {
					text: 'QuadraSSSS'
				},
			};
            await interaction.reply({ embeds: [embed] })
            return
        }
        const parsedBotDataResult = JSON.parse(botDataResult)
        let dataType = parsedBotDataResult.requestAmount
        let typeKor = "30일간 요청량"
        if (type === "server") {
            dataType = parsedBotDataResult.serverAmount
            typeKor = "30일간 참여 서버 수"
        } else if (type === "user") {
            dataType = parsedBotDataResult.userAmount
            typeKor = "30일간 유저 수"
        } else if (type === "heart") {
            dataType = parsedBotDataResult.heartAmount
            typeKor = "30일간 하트 수"
        }
        console.log(dataType)
        const data = {
            labels: labels,
            datasets: [{
                label: typeKor,
                data: dataType,
                borderColor: "rgba(191, 21, 21, 1)",
                backgroundColor: "rgba(191, 21, 21, 0.2)",
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                tension: 10
            }]
          }
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'QuadraSSSS'
                    }
                }
            },
        }

        const stockChart = new ChartJsImage()
        stockChart.setConfig(config)
    
        await interaction.reply(`📊 **${typeKor}**에 대한 통계자료를 전송합니다. (시간이 조금 걸릴 수도 있습니다.)`)
        const imgUrl = await stockChart.getShortUrl()
        await interaction.channel.send(imgUrl)
	}
} 