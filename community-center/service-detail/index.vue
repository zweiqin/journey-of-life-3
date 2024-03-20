<template>
	<view class="service-detail-container">
		<JHeader title="服务详情" width="50" height="50"></JHeader>
		<view></view>

		<view>
			<view style="margin-bottom: 24rpx;font-size: 52rpx;font-weight: bold;text-align: center;">
				{{ transformation[currentType] || `出错了${currentType}` }}
			</view>
			<view>
				<view v-if="[ '1' ].includes(currentType)">
					<view>团蜂为您提供完整的家居设计服务，包括室内空间布局，风格搭配及收纳解决方案</view>
					<view></view>
				</view>
			</view>
		</view>

		<view style="padding: 0 25rpx;">
			<view style="margin-bottom: 24rpx;font-size: 52rpx;font-weight: bold;text-align: center;">设计案例</view>
			<view
				v-if="[ '1' ].includes(currentType)"
				style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;margin: 0 -25rpx;"
			>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710933715433-quanwuzhengzhuang-1.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710933756621-quanwuzhengzhuang-2.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710933782847-quanwuzhengzhuang-3.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710933798048-quanwuzhengzhuang-4.png')" mode="aspectFit"
					/>
				</view>
			</view>
			<view
				v-if="[ '2' ].includes(currentType)"
				style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;margin: 0 -25rpx;"
			>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934471274-weishengjiangaizao-1.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934306381-weishengjiangaizao-2.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934316386-weishengjiangaizao-3.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934320351-weishengjiangaizao-4.png')" mode="aspectFit"
					/>
				</view>
			</view>
			<view
				v-if="[ '3' ].includes(currentType)"
				style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;margin: 0 -25rpx;"
			>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934504322-yangtaigaizao-1.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934507186-yangtaigaizao-2.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934509855-yangtaigaizao-3.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934513304-yangtaigaizao-4.png')"
						mode="aspectFit"
					/>
				</view>
			</view>
			<view
				v-if="[ '4' ].includes(currentType)"
				style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;margin: 0 -25rpx;"
			>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934577895-chuanglianshengji-1.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934580554-chuanglianshengji-2.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934582725-chuanglianshengji-3.png')" mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;"
						:src="common.seamingImgUrl('1710934585561-chuanglianshengji-4.png')" mode="aspectFit"
					/>
				</view>
			</view>
			<view
				v-if="[ '5' ].includes(currentType)"
				style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;margin: 0 -25rpx;"
			>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934635796-jiajufanxin-1.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934638970-jiajufanxin-2.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934641902-jiajufanxin-3.png')"
						mode="aspectFit"
					/>
				</view>
				<view style="margin: 0 25rpx 40rpx;">
					<image
						style="width: 296rpx;height: 248rpx;" :src="common.seamingImgUrl('1710934644732-jiajufanxin-4.png')"
						mode="aspectFit"
					/>
				</view>
			</view>
		</view>

		<view
			style="position: fixed;bottom: 0;z-index: 9;width: 100%;padding: 42rpx 30rpx 40rpx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view style="display: flex;align-items: center;justify-content: space-around;">
				<view style="text-align: center;">
					<view style="padding: 8rpx;background-color: #ffffff;line-height: 1;border-radius: 50%;">
						<tui-icon name="kefu" :size="46" unit="rpx" color="#2C2C2C" margin="0"></tui-icon>
					</view>
					<view style="margin-top: 2rpx;font-size: 28rpx;color: #222229;">
						客服
					</view>
				</view>
				<view class="bottom-btn">
					<tui-button type="warning" width="560rpx" height="88rpx" shape="circle" @click="handleClickService">
						在线预约并获得报价
					</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ServiceDetail',
	props: {},
	data() {
		return {
			transformation: {
				0: '未知',
				1: '全屋整装改造服务',
				2: '卫生间改造服务',
				3: '阳台改造服务',
				4: '窗帘升级服务',
				5: '家具翻新服务'
			},
			currentType: ''
		}
	},
	onLoad(options) {
		this.currentType = Number(options.id) ? options.id : '0'
	},
	methods: {
		handleClickService() {
			if (this.currentType === '1') {
				this.$redirectTo('/community-center/service-sort/index?value=579&name=装修服务')
			} else if (this.currentType === '2') {
				this.$redirectTo('/community-center/service-sort/index?value=14&name=局部改造')
			} else if (this.currentType === '3') {
				this.$redirectTo('/community-center/service-sort/index?value=14&name=局部改造')
			} else if (this.currentType === '4') {
				this.$redirectTo('/community-center/service-sort/index?value=289&name=窗帘衣架')
			} else if (this.currentType === '5') {
				this.$redirectTo('/community-center/service-sort/index?value=2&name=家具维保')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.service-detail-container {
	height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
	}

	.bottom-btn {
		/deep/ .tui-btn {
			background: #ef530e !important;
		}
	}
}
</style>
