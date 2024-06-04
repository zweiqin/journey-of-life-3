<template>
	<view>
		<view v-if="title" class="title">{{ title }}</view>
		<view class="upload-pane">
			<view class="left">
				<view v-if="!imgUrl" class="upload" @click="handleUploadImg">+</view>
				<image v-else-if="imgUrl" class="iamge-background" :src="imgUrl" mode="" />
			</view>
			<tui-icon v-show="imgUrl" name="delete" color="#767676" :size="18" @click="removeBackground"></tui-icon>
		</view>

		<!-- transform: translateY(50%); -->
		<view style="">
			<!-- , transform: 'translateY(-50%)' -->
			<tui-popup
				:duration="500"
				:mode-class="[ 'fade-in' ]"
				:styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
				:show="showAuthPopupVisible"
				@click="showAuthPopupVisible = false"
			>
				<view style="display: flex; align-items: center; padding: 26rpx; background-color: #ffffff; border-radius: 20rpx">
					<tui-icon name="pic-fill" :size="60" unit="rpx" color="#e95d20" margin="0 20rpx 0 0"></tui-icon>
					<view style="flex: 1">
						<view>相机权限和相册权限使用说明：</view>
						<view style="margin-top: 12rpx">"{{ APPLY_NAME }}"想访问您的相机和相册，将根据你的上传的图片，用于{{ purposeText || '设置头像、修改头像' }}等场景</view>
					</view>
				</view>
			</tui-popup>
		</view>
	</view>
</template>

<script>
import { APPLY_NAME, ANOTHER_TF_UPLOAD } from '../../config'
import { T_STORAGE_KEY } from '../../constant'

export default {
	name: 'ATFUpload',
	props: {
		imgUrl: String,
		title: String,
		purposeText: String
	},
	data() {
		return {
			APPLY_NAME,
			showAuthPopupVisible: false
		}
	},
	methods: {
		removeBackground() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						_this.$emit('delete')
					}
				}
			})
		},

		handleUploadImg() {
			// #ifdef APP
			const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			if (appAuthorizeSetting.albumAuthorized !== 'authorized') {
				this.showAuthPopupVisible = true
				this.handleChooseImage()
			} else {
				this.handleChooseImage()
			}
			// #endif
			// #ifndef APP
			this.handleChooseImage()
			// #endif
		},

		handleChooseImage() {
			uni.chooseImage({
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: ANOTHER_TF_UPLOAD,
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						header: {
							Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
						},
						formData: {
							'folderId': -1
						},
						success: (uploadFileRes) => {
							this.$emit('upload', JSON.parse(uploadFileRes.data).data.url)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.title {
  color: #3d3d3d;
  font-size: 24rpx;
  margin: 48rpx 0 20rpx 0;
}

.upload-pane {
  border: 1rpx solid #d8d8d8;
  padding: 32rpx 24rpx;
  box-sizing: border-box;
  border-radius: 20rpx;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .delete-icon {
    width: 32rpx;
    height: 36rpx;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .upload {
    margin: 0;
    width: 160rpx;
    height: 160rpx;
    background-color: #ececec;
    border-radius: 20rpx;
    color: #767676;
    text-align: center;
    line-height: 160rpx;
    font-size: 60rpx;
  }

  .iamge-background {
    width: 160rpx;
    height: 160rpx;
    object-fit: cover;
  }
}
</style>
