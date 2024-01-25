<template>
	<view class="cropper-container">
		<tui-cropper :is-round="true" :image-url="cropperUrl" @cropper="handleConfirm" @ready="handleReady"></tui-cropper>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { ANOTHER_TF_UPLOAD } from '../../../config'
export default {
	name: 'Cropper',
	onLoad(params) {
		this.imgUrl = params.imgUrl
	},

	data() {
		return {
			imgUrl: '',
			cropperUrl: ''
		}
	},

	methods: {
		handleReady() {
			this.cropperUrl = this.imgUrl
		},

		handleConfirm(e) {
			uni.showLoading({
				title: '图片上传中...'
			})
			uni.uploadFile({
				url: ANOTHER_TF_UPLOAD,
				filePath: e.url,
				name: 'file',
				success: async (uploadFileRes) => {
					uni.hideLoading()
					await this.$store.dispatch('auth/updateUserInfoAction', {
						headImage: JSON.parse(uploadFileRes.data).data.url
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .tui-op__btn {
	color: #fff;
}
</style>
