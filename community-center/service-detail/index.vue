<template>
	<view class="service-detail-container">
		<JHeader title="服务详情" width="50" height="50"></JHeader>
		<view>
			<view v-if="['1', '2', '3', '4', '5'].includes(currentType)">
				<swiper
					:current="1" previous-margin="60rpx" next-margin="60rpx" style="height: 600rpx;"
					@change="handleSwiperChange"
				>
					<swiper-item v-for="(item, index) in servicePicObj[`servicePicList${currentType}`]" :key="index">
						<view
							style="position: relative;display: flex;align-items: center;width: 100%;height: 100%;"
							:style="{ justifyContent: index === currentSwiper - 1 ? 'flex-end' : index === currentSwiper + 1 ? 'flex-start' : 'center' }"
						>
							<view style="position: relative;display: flex;height: 100%;">
								<view
									style="position: relative;transition: 1s;width: 600rpx;height: 100%;transform-style: preserve-3d;perspective: 10000px;"
									:style="{ transform: servicePicObj[`servicePicList${currentType}`][index].isAfter ? 'rotateY(0deg)' : 'rotateY(180deg)' }"
								>
									<image
										:src="common.seamingImgUrl(item.before)"
										style="position: absolute;top: 0;left: 50%;z-index: 1;width: 600rpx;height: 100%;border-radius: 20rpx;transform: rotateY(180deg) translateX(50%);"
										mode="aspectFill"
									></image>
									<image
										:src="common.seamingImgUrl(item.after)"
										style="position: absolute;top: 0;left: 50%;z-index: 1;width: 600rpx;height: 100%;border-radius: 20rpx;transform: translateX(-50%) translateZ(1px);"
										mode="aspectFill"
									></image>
								</view>
								<view
									v-if="index === currentSwiper" class="top-btn"
									style="position: absolute;left: 0;top: 476rpx;width: 100%;"
								>
									<tui-button
										type="white" width="248rpx" height="80rpx" shape="circle"
										margin="0 auto"
										@click="servicePicObj[`servicePicList${currentType}`][index].isAfter = !servicePicObj[`servicePicList${currentType}`][index].isAfter"
									>
										<view style="display: flex;align-items: center;">
											<tui-icon name="seen" :size="48" unit="rpx" color="#000000" margin="0"></tui-icon>
											<text style="margin-left: 10rpx;font-size: 30rpx;">
												{{ servicePicObj[`servicePicList${currentType}`][index].isAfter ? '查看改造前' : '查看改造后' }}
											</text>
										</view>
									</tui-button>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view style="padding: 56rpx 75rpx 0;">
			<view style="margin-bottom: 24rpx;font-size: 52rpx;font-weight: bold;text-align: center;">
				{{ transformation[currentType] || `出错了${currentType}` }}
			</view>
			<view>
				<view v-if="[ '1' ].includes(currentType)">
					<view>团蜂为您提供完整的家居设计服务，包括室内空间布局，风格搭配及收纳解决方案</view>
					<view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>全屋及卧室，客厅等单空间</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>现货家具，安全环保</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>量身定制套房空间</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>支持线上设计</text>
						</view>
					</view>
				</view>
				<view v-else-if="[ '2' ].includes(currentType)">
					<view>卫生间升级，品质生活从“新”开始！打造舒适洁净的卫浴空间，让您生活更加美好！</view>
					<view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>专业设计，贴心布局</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>高品质材料，安全耐用</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>精细施工，细节把控</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>一站式服务，全程无忧</text>
						</view>
					</view>
				</view>
				<view v-else-if="[ '3' ].includes(currentType)">
					<view>阳台焕新颜，生活更美好！让您的阳台成为家中的小天地，尽享舒适与惬意！</view>
					<view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>个性化设计，专属定制</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>专业施工，品质保障</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>多功能融合，空间利用最大化</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>贴心服务，全程无忧</text>
						</view>
					</view>
				</view>
				<view v-else-if="[ '4' ].includes(currentType)">
					<view>窗帘升级，品质生活一“帘”之隔！打造优雅舒适的家居氛围，让您的生活更加美好！</view>
					<view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>多样款式，个性选择</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>优质材料，舒适耐用</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>精准测量，完美安装</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>贴心服务，售后无忧</text>
						</view>
					</view>
				</view>
				<view v-else-if="[ '5' ].includes(currentType)">
					<view>家具翻新，旧貌换新颜！让您的家居焕发新生，重拾昔日光彩！</view>
					<view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>专业翻新，焕发新生</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>个性定制，焕然一</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>环保材料，健康无害</text>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;">
							<tui-icon :size="58" unit="rpx" bold color="#208f57" name="check" margin="0 20rpx 0 0"></tui-icon>
							<text>全程服务，省心省力</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="padding: 56rpx 25rpx 0;">
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
				v-else-if="[ '2' ].includes(currentType)"
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
				v-else-if="[ '3' ].includes(currentType)"
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
				v-else-if="[ '4' ].includes(currentType)"
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
				v-else-if="[ '5' ].includes(currentType)"
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
				<view
					style="text-align: center;"
					@click="$store.dispatch('app/getCustomerServiceAction', { isToService: true })"
				>
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
import { getServiceSortApi } from '../../api/community-center'

