<template>
	<view class="community-detail">
		<view class="head">
			<view class="title-list">
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png" alt=""
					class="return" @click="handleBack" />
				<view class="title" @click="handleBack">
					<text class="page-title">{{ title }}</text>
				</view>
				<view class="location">
					<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iglo65306wogezn1kjmf.png" alt=""
						class="icon" />
					<TuanLocation>
						<text class="locale">{{
							$store.getters.currentCity || '龙江镇'
						}}</text>
					</TuanLocation>
				</view>
			</view>
			<view class="goods">

				<!-- <image :src="
					serverUrl ||
					'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wjor6av7ldr00pua8b6q.png'
				" alt="" class="img" @click="preview(serverUrl)" /> -->

				<Carousel :isLazyLoad="false" :list="serverUrls.length == 0 ? [serverUrl] : serverUrls" class="img" :radius="0"
					:height="270" :top="-40">
				</Carousel>


				<image src="../static/images/con-center/imagebg.png" mode="" class="imagebg" />
				<view class="goods-name">{{ title }}</view>
				<view class="price-name">{{ isArtificial ? '优惠价' : '起步价' }}</view>
				<view class="goods-price" v-if="!isArtificial">
					<view class="logo">￥<text>{{ startPrice || '30' }}</text></view>/起
				</view>
				<view class="goods-price" v-if="isArtificial">
					<view class="logo">￥<text>{{ serverPrice }}</text></view>
				</view>
			</view>
			<!-- <view class="range" v-if="!isArtificial">￥98~128</view> -->
			<view class="name-list">
				<view class="name-detail">
					<view class="name">{{ title }}</view>

					<view class="content">{{ serverIntroduction }}</view>

				</view>
				<view class="a">
					<TuanWxShare ref="tuanWxShareRef" @click="handleShareServe">
						<view class="share">
							<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/mi4jzqbzsb31mge61s18.png"
								alt="" class="image" />
							<view class="text">分享</view>
						</view>
					</TuanWxShare>
				</view>
			</view>


			<view class="type" v-if="isArtificial">一口价</view>
			<view class="type" v-if="!isArtificial">人工报价</view>
			<view v-if="isArtificial">
				<scroll-view scroll-x="true">
					<view class="price-list" ref="price-list">
						<item v-for="item in serviceDetail" :key="item.id" :class="{ active: item.id == currentTab }"
							@choose="switchTab(item)" :serverInfoName="item.serverInfoName" :serverPrice="item.serverPrice"
							:serverUnit="item.serverUnit" :isArtificial="item.isArtificial"></item>
					</view>
				</scroll-view>
			</view>
			<view class="start-price" v-if="!isArtificial">￥<text>{{ startPrice || '30' }}</text>/起</view>
		</view>
		<view class="add">
			<view class="add-list" @click="handleToAddress">
				<view class="left">
					<image src="../static/images/con-center/map-pin.png" mode="" class="left-logo" />
					<view class="left-address">{{ addressDetail || '请添加服务地址' }}</view>
				</view>
				<view class="right">
					<image src="../static/images/con-center/jump.png" mode="" class="jump" />
				</view>
			</view>
			<view class="kaitong">
				<image src="../static/images/con-center/open.png" mode="" class="open" v-if="type == 1" />
				<image src="../static/images/con-center/shut.png" mode="" class="close" v-if="type == 2" />
			</view>
		</view>
		<view class="mid">
			<view class="text-list">
				<view class="ensure">保障</view>
				<view class="poster">
					<text>保修60天</text>
					<text>快速响应</text>
					<text>计价器报价</text>
				</view>

				<!-- #ifdef H5 -->
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cofcgw5ox0ctbtqn1txr.png" alt=""
					class="more" />
				<!-- #endif -->

			</view>
		</view>
		<view class="body" id="norm">
			<!-- <view class="top">
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/e6r4nzkriag797mchd56.png" alt=""
					class="top-img" />
			</view> -->

			<view class="top-list">
				<view class="item" :class="{ active: currentMoveTab === 0 }" @click="toJump(0)">收费标准</view>
				<view class="item" :class="{ active: currentMoveTab === 1 }" @click="toJump(1)">服务内容</view>
				<view class="item" :class="{ active: currentMoveTab === 2 }" @click="toJump(2)">用户评价</view>
			</view>
			<charge :data="serviceDetail.chargeDetailsList"></charge>

			<view class="explain" v-if="chargeDescription">
				<view class="explain-title">收费说明:</view>
				<view class="explain-text">{{ chargeDescription
					|| '工程师上门后，因用户个人原因取消订单，需支付30元上门费；价格信息仅供参考，具体收费以工程师上门检测和用户沟通后报价为准。' }}</view>
			</view>

			<!-- <view class="background">
				<image src="../static/images/con-center/tfbg.png" mode="" class="bg" />
				<image src="../static/images/con-center/bg-logo.png" mode="" class="bg-logo" />
				<view class="bg-text"><text>{{ title }}</text><text>就找团蜂社区</text></view>
				<view class="bg-image">
					<image :src="serverUrl" mode="" class="bg-img" />
				</view>
				<image src="../static/images/con-center/girl.png" mode="" class="girl-img" />
			</view> -->

			<!-- <view class="mid-content">
				<view class="mid-text">您的{{ title }}</view>
				<view class="mid-text">我们<text>全心全意</text>解决</view>
			</view> -->

			<!-- <view class="serverContent-list" v-if="serverContent.length && serverContent.length > 1">
				<view class="serverContent" v-for="item in serverContent" :key="item">{{ item }}</view>
			</view> -->

			<view class="case-show" id="detail" v-if="serverInfo !== '<p><br></p>' && serverInfo !== '<p><br></p><p><br></p>'">
				<view class="show-img">
					<u-parse :content="goodsInfoDetail"></u-parse>
				</view>
			</view>

			<!-- <view class="middle">
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/48h3rr7tsuwxtkh0jpky.png" alt=""
					class="mid-img" />
			</view>
			<view class="process">
				<image src="../static/images/con-center/process.jpg" mode="" class="process-img" />
			</view>
			<view class="tips">
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iftnzg3gb548iy7p7n5b.png" alt=""
					class="img-tips" />
			</view> -->

		</view>
		<view class="other">
			<view class="other-service" v-for="item in moreService" :key="item.value"
				@click="handleToServiceListHome(item.value)">
				<view class="text">其他服务</view>
				<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/63apnwjyguuyva9itx9k.png" alt=""
					class="show" />
			</view>
		</view>
		<view class="foot">
			<view class="list">
				<view class="online">
					<!-- #ifdef H5 -->
					<img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/aivl8ag811bco1skdda2.png" alt=""
						class="seek" />
					<view class="name">在线咨询</view>
					<!-- #endif -->
				</view>


				<view class="order-list">
					<!-- <view class="join">加入需求清单</view> -->
					<view class="order" @click="handleToServiceOrderHome">{{ isArtificial ? '立即下单' : '立即预约' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Carousel from '../components/carousel'
import uParse from '../components/u-parse/u-parse.vue'
import { marked } from 'marked'
import { splitProject } from './componts/utile'
import { getConfigApi } from '../api/auth'
import item from '../community-center/componts/item'
import charge from '../community-center/componts/charge'
import { getServiceDetailApi } from '../api/community-center'
import { moreService } from '../pages/community-center/config'
import { USER_TOKEN } from '../constant'
import { getUserId } from '../utils'
import { getAdressDetailByLngLat } from '../utils/DWHutils'
import { getIsOpenServerAreaApi } from '../api/community-center'
// #ifdef H5
import share from '../utils/wxshare'
// #endif

export default {
	name: 'Community-detail',
	props: {},
	components: {
		item,
		charge,
		uParse,
		Carousel,
	},
	data() {
		return {
			currentMoveTab: 0,
			moreService,
			address: '',
			serviceDetail: [],
			id: '',
			serverTypeId: '',
			serverInfoName: '',
			serverInfoUrl: '',
			serverIntroduction: '',
			isArtificial: '',
			serverPrice: '',
			title: '',
			serverUnit: '',
			currentTab: '',
			length: '',
			serverUrl: '',
			serverUrls: [],
			index: '',
			priceType: '',
			startPrice: '',
			chargeDescription: '',
			serverInfo: '',
			chargeDetailsList: [],
			serverContent: '',
			addressDetail: '',
			type: '',
			addressInfo: '',
		}
	},
	methods: {
		splitProject,
		handleBack() {
			uni.navigateBack()
		},
		handleToServiceListHome(item) {
			console.log('更多服务分类列表', item)
			this.value = item
			uni.navigateTo({
				url: `/community-center/service-sort?value=${this.value}`,
			})
		},
		handleToAddress() {
			uni.navigateTo({ url: '/community-center/add-address' })
		},

		handleToServiceOrderHome() {
			//需要传 图片 价格 名称 单位
			// uni.navigateTo({ url: "../community-center/community-order" });
			// const let var

			uni.showToast({
				title: '请选择服务类型',
				icon: 'none',
				duration: 2000,
			})

			if (!this.isArtificial) {
				console.log('abc')
				uni.navigateTo({
					url: `/community-center/community-order?name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&imgUrl=${this.serverUrl}`,
				})
			} else {
				if (!this.serverPrice == 0) {
					uni.navigateTo({
						url: `/community-center/community-order?serverInfoUrl=${this.serverInfoUrl}&serverPrice=${this.serverPrice}&serverInfoName=${this.serverInfoName}&serverUnit=${this.serverUnit}&name=${this.title}&id=${this.serverTypeId}&priceType=${this.isArtificial}&detailId=${this.detailId}&imgUrl=${this.serverUrl}`,
					})
				} else {
					console.log('sb kuaixuan')
				}
			}
		},

		toJump(index) {
			this.currentMoveTab = index
			if (this.currentMoveTab == 0) {
				document.getElementById("norm").scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			} else if (this.currentMoveTab == 1) {
				document.getElementById("detail").scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			}

		},

		switchTab(item1) {
			console.log('12345', item1)
			this.currentTab = item1.id
			this.serverTypeId = item1.serverTypeId
			this.serverPrice = item1.serverPrice
			this.serverInfoName = item1.serverInfoName
			this.serverUnit = item1.serverUnit
			this.serverIntroduction = item1.serverIntroduction
			this.detailId = item1.id
			console.log('详情id', this.detailId)
		},

		//社区服务详情
		async getServiceDetail() {
			// this.serverTypeId=this.serviceDetail.serverTypeId;
			const res = await getServiceDetailApi({
				// serverTypeId: 109,
				serverTypeId: this.serverTypeId,
			})

			this.serviceDetail = res.data

			this.serviceDetail.chargeDetailsList = splitProject(res.data[0].chargeDetailsList)
			console.log('chargeDetailsList', this.serviceDetail.chargeDetailsList);

			this.currentTab = res.data[0].id
			this.switchTab(this.serviceDetail[0])
			console.log('666', this.serviceDetail)

			this.serverInfo = this.serviceDetail[0].serverInfo
			console.log('服务详情内容', this.serverInfo);


			this.isArtificial = this.serviceDetail[0].isArtificial
			this.length = this.serviceDetail.length
			console.log('是否一口价', this.isArtificial)
			// const type = this.isArtificial
			// console.log('type', type)
			// if (type === 'true') {
			// 	this.a = 1
			// } else {
			// 	this.a = 2
			// }

			this.serverIntroduction = this.serviceDetail[0].serverIntroduction
			console.log('介绍', this.serverIntroduction)

			this.serverUrl = this.serviceDetail[0].serverImageUrl.split(',').find(item => item)
			console.log('图片', this.serverUrl)

			this.serverUrls = this.serviceDetail[0].serverImageUrl.split(',').slice(1)
			console.log('轮播图', this.serverUrls)

			this.startPrice = this.serviceDetail[0].startPrice
			console.log('起步价', this.startPrice);

			this.chargeDescription = this.serviceDetail[0].chargeDescription
			console.log('收费说明', this.chargeDescription);

			this.serverContent = this.serviceDetail[0].serverContent.split('，')
			console.log('服务具体内容', this.serverContent);


			// this.serverInfo = this.serviceDetail[0].serverInfo
			// console.log('服务详情', this.serverInfo);

			// this.chargeDetailsList = this.serviceDetail[0].chargeDetailsList
			// console.log('项目数据', this.chargeDetailsList);



		},

		async getIsOpenServerArea() {
			const _this = this
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					getAdressDetailByLngLat(res.latitude, res.longitude).then(res => {
						if (res.status === '1') {
							console.log('1111', res)
							const result = res.regeocode
							_this.address =
								result.addressComponent.province +
								result.addressComponent.city +
								result.addressComponent.district
							console.log('this.address', _this.address)
							_this.a()
							_this.addressDetail = result.formatted_address
							console.log('addressDetail', _this.addressDetail)
						}
					})
				},
			})
		},

		async a() {
			const res = await getIsOpenServerAreaApi({
				address: this.address,

			})
			console.log('res', res)
			this.tips = res.data
			console.log('tips', this.tips)
			this.type = this.tips ? 1 : 2
			console.log('type', this.type)
		},


		//预览图
		preview(index) {
			console.log(index)
			let imgsArray = []
			imgsArray[0] = index

			uni.previewImage({
				urls: imgsArray,
				current: 0,
			})
		},

		previewImage(index) {
			console.log(index)
			let imgsArray = []
			imgsArray[0] = index

			uni.previewImage({
				urls: imgsArray,
				current: 0,
			})
		},

		// 微信分享
		// 点击分享
		handleShareServe(isQuit) {
			const _this = this
			const data = {
				data: {
					title: _this.title,
					desc: '售后质保·服务专业·极速退款·意外承包',
					link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/community-detail?id=${_this.serverTypeId}&serverNameThree=${_this.title}&serverImageUrl=${_this.serverUrl}`,
					imageUrl: _this.serverImageUrl,
				},
				successCb: () => { },
				failCb: () => { },
			}

			this.$refs.tuanWxShareRef.share(data, isQuit)
		},
	},

	computed: {
		goodsInfoDetail() {
			return this.serverInfo
				? marked(this.serverInfo)
				: ''
		},
	},

	created() { },
	onLoad(options) {
		this.serverTypeId = options.id
		this.title = options.serverNameThree
		uni.setNavigationBarTitle({
			title: this.title,
		})
		// this.serverUrl = options.serverImageUrl
		// #ifdef H5
		this.$nextTick(() => {
			this.handleShareServe(true)
		})
		// #endif
		this.getServiceDetail()
		this.getIsOpenServerArea()
	},
	onShow() {
		const info = uni.getStorageSync("guawyi8sa");
		console.log('info', info);
		if (info.address && info.addressDetail) {
			this.addressInfo = info.address + info.addressDetail;
			console.log('addressInfo', this.addressInfo);
		}


		this.addressDetail = this.addressInfo
		console.log('addressDetail', this.addressDetail);
		this.address = info.address
		console.log('address', this.address);
		this.a()
	}
}
</script>
<style lang="less" scoped>
.community-detail {
	background: #f7f8fa;

	.head {
		padding-top: 20upx;
		background: #ffffff;
		// padding-right: 20upx;
		box-sizing: border-box;

		.title-list {
			position: relative;
			display: flex;
			align-items: center;
			padding: 20upx 0upx 36upx 16upx;

			.return {
				width: 48upx;
				height: 48upx;
			}

			.title {
				// flex: 1;
				text-align: center;
				font-size: 36upx;
				font-weight: bold;
				color: #3d3d3d;
			}

			.location {
				// width: 124upx;
				height: 40upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				right: 20upx;

				.icon {
					width: 28upx;
					height: 28upx;
				}

				.address {
					font-size: 28upx;
					color: rgba(0, 0, 0, 0.85);
				}
			}
		}

		.goods {
			// margin: 0upx 82upx;
			width: 100%;
			height: 640upx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.img {
				width: 100%;
				// height: 340upx;
				position: absolute;
				z-index: 0;

				/deep/.tui-lazyload__box {
					background-color: #ffffff !important;
				}
			}

			.imagebg {
				width: 100%;
				height: 100%;

			}

			.goods-name {
				white-space: nowrap;
				position: absolute;
				bottom: 28upx;
				left: 68upx;
				font-size: 42upx;
				font-weight: bold;
				color: #FFFFFF;
				width: 380upx;
				height: 94upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.price-name {
				position: absolute;
				bottom: 112upx;
				right: 74upx;
				font-size: 28upx;
				font-weight: bold;
				color: #0519D4;
				width: 150upx;
				height: 40upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.goods-price {
				position: absolute;
				display: flex;
				align-items: baseline;
				justify-content: center;
				white-space: nowrap;
				color: #FFFFFF;
				font-size: 24upx;
				font-weight: bold;
				right: 80upx;
				bottom: 20upx;
				width: 150upx;
				height: 84upx;

				.logo {
					font-size: 42upx;
				}

				text {
					font-size: 52upx;
				}
			}
		}

		.range {
			font-size: 46upx;
			font-weight: bold;
			line-height: 70upx;
			color: #FC4023;
			padding: 18upx 0 0 24upx;
			border-top: 2upx solid #F1F1F0;
		}

		.name-list {
			display: flex;
			justify-content: space-between;
			padding-left: 30upx;
			padding-top: 30upx;

			.name-detail {
				.name {
					font-size: 32upx;
					font-weight: bold;
					color: #141000;
				}

				.content {
					padding-top: 12upx;
					font-size: 28upx;
					line-height: 36upx;
					color: #8F8D85;
				}

			}

			.a {
				width: 120upx;
				height: 80upx;
				display: flex;
				align-items: flex-end;

				.share {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 100upx 0upx 0upx 100upx;
					background: #f7f8fa;
					width: 120upx;
					height: 50upx;

					.image {
						width: 40upx;
						height: 40upx;
					}

					.text {
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}



		.type {
			margin-left: 30upx;
			padding-bottom: 20upx;
			padding-top: 10upx;
			font-size: 28upx;
			font-weight: bold;
			color: #3d3d3d;
			border-bottom: 1px solid #F1F1F0;
		}

		.price-list {
			padding-top: 30upx;
			padding-left: 30upx;
			padding-right: 30upx;
			padding-bottom: 30upx;
			white-space: nowrap;
			display: flex;
			// flex-wrap: wrap;
			// .item {
			//   margin-right: 10upx;
			//   margin-bottom: 40upx;
			//   width: 210upx;
			//   height: 70upx;
			//   border-radius: 10upx;
			//   border: 2upx solid #999999;
			//   &.active {
			//     background: #fa5151;
			//     color: #fa5151;
			//   }

			//   .m {
			//     padding-left: 6upx;
			//     width: 210upx;
			//     height: 70upx;
			//     display: flex;
			//     flex-direction: column;
			//     justify-content: center;
			//     .first {
			//       font-size: 28upx;
			//       font-weight: 400;
			//       color: #999999;
			//     }
			//     .second {
			//       // margin-top: 4upx;
			//       .row {
			//         display: flex;
			//         align-items: center;
			//         .specs {
			//           font-size: 24upx;
			//           font-weight: 400;
			//           color: #999999;
			//         }
			//         .number {
			//           font-size: 28upx;
			//           font-weight: 400;
			//           color: #999999;
			//         }
			//         .money {
			//           font-size: 24upx;
			//           font-weight: 400;
			//           color: #999999;
			//         }
			//         .unit {
			//           font-size: 24upx;
			//           font-weight: 400;
			//           color: #999999;
			//         }
			//         .qi {
			//           font-size: 24upx;
			//           font-weight: 400;
			//           color: #999999;
			//         }
			//       }
			//     }
			//   }
			// }
		}

		.start-price {
			margin-left: 30upx;
			padding-top: 16upx;
			padding-bottom: 30upx;
			color: #FC4023;
			font-size: 30upx;
			font-weight: 500;

			text {
				font-size: 60upx;
				font-weight: bold;
			}
		}
	}

	.add {
		background: #ffffff;
		// height: 104upx;
		margin-top: 10upx;
		display: flex;
		flex-direction: column;
		padding: 26upx 0upx 20upx 0upx;

		.add-list {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 0upx 20upx 0upx 36upx;

			.left {
				display: flex;

				.left-logo {
					width: 32upx;
					height: 32upx;
				}

				.left-address {
					width: 450upx;
					font-size: 28upx;
					font-weight: 500;
					color: #3D3D3D;
					padding-left: 10upx;
				}

			}

			.right {
				.jump {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.kaitong {
			text-align: right;
			padding-top: 10upx;

			.open {
				width: 200upx;
				height: 48upx;

			}

			.close {
				width: 200upx;
				height: 48upx;

			}
		}
	}

	.mid {
		display: flex;
		align-items: center;
		height: 104upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		background: #ffffff;

		.text-list {
			display: flex;
			flex: 1;
			align-items: center;
			// justify-content: space-between;
			padding: 0upx 20upx 0upx 30upx;

			.ensure {
				font-size: 28upx;
				font-weight: bold;
				color: #3d3d3d;
			}

			.poster {
				font-size: 24upx;
				color: #3d3d3d;
				flex: 1;
				padding-left: 30upx;
				display: flex;
				gap: 0upx 40upx;
			}

			.more {
				width: 32upx;
				height: 32upx;
			}
		}
	}

	.body {
		background: #ffffff;

		.top {
			.top-img {
				// width: 752upx;
				// height: 760upx;
				width: 100%;
			}
		}

		.top-list {
			padding: 30upx 80upx 0 80upx;
			display: flex;
			justify-content: space-between;

			.item {
				font-size: 32upx;
				color: #B3B2AD;
				position: relative;


				&.active {
					font-size: 32upx;
					font-weight: bold;
					color: #E95D20;

					&::after {
						width: 56upx;
					}
				}

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: -12upx;
					width: 0;
					height: 4upx;
					border-radius: 10upx;
					background-color: #E95D20;
					transition: all 350ms ease-in;
				}
			}
		}

		.explain {
			padding: 0upx 30upx 40upx 30upx;

			.explain-title {
				font-size: 28upx;
				font-weight: bold;
			}

			.explain-text {
				font-size: 28upx;
				color: #8F8D85;
				padding-top: 10upx;
			}
		}

		.background {
			position: relative;
			width: 100%;

			.bg {
				width: 100%;
				height: 850upx;
			}

			.bg-logo {
				width: 360upx;
				height: 70upx;
				position: absolute;
				top: 60upx;
				left: 44upx;
			}

			.bg-text {
				width: 100%;
				position: absolute;
				top: 174upx;
				left: 0upx;
				font-size: 64upx;
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				white-space: nowrap;
			}

			.bg-image {
				display: flex;
				// justify-content: center;
				position: absolute;
				top: 400upx;
				left: 0;
				width: 100%;

				.bg-img {
					width: 516upx;
					height: 258upx;
				}
			}


			.girl-img {
				width: 450upx;
				height: 492upx;
				position: absolute;
				top: 348upx;
				right: 0;
			}

		}

		.mid-content {
			padding-top: 40upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 144upx;
			font-size: 48upx;
			font-weight: bold;
			color: #E95D20;
			white-space: nowrap;

			.mid-text {}

			text {
				position: relative;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: -14upx;
					width: 160upx;
					height: 4upx;
					border-radius: 10upx;
					background-color: #E95D20;
					transition: all 350ms ease-in;
				}
			}
		}

		.serverContent-list {
			padding: 88upx 56upx 0upx 56upx;
			gap: 20upx 0upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.serverContent {
				width: 200upx;
				height: 140upx;
				border-radius: 20upx;
				background: #FFF6EF;
				border: 2upx solid #E95D20;
				font-size: 36upx;
				font-weight: bold;
				color: #E95D20;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.middle {
			width: 100%;
			height: 1928upx;

			.mid-img {
				width: 100%;
				height: 1928upx;
			}
		}

		.process {
			width: 100%;
			height: 480upx;

			.process-img {
				width: 100%;
				height: 480upx;
			}
		}

		.tips {
			.img-tips {
				width: 100%;
			}
		}

		.case-show {
			// padding: 40upx 0;

			.text {
				width: 100%;
				display: flex;
				justify-content: center;
				padding-top: 74upx;

				.text1 {
					font-size: 48upx;
					font-weight: bold;
					color: #3d3d3d;
				}

				.text2 {
					font-size: 48upx;
					font-weight: bold;
					color: #ea6f3a;
				}
			}

			.show-img {
				// padding: 40upx 0upx 54upx 0upx;

				.img1 {
					width: 100%;
					height: 810upx;
				}

				.img2 {
					width: 100%;
					height: 514upx;
				}

				.img3 {
					width: 100%;
					height: 344upx;
				}
			}
		}
	}

	.other {
		// margin-top: 20upx;
		background: #ffffff;
		width: 100%;
		height: 280upx;
		display: flex;
		justify-content: center;
		align-items: flex-start;

		.other-service {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 10upx;
			width: 200upx;

			.text {
				font-size: 32upx;
				color: #3d3d3d;
			}

			.show {
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.foot {
		background: #ffffff;
		padding: 30upx 30upx 30upx 30upx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		border-top: 8upx solid #f7f8fa;

		.list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 82upx;

			.online {
				width: 96upx;
				height: 82upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.seek {
					width: 48upx;
					height: 48upx;
				}

				.name {
					font-size: 24upx;
					white-space: nowrap;
				}
			}

			.order-list {
				display: flex;
				justify-content: flex-end;
				width: 75%;

				.join {
					font-size: 32upx;
					width: 270upx;
					height: 80upx;
					border-radius: 100upx;
					border: 2upx solid #999999;
					color: #999999;
					text-align: center;
					line-height: 78upx;
				}

				.order {
					font-size: 32upx;
					color: #ffffff;
					width: 220upx;
					height: 80upx;
					border-radius: 100upx;
					background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
					text-align: center;
					line-height: 78upx;
				}
			}
		}
	}
}
</style>
