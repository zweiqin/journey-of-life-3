<template>
	<view class="gold-butler">
		<!-- 导航栏 -->
		<view class="navbar">
			<image src="../../../static/images/center/back.png" mode="" @click="handleBack" />
			<view class="navs" v-if="status == 2">
				<view class="item" v-for="item in navs" :key="item.value" :class="{ active: currentTab === item.value }"
					@click="handleClick(item)">{{ item.name
					}}</view>
			</view>
			<view class="navs" v-if="status == 1">
				<view class="item" v-for="item in navs1" :key="item.value" :class="{ active: currentTab === item.value }"
					@click="handleClick(item)">{{ item.name
					}}</view>
			</view>
		</view>
		<!-- 中间区域 -->
		<!--已开通-->
		<view class="main" v-show="currentTab === 1" v-if="this.status == 2">
			<!-- <view class="notyet" v-if="status == 1">暂未开通权益</view> -->
			<view class="rect">
				<view class="left-yellow"></view>
				<view class="content">
					<view class="c-name">团蜂家庭小卫士会员</view>
					<view class="c-service">享受4大服务</view>
					<view class="c-time">2023-02-18 至 2024-02-28</view>
				</view>
				<view class="open1">已开通</view>
				<!-- <view class="open2" v-if="status == 1" @click="handleToOpen">
					<view class="money">￥299</view>
					<view class="go">立即开通</view>
				</view> -->
			</view>

			<view class="main-service" v-for="(value, key) in myServerList" :key="key">
				<view class="main-service-top">
					<view class="logo-list">
						<image src="../../../static/images/center/logo.png" mode="" />
						<text>{{ key }}</text>
					</view>
				</view>
				<view class="main-service-text" v-if="value.type === 1">
					<view class="name">
						享受<text>4</text>大服务
					</view>
				</view>
				<view class="main-service-item" v-for="item in value.children" :key="item.id">
					<image src="../../../static/images/user/vip.png" mode="" />
					<view class="text">{{ item.serverContent }}</view>
					<view class="order" :style="getOrderBtnStyle(value, item)" @click="handleToBook(value, item)">预约</view>
				</view>
				<!-- <view class="main-service-care">注:(以上服务不含更换配件费用，水电检修服务不含水电改造)</view> -->

				<!-- {{ item }} -->
			</view>

			<view class="explain">
				<view class="explain-name">
					平台一切权益解释权归团蜂科技<text>《权益说明》</text>
				</view>
			</view>
		</view>
		<!--未开通-->
		<view class="main" v-show="currentTab === 1" v-if="this.status == 1">
			<view class="notyet">暂未开通权益</view>
			<view class="rect">
				<view class="left-yellow"></view>
				<view class="content">
					<view class="c-name">团蜂家庭小卫士会员</view>
					<view class="c-service">享受4大服务</view>
					<view class="c-time">2023-02-18 至 2024-02-28</view>
				</view>
				<!-- <view class="open1" v-if="status == 2">已开通</view> -->
				<view class="open2" @click="handleToOpen">
					<view class="money">￥299</view>
					<view class="go">立即开通</view>
				</view>
			</view>

			<view class="main-service">
				<view class="main-service-top">
					<view class="logo-list">
						<image src="../../../static/images/center/logo.png" mode="" />
						<text>{{ '团蜂家庭小卫士会员' }}</text>
					</view>
				</view>
				<view class="main-service-text">
					<view class="name">
						享受<text>4</text>大服务
					</view>
				</view>
				<view class="main-service-item" v-for="item in service" :key="item.value">
					<image src="../../../static/images/user/vip.png" mode="" />
					<view class="text">{{ item.name }}</view>
					<!-- <view class="order" :style="getOrderBtnStyle(value, item)" @click="handleToBook(value, item)">预约</view> -->
				</view>
				<!-- <view class="main-service-care">注:(以上服务不含更换配件费用，水电检修服务不含水电改造)</view> -->

				<!-- {{ item }} -->
			</view>

			<view class="explain">
				<view class="explain-name">
					平台一切权益解释权归团蜂科技<text>《权益说明》</text>
				</view>
			</view>
		</view>

		<!--已使用-->
		<view v-show="currentTab === 2">
			<view class="rect1" v-for="item in recordList" :key="item.id">
				<view class="left-yellow"></view>
				<view class="content">
					<view class="c-name">{{ item.serverContent }}</view>
					<view class="c-service">{{ item.serverName }}</view>
					<view class="c-time">使用时间: <view>{{ formatTime(new Date(item.updateTime)) }}</view>
					</view>
				</view>
				<view class="open">
					<image src="../../../static/images/center/already.png" mode="scaleToFill" />
				</view>
			</view>
		</view>
		<!--未使用-->
		<view v-show="currentTab === 3">
			<block v-for="(value, key, index) in notUseServeList" :key="index">
				<view class="rect2" v-for="serve in value" :key="serve.serverContent">
					<view class="left-yellow"></view>
					<view class="content">
						<view class="c-name">{{ serve.serverContent }}</view>
						<view class="c-service">{{ key }}</view>
						<!-- <view class="c-time">使用时间: <view>{{ item.updateTime }}</view>
					</view> -->
					</view>
					<view class="open">
						<image src="../../../static/images/center/nouse.png" mode="scaleToFill" />
					</view>
				</view>
			</block>

		</view>
		<!-- 底部区域 -->
		<view class="foot" v-if="status == 1">
			<view class="f-left">仅需: <text>￥{{ 299 }}</text></view>
			<view class="f-right" @click="handleToOpen">立即开通</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { formatTime } from '../../../utils'