export default {
	name: 'ServiceDetail',
	props: {},
	data() {
		return {
			serviceSortData: [],
			transformation: {
				0: '未知',
				1: '全屋整装改造服务',
				2: '卫生间改造服务',
				3: '阳台改造服务',
				4: '窗帘升级服务',
				5: '家具翻新服务'
			},
			currentType: '',
			currentSwiper: 1,
			servicePicObj: {
				servicePicList1: [
					{
						after: '1710987064091-quanwuzhengzhuang-a.png',
						before: '1710993215462-quanwuzhengzhuang-a1.png',
						isAfter: true
					},
					{
						after: '1710987086264-quanwuzhengzhuang-b.png',
						before: '1710993236439-quanwuzhengzhuang-b1.png',
						isAfter: true
					},
					{
						after: '1710987093671-quanwuzhengzhuang-c.png',
						before: '1710993256168-quanwuzhengzhuang-c1.png',
						isAfter: true
					}
				],
				servicePicList2: [
					{
						after: '1711081869695-weishengjiangaizao-a.png',
						before: '1711007278498-weishengjiangaizao-a1.png',
						isAfter: true
					},
					{
						after: '1711007231233-weishengjiangaizao-b.png',
						before: '1711007282757-weishengjiangaizao-b1.png',
						isAfter: true
					},
					{
						after: '1711007218187-weishengjiangaizao-c.png',
						before: '1711007290574-weishengjiangaizao-c1.png',
						isAfter: true
					}
				],
				servicePicList3: [
					{
						after: '1711007363355-yangtaigaizao-a.png',
						before: '1711081894657-yangtaigaizao-a1.png',
						isAfter: true
					},
					{
						after: '1711007366667-yangtaigaizao-b.png',
						before: '1711007411677-yangtaigaizao-b1.png',
						isAfter: true
					},
					{
						after: '1711007370899-yangtaigaizao-c.png',
						before: '1711007415249-yangtaigaizao-c1.png',
						isAfter: true
					}
				],
				servicePicList4: [
					{
						after: '1711007469863-chuanglianshengji-a.png',
						before: '1711007815597-chuanglianshengji-a1.png',
						isAfter: true
					},
					{
						after: '1711007473577-chuanglianshengji-b.png',
						before: '1711007818767-chuanglianshengji-b1.png',
						isAfter: true
					},
					{
						after: '1711007477441-chuanglianshengji-c.png',
						before: '1711007822172-chuanglianshengji-c1.png',
						isAfter: true
					}
				],
				servicePicList5: [
					{
						after: '1711102872941-jiajufanxin-a.png',
						before: '1711081841620-jiajufanxin-a1.png',
						isAfter: true
					},
					{
						after: '1711007916888-jiajufanxin-b.png',
						before: '1711008056457-jiajufanxin-b1.png',
						isAfter: true
					},
					{
						after: '1711007926404-jiajufanxin-c.png',
						before: '1711008062310-jiajufanxin-c1.png',
						isAfter: true
					}
				]
			}
		}
	},
	onLoad(options) {
		this.currentType = Number(options.id) ? options.id : '0'
		uni.showLoading()
		getServiceSortApi({})
			.then((res) => {
				uni.hideLoading()
				this.serviceSortData = res.data
			})
			.catch(() => {
				uni.hideLoading()
			})
	},
	methods: {
		handleSwiperChange(e) {
			this.currentSwiper = e.detail.current
		},
		handleClickService() {
			// 全屋改造——616全包服务
			// 卫生间改造——671卫生间改造服务
			// 阳台改造——667阳台改造服务
			// 窗帘升级——412窗帘维修服务
			// 家具翻新——333皮革家具翻新
			if (this.currentType === '1') {
				this.handleToServiceItem('全包服务')
				// this.$redirectTo('/community-center/service-sort/index?value=579&name=装修服务')
			} else if (this.currentType === '2') {
				this.handleToServiceItem('卫生间改造服务')
				// this.$redirectTo('/community-center/service-sort/index?value=14&name=局部改造')
			} else if (this.currentType === '3') {
				this.handleToServiceItem('阳台改造服务')
				// this.$redirectTo('/community-center/service-sort/index?value=14&name=局部改造')
			} else if (this.currentType === '4') {
				this.handleToServiceItem('窗帘维修服务')
				// this.$redirectTo('/community-center/service-sort/index?value=289&name=窗帘衣架')
			} else if (this.currentType === '5') {
				this.handleToServiceItem('皮革家具翻新')
				// this.$redirectTo('/community-center/service-sort/index?value=2&name=家具维保')
			}
		},
		handleToServiceItem(name) {
			if (name) {
				let serviceObj = {}
				this.serviceSortData.forEach((item) => {
					if (item.children && item.children.length) {
						item.children.forEach((section) => {
							if (section.children && section.children.length) {
								section.children.forEach((serve) => {
									if (serve.serverNameThree === name) {
										serviceObj = serve
									}
								})
							}
						})
					}
				})
				if (serviceObj.id) {
					this.go(`/community-center/community-detail?id=${serviceObj.id}&serverNameThree=${serviceObj.serverNameThree}&serverImageUrl=${serviceObj.serverImageUrl}`)
				} else {
					this.$showToast(`缺少${name}服务`)
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
.service-detail-container {
	padding: 0 0 186rpx;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
	}

	.top-btn {
		/deep/ .tui-btn {
			background: rgba(255, 255, 255, 0.8) !important;
		}
	}

	.bottom-btn {
		/deep/ .tui-btn {
			background: #ef530e !important;
		}
	}
}
</style>
