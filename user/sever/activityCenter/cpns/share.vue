<template>
	<view class="share-container">
		<view
			v-for="(item, index) in shareList"
			:key="index"
			class="item"
			@click="handleClickShareItem(item.key)"
		>
			<image class="icon" :src="item.icon" mode="" />
			<view class="label">{{ item.label }}</view>
		</view>

		<BeeWxShare ref="beeWxShareRef" style="position: absolute"></BeeWxShare>
	</view>
</template>

<script>
const shareList = [
	{
		label: '微信朋友',
		icon: require('../../../../static/images/user/code/we-chat.png'),
		key: 'wechat'
	},
	{
		label: '生成活动邀请码',
		icon: require('../../../../static/images/user/code/save.png'),
		key: 'image'
	}
	// {
	//   label: '分享链接',
	//   icon: require('../../../../static/images/user/code/link.png'),
	//   key: 'link',
	// },
]

export default {
	name: 'Share',
	components: {
		// SaveImage
	},

	props: {
		code: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			shareList: Object.freeze(shareList),
			showSaveImage: false
		}
	},

	methods: {
		async handleClickShareItem(shareItem, isQuit) {
			const _this = this
			switch (shareItem) {
				case 'wechat':
					const data = {
						data: {
							title: '参与优惠活动',
							desc: '扫一扫',
							link: this.code,
							imageUrl: require('../../../../static/images/con-center/hongbao.png')
						},
						successCb: () => {},
						failCb: () => {}
					}
					_this.$refs.beeWxShareRef.share(data, isQuit)
					break

				case 'image':
					// this.showSaveImage = true
					this.$emit('click', shareItem)
					break
				case 'link':
					uni.setClipboardData({
						data: this.code,
						success: () => {
							uni.showToast({
								title: '链接复制成功',
								duration: 2000
							})
						}
					})
					break
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.share-container {
  margin: 0 auto;
  position: relative;
  width: 622upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20upx 72upx;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 32upx;
  margin-top: 20upx;

  .icon {
    width: 80upx;
    height: 80upx;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    font-size: 26upx;
    line-height: 42upx;
  }
}
</style>