import { navs, navs1, service, contents, calcUseNumber } from './data'
import { userIsPurchaseApi, getSetMealListApi, getServerProjectListApi } from '../../../api/user'
import { getUserId } from 'utils'
import { serveList } from 'logistics/config'
export default {
	name: "Gold-butler",
	props: {

	},
	data() {
		return {
			navs,
			navs1,
			service,
			contents,
			currentTab: 1,
			status: '',
			serverContent: "",
			notUseList: [],
			recordList: [],
			item: '',
			// my
			myServerList: {},
			vip2Numbers: {},
			vip2ServeList: [],
			allUsed: '',
			notUseServeList: []
		}
	},

	

	methods: {
		formatTime,
		handleClick(item) {
			this.currentTab = item.value
			console.log(item);
			if (item.value === 3) {
				const notUseServeList = {}
				for (const serverName in this.myServerList) { // TODO: 下一位有缘人,优化一下
					const curentServeItems = this.myServerList[serverName].children

					if (this.myServerList[serverName].type === 1) {
						curentServeItems.forEach(serve => {
							if (this.vip2Numbers[serve.serverContent] || serve.serverContent.includes('全年')) {
								if (notUseServeList[serverName]) {
									notUseServeList[serverName].push(serve)
								} else {
									notUseServeList[serverName] = [serve]
								}
							}
						})
					} else if (this.myServerList[serverName].type === 2) {
						curentServeItems.forEach(serve => {
							if (!serve.recordList.length) {
								if (notUseServeList[serverName]) {
									notUseServeList[serverName].push(serve)
								} else {
									notUseServeList[serverName] = [serve]
								}
							}
						})
					}
				}
				this.notUseServeList = notUseServeList

				console.log('未使用', this.notUseServeList);


			}
		},
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user',
			})
		},
		handleToOpen() {
			uni.navigateTo({ url: '/community-center/vip-center/vip-detail?type=2' })
		},
		handleToBook(value, item) {


			// uni.showLoading({
			// 	title: '预约中...',
			// 	mask: true
			// })
			let currentServe = null;
			console.log(value, item);
			if (value.type === 1) {
				console.log(this.vip2ServeList);

				if (!this.vip2Numbers[item.serverContent] && !item.serverContent.includes('全年')) {
					this.ttoast({
						type: 'fail',
						title: '服务次数不足'
					})
					return
				}

				currentServe = this.vip2ServeList.find(serve => {
					const usedServeList = serve.recordList.map(item1 => item1.serverContent)
					return !usedServeList.includes(item.serverContent) || item.serverContent.includes('全年')
				})
				uni.hideLoading()

				if (!currentServe && !item.serverContent.includes('全年')) {
					this.ttoast({
						type: 'fail',
						title: '服务次数不足'
					})
					return
				}
				currentServe.serverContent = item.serverContent // TODO: 团蜂家庭小卫士下单选择的是单个还是全部的?
			} else {
				currentServe = value.children.find(serve => serve.serverContent === item.serverContent)

				uni.hideLoading()

				if (currentServe.number - currentServe.usedNumber <= 0 && !item.serverContent.includes('全年')) {
					this.ttoast({
						type: 'fail',
						title: '服务次数不足'
					})

					return
				}
			}

			console.log(currentServe);

			uni.navigateTo({ url: `/user/sever/goldButler/orderBook?orderInfo=${JSON.stringify(currentServe)}` })
		},
		//查询用户是否购买过团蜂家庭小卫士套餐
		async userIsPurchase() {
			const res = await userIsPurchaseApi({
				userId: getUserId(),
				// userId: 565,
				price: 299,
			})
			this.data = res.data
			console.log("查询", this.data);
			if (this.data === null) {
				this.status = 1
				console.log("未开通", this.status);
			}
			else {
				this.status = 2
				console.log('已开通', this.status);
			}
		},
		//获取套餐列表
		async getSetMealList() {
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// })
			const res = await getSetMealListApi({
				userId: getUserId(),
				// userId: 565,
			})
			// this.getdata = res.data

			// console.log("获取", this.getdata);
			// this.recordList = this.getdata[0].recordList
			// console.log('已使用', this.recordList);
			// this.serverContent = this.getdata[0].serverContent.split(',')
			// console.log("团蜂家庭小卫士服务列表", this.serverContent);
			const allServeListData = res.data.filter(item => item.serverId)
			this.recordList = (res.data.filter(item => item.recordList.length).map(item => item.recordList)).flat(Infinity)
			console.log('已使用', this.recordList);
			// this.updateTime = this.recordList[0].updateTime
			// console.log('时间',this.updateTime);
			const serverList = {}
			for (const server of allServeListData) {
				if (!serverList[server.serverName]) {
					serverList[server.serverName] = [server]
				} else {
					serverList[server.serverName].push(server)
				}
			}

			const findServerList = {}
			for (const serverName in serverList) {
				const serverItems = serverList[serverName]
				if (serverItems[0].serverId === 2) {
					let obj = {};
					serverItems = serverItems.reduce((newArr, next) => {
						if (obj[next.serverContent]) {
							// newArr[0].number++
							const currentServeItem = newArr.find(item => item.serverContent === next.serverContent)
							currentServeItem.number++
							currentServeItem.usedNumber -= next.recordList.length
						} else {
							obj[next.serverContent] = true
							next.number = 1
							next.usedNumber = next.recordList.length
							newArr.push(next)
						}
						return newArr;
					}, []);

					findServerList[serverItems[0].serverName] = { children: serverItems, type: serverItems[0].serverId }

				} else if (serverItems[0].serverId === 1) {
					this.vip2ServeList = serverItems
					this.vip2Numbers = calcUseNumber(serverItems)
					findServerList[serverItems[0].serverName] = { children: serverItems[0].serverContent.split(',').map(item => ({ serverContent: item })), type: serverItems[0].serverId }
				}
			}

			console.log(this.vip2Numbers);

			this.myServerList = findServerList

			uni.hideLoading()

		},
		//获取会员套餐列表
		// async getServerProjectList() {
		// 	const res = await getServerProjectListApi({

		// 	})
		// 	this.data = res.data
		// 	console.log("会员套餐列表", this.data);

		// },

		// 获取
		getOrderBtnStyle(value, item) {
			if (value.type === 1 && !this.vip2Numbers[item.serverContent] && !item.serverContent.includes('全年')) {
				return {
					backgroundColor: '#ccc'
				}
			}
		}

	},
	mounted() {
		this.userIsPurchase()
		this.getSetMealList()
		// this.getServerProjectList()
	},
	created() { },
	onLoad(options) {
		console.log(options);

	},
}
</script>

