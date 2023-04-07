<template>
	<view class="smart-album-container">
		<NewHeader
			title="我的画册" top="61%" position="left" background-color="#fff"
			padding="30upx 80upx 20upx 10upx"
			@back="handleBack"
		>
		</NewHeader>

		<view style="position: sticky;top: 0;z-index: 999;padding: 10px 30px;background-color: #fff;"><tui-button width="100%" height="84rpx" @click="handleCreate">新建画册</tui-button></view>

		<view class="main">
			<view v-for="(item, index) in UserCrmSlbumList" :key="index" class="" style="padding-bottom: 15upx;" @click="handleDetail(item.id)">
				<tui-card :title="{ text: item.atlasName }" :tag="{ text: item.atlasType }">
					<template #body>
						<view class="tui-default" style="display: flex;padding: 20upx 30upx;">
							<view style="padding-right: 10px;"><image style="width: 120rpx; height: 120rpx; background-color: #eeeeee;" mode="aspectFit" :src="item.bookFace"></image></view>
							<view style="flex: 1;width: 0;box-shadow:0px 0px 10px #f00;overflow-x: auto;">
								<tui-image-group :image-list="item.urls" mode="aspectFit" is-group distance="50" width="120rpx" height="120rpx" fade-show radius="10upx"></tui-image-group>
							</view>
							<view style="padding-left: 10px;"><image style="width: 120rpx; height: 120rpx; background-color: #eeeeee;" mode="aspectFit" :src="item.bookEnd"></image></view>
							<view style="display: flex;justify-content: center;align-items: center;padding-left: 10px;"><tui-button width="80rpx" height="60rpx" type="danger" shape="circle" @click="handleUserCrmSlbumDelete(item.atlasName, item.id)">删除</tui-button></view>
						</view>
					</template>
				</tui-card>
			</view>
			<LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
		</view>
	</view>
</template>

<script>
import { getUserCrmSlbumList, userCrmSlbumDeleteApi } from '../../api/user'
import { USER_ID, USER_INFO } from '../../constant'
export default {
	name: 'SmartAlbum',
	data() {
		return {
			UserCrmSlbumList: [],
			queryInfo: {
				page: 1,
				size: 6
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onLoad() {
		this.getUserCrmSlbumList()
		// const userInfo = uni.getStorageSync(USER_INFO) || {}
		// this.userLevel = userInfo.userLevel || 5
	},
	// 触底加载
	onReachBottom() {
		if (this.totalPages <= this.queryInfo.page) {
			return 'no-more'
		}
		if (this.UserCrmSlbumList.length < this.queryInfo.size) {
			return 'lack'
		}
		this.queryInfo.page++
		this.getUserCrmSlbumList(true)
	},
	methods: {
		async getUserCrmSlbumList(isLoadmore) {
			const res = await getUserCrmSlbumList(this.queryInfo)
			if (res.errno === 0) {
				this.totalPages = res.data.totalPages
				if (isLoadmore) {
					this.UserCrmSlbumList.push(...res.data.smartList.map((item) => ({
						userName: item.userName,
						atlasName: item.atlasName,
						atlasType: item.atlasType,
						bookFace: item.bookFace,
						bookEnd: item.bookEnd,
						id: item.id,
						urls: [ ...item.imageUrl.substring(1, item.imageUrl.length - 1)
							.split(',')
							.map((section) => ({ src: section.substring(1, section.length - 1) })) ]
					})))
				} else {
					this.UserCrmSlbumList = [ ...res.data.smartList.map((item) => ({
						userName: item.userName,
						atlasName: item.atlasName,
						atlasType: item.atlasType,
						bookFace: item.bookFace,
						bookEnd: item.bookEnd,
						id: item.id,
						urls: [ ...item.imageUrl.substring(1, item.imageUrl.length - 1)
							.split(',')
							.map((section) => ({ src: section.substring(1, section.length - 1) })) ]
					})) ]
				}
			}
			this.status = 'none'
			console.log(res.data.smartList, this.UserCrmSlbumList)
		},

		handleUserCrmSlbumDelete(name, id) {
			uni.showModal({
				title: '提示',
				content: `确认删除 ${name} 吗？`,
				showCancel: true,
				success: async (res) => {
					if (res.confirm) {
						const res = await userCrmSlbumDeleteApi({ slbumId: id })
						console.log(res)
						if (res.errno === 0) {
							uni.showToast({
								title: '删除成功',
								duration: 2000,
								icon: 'none'
							})
							this.queryInfo = {
								page: 1,
								size: 6
							}
							this.getUserCrmSlbumList()
						} else {
							uni.showToast({
								title: '删除失败',
								duration: 2000,
								icon: 'none'
							})
						}
					} else if (res.cancel) {
						console.log('取消')
					}
				}
			})
		},
		handleCreate() {
			uni.navigateTo({
				url: '/user/smartAlbum/add-album'
			})
		},
		handleDetail(id) {
			uni.navigateTo({
				url: `/user/smartAlbum/album-detail?id=${id}`
			})
		},

		// 点击回退
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.smart-album-container {
	width: 100%;
	min-height: 100vh;
	background-color: #f5f4f9;

	.main {
		padding-top: 20upx;
		padding-bottom: 20upx;
		border-radius: 10upx;
	}
}
</style>