<style lang="scss" scoped>
.gold-butler {
	width: 100vw;
	min-height: 100vh;
	background: #F6F6F5;
	padding-bottom: 140upx;

	.navbar {
		display: flex;
		align-items: center;
		padding: 36upx 0;
		border-radius: 0upx 0upx 24upx 24upx;
		background: #FFFFFF;

		image {
			width: 24upx;
			height: 48upx;
			padding-left: 40upx;
			padding-right: 62upx;
		}

		.navs {
			flex: 1;
			display: flex;
			justify-content: space-between;
			padding-right: 100upx;

			.item {
				position: relative;
				color: #8f8d85;
				// margin-right: 40upx;

				&::after {
					content: '';
					display: block;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: -16upx;
					width: 0;
					height: 8upx;
					border-radius: 10upx;
					background-color: #ffc117;
					transition: all 350ms ease-in;
				}

				&.active {
					color: #141000;
					font-weight: 500;

					&::after {
						width: 40upx;
					}
				}
			}
		}
	}



	.main {
		.notyet {
			font-size: 28upx;
			color: #999999;
			text-align: center;
			margin-top: 68upx;
			padding-bottom: 20upx;
		}

		.rect {
			position: relative;
			display: flex;
			margin: 20upx 20upx 50upx 20upx;
			// width: 100%;
			height: 188upx;
			border-radius: 24upx;
			background: rgba(255, 255, 255, 0.98);

			&::after {
				content: '';
				display: block;
				position: absolute;
				top: -12upx;
				right: 206upx;
				width: 24upx;
				height: 24upx;
				background-color: #f6f6f5;
				border-radius: 50%;
			}

			&::before {
				content: '';
				display: block;
				position: absolute;
				bottom: -12upx;
				right: 206upx;
				width: 24upx;
				height: 24upx;
				background-color: #f6f6f5;
				border-radius: 50%;
			}

			.left-yellow {
				width: 24upx;
				height: 188upx;
				border-radius: 12upx 0px 0px 12upx;
				background: #FFC117;
			}

			.content {
				padding-left: 24upx;
				display: flex;
				flex-direction: column;
				flex: 1;

				.c-name {
					padding-top: 26upx;
					font-size: 32upx;
					font-weight: 500;
					line-height: 54upx;
					color: #141000;
				}

				.c-service {
					font-size: 26upx;
					color: #605D52;
					line-height: 40upx;
				}

				.c-time {
					padding-top: 8upx;
					font-size: 24upx;
					color: #B3B2AD;
					line-height: 36upx;
				}
			}

			.open1 {
				width: 218upx;
				font-size: 42upx;
				font-weight: bold;
				line-height: 46upx;
				color: #FFC117;
				display: flex;
				justify-content: center;
				align-items: center;
				border-left: 1upx dashed #D8D8D8;
			}

			.open2 {
				width: 218upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.money {
					width: 140upx;
					font-size: 42upx;
					font-weight: bold;
					color: #FFC117;
					margin-bottom: 16upx;
				}

				.go {
					width: 140upx;
					height: 48upx;
					border-radius: 24upx;
					background: #FFC117;
					font-size: 24upx;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.main-service {
			margin: 0 20upx;
			// height: 706upx;
			border-radius: 24upx;
			background: #FFFFFF;
			margin-bottom: 40upx;


			.main-service-top {
				display: flex;
				justify-content: center;

				.logo-list {
					width: 300upx;
					height: 88upx;
					border-radius: 0upx 0upx 24upx 24upx;
					background: linear-gradient(235deg, #EDB24C 18%, #FCD188 70%);
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 56upx;
						height: 56upx;
					}

					text {
						margin-left: 20upx;
						font-size: 32upx;
						font-weight: 500;
						color: #000000;
					}
				}
			}

			.main-service-text {
				padding-top: 16upx;
				padding-bottom: 50upx;
				display: flex;
				justify-content: center;

				.name {
					font-size: 28upx;
					font-weight: 500;
					color: #3D3D3D;
					width: 180upx;
					position: relative;
					text-align: center;

					&::after {
						content: '';
						width: 120upx;
						height: 1upx;
						background-color: #000000;
						display: block;
						position: absolute;
						top: 24upx;
						right: 226upx;
					}

					&::before {
						content: '';
						width: 120upx;
						height: 1upx;
						background-color: #000000;
						display: block;
						position: absolute;
						top: 24upx;
						left: 226upx;
					}

					text {
						font-size: 36upx;
						font-weight: 500;


					}
				}

			}

			.main-service-item {
				display: flex;
				align-items: center;
				padding: 0 44upx 40upx 36upx;

				image {
					width: 56upx;
					height: 56upx;
				}

				.text {
					padding-left: 20upx;
					font-size: 28upx;
					color: #3D3D3D;
					flex: 1;
				}

				.order {
					width: 140upx;
					height: 48upx;
					border-radius: 24upx;
					background: #EDB24C;
					font-size: 28upx;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.main-service-care {
				font-size: 24upx;
				color: #999999;
				text-align: center;
				padding-bottom: 60upx;
			}

		}

		.explain {
			padding-top: 44upx;
			// padding-bottom: 50upx;
			display: flex;
			justify-content: center;
			white-space: nowrap;

			.explain-name {
				font-size: 24upx;
				color: #3D3D3D;
				width: 480upx;
				position: relative;
				text-align: center;

				&::after {
					content: '';
					width: 40upx;
					height: 1upx;
					background-color: #000000;
					display: block;
					position: absolute;
					top: 16upx;
					right: -60upx;
				}

				&::before {
					content: '';
					width: 40upx;
					height: 1upx;
					background-color: #000000;
					display: block;
					position: absolute;
					top: 16upx;
					left: -70upx;
				}

				text {
					color: blue;


				}
			}

		}
	}

	.rect1 {
		position: relative;
		display: flex;
		margin: 20upx 20upx 50upx 20upx;
		// width: 100%;
		height: 220upx;
		border-radius: 24upx;
		background: rgba(255, 255, 255, 0.98);

		&::after {
			content: '';
			display: block;
			position: absolute;
			top: -12upx;
			right: 206upx;
			width: 24upx;
			height: 24upx;
			background-color: #f6f6f5;
			border-radius: 50%;
		}

		&::before {
			content: '';
			display: block;
			position: absolute;
			bottom: -12upx;
			right: 206upx;
			width: 24upx;
			height: 24upx;
			background-color: #f6f6f5;
			border-radius: 50%;
		}

		.left-yellow {
			width: 24upx;
			height: 220upx;
			border-radius: 12upx 0px 0px 12upx;
			background: #FFC117;
		}

		.content {
			padding-left: 24upx;
			display: flex;
			flex-direction: column;
			flex: 1;

			.c-name {
				padding-top: 26upx;
				font-size: 32upx;
				font-weight: 500;
				line-height: 54upx;
				color: #141000;
			}

			.c-service {
				font-size: 26upx;
				color: #605D52;
				line-height: 40upx;
			}

			.c-time {
				padding-top: 8upx;
				font-size: 24upx;
				color: #B3B2AD;
				line-height: 36upx;
			}
		}

		.open {
			width: 218upx;
			font-size: 42upx;
			font-weight: bold;
			line-height: 46upx;
			color: #FFC117;
			display: flex;
			justify-content: center;
			align-items: center;
			border-left: 1upx dashed #D8D8D8;

			image {
				width: 208upx;
				height: 208upx;
			}
		}

	}

	.rect2 {
		position: relative;
		display: flex;
		margin: 20upx 20upx 50upx 20upx;
		// width: 100%;
		height: 220upx;
		border-radius: 24upx;
		background: rgba(255, 255, 255, 0.98);

		&::after {
			content: '';
			display: block;
			position: absolute;
			top: -12upx;
			right: 206upx;
			width: 24upx;
			height: 24upx;
			background-color: #f6f6f5;
			border-radius: 50%;
		}

		&::before {
			content: '';
			display: block;
			position: absolute;
			bottom: -12upx;
			right: 206upx;
			width: 24upx;
			height: 24upx;
			background-color: #f6f6f5;
			border-radius: 50%;
		}

		.left-yellow {
			width: 24upx;
			height: 220upx;
			border-radius: 12upx 0px 0px 12upx;
			background: #FFC117;
		}

		.content {
			padding-left: 24upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;

			.c-name {
				// padding-top: 26upx;
				font-size: 32upx;
				font-weight: 500;
				line-height: 54upx;
				color: #141000;
			}

			.c-service {
				font-size: 26upx;
				color: #605D52;
				line-height: 40upx;
			}

			.c-time {
				padding-top: 8upx;
				font-size: 24upx;
				color: #B3B2AD;
				line-height: 36upx;
			}
		}

		.open {
			width: 218upx;
			font-size: 42upx;
			font-weight: bold;
			line-height: 46upx;
			color: #FFC117;
			display: flex;
			justify-content: center;
			align-items: center;
			border-left: 1upx dashed #D8D8D8;

			image {
				width: 208upx;
				height: 208upx;
			}
		}

	}

	.foot {
		padding: 0upx 20upx 0upx 44upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.f-left {
			font-size: 28upx;

			text {
				font-size: 36upx;
				font-weight: 500;
				padding-left: 12upx;
			}
		}

		.f-right {
			width: 308upx;
			height: 88upx;
			border-radius: 44upx;
			background: #FF0037;
			font-size: 32upx;
			font-weight: 500;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

}
</style>
