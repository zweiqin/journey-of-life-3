<template>
	<view class="community-order">
		<JHeader title="新建画册" width="50" height="50"></JHeader>

		<view class="add-album-content">
			<view class="item-wrapper">
				<view class="add-album-title">画册名称</view>
				<view class="add-album-value">
					<input v-model="form.atlasName" type="text" class="common-text" placeholder="请填写画册名称" style="padding-bottom: 32rpx" />
				</view>
			</view>

			<view class="item-wrapper">
				<view class="add-album-title">画册类型</view>
				<view class="add-album-value"><input v-model="form.atlasType" type="text" class="common-text" placeholder="请填写画册类型" style="padding-bottom: 32rpx" /></view>
			</view>
		</view>

		<view class="body">
			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册封面图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in imagesFace"
							:key="img"
							style="
                position: relative;
                width: 160rpx;
                height: 160rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<view class="img2" @click="removeBackgroundFace(img)">
								<tui-icon name="close" :size="40" unit="rpx" color="#ea0000" margin="0"></tui-icon>
							</view>
						</view>
					</view>
					<view
						v-if="imagesFace.length === 0"
						class="upload"
						style="margin-right: 6rpx"
						@click="chooseImgFace"
					>
						+
					</view>
				</view>
			</view>

			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册内容图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in images"
							:key="img"
							style="
                position: relative;
                width: 160rpx;
                height: 160rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<view class="img2" @click="removeBackground(img)">
								<tui-icon name="close" :size="40" unit="rpx" color="#ea0000" margin="0"></tui-icon>
							</view>
						</view>
					</view>
					<view
						class="upload"
						style="margin-right: 6rpx"
						@click="chooseImg"
					>
						+
					</view>
				</view>
			</view>

			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册封尾图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in imagesEnd"
							:key="img"
							style="
                position: relative;
                width: 160rpx;
                height: 160rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<view class="img2" @click="removeBackgroundEnd(img)">
								<tui-icon name="close" :size="40" unit="rpx" color="#ea0000" margin="0"></tui-icon>
							</view>
						</view>
					</view>
					<view
						v-if="imagesEnd.length === 0"
						class="upload"
						style="margin-right: 6rpx"
						@click="chooseImgEnd"
					>
						+
					</view>
				</view>
			</view>

			<view class="foot">
				<view class="on" @click="handleToServiceInformation">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
import { buildUserCrmSlbumApi } from '../../api/user'
import { USER_INFO, T_STORAGE_KEY } from '../../constant'
import { ANOTHER_TF_UPLOAD } from '../../config'
export default {
	name: 'AddAlbum',
	// props: {
	// 	imgUrl: String
	// },
	data() {
		return {
			img: '',
			name: '',
			price: '',
			id: '',
			imagesFace: [],
			images: [],
			imagesEnd: [],
			length: '',
			form: {
				atlasName: '',
				atlasType: ''
			},
			userInfo: uni.getStorageSync(USER_INFO)
		}
	},
	created() {},
	onLoad(options) {
		// this.name = options.name
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		async handleToServiceInformation() {
			if (this.imagesFace.length === 0 || this.images.length === 0 || this.imagesEnd.length === 0 || !this.form.atlasName || !this.form.atlasType) {
				return uni.showToast({
					title: '请填写完整信息',
					icon: 'none',
					duration: 2000
				})
			}
			const res = await buildUserCrmSlbumApi({
				id: '',
				userId: this.userInfo.userId,
				userName: this.userInfo.nickName,
				atlasName: this.form.atlasName,
				imageUrl: `[${this.images.map((item) => `'${item}'`).join(',')}]`,
				atlasType: this.form.atlasType,
				bookFace: this.imagesFace[0],
				bookEnd: this.imagesEnd[0]
			})
			console.log(res)
			if (res.errno === 0) {
				uni.showToast({
					title: '上传成功',
					duration: 2000,
					icon: 'none'
				})
				uni.navigateBack()
			} else {
				uni.showToast({
					title: '上传失败',
					duration: 2000,
					icon: 'none'
				})
			}
		},
		chooseImgFace() {
			uni.chooseImage({
				count: 1,
				extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: ANOTHER_TF_UPLOAD,
							filePath: imgFile.path,
							name: 'file',
							header: {
								Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
							},
							formData: {
								'folderId': -1
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								this.imagesFace.push(JSON.parse(uploadFileRes.data).data.url)
							},
							fail: (error) => {
								uni.hideLoading()
							}
						})
					}
				}
			})
		},
		removeBackgroundFace(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.imagesFace.findIndex((item) => item === img)
						_this.imagesFace.splice(index, 1)
					}
				}
			})
		},
		chooseImg() {
			uni.chooseImage({
				extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: ANOTHER_TF_UPLOAD,
							filePath: imgFile.path,
							name: 'file',
							header: {
								Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
							},
							formData: {
								'folderId': -1
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								this.images.push(JSON.parse(uploadFileRes.data).data.url)
							},
							fail: (error) => {
								uni.hideLoading()
							}
						})
					}
				}
			})
		},
		removeBackground(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.images.findIndex((item) => item === img)
						_this.images.splice(index, 1)
					}
				}
			})
		},
		chooseImgEnd() {
			uni.chooseImage({
				count: 1,
				extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: ANOTHER_TF_UPLOAD,
							filePath: imgFile.path,
							name: 'file',
							header: {
								Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
							},
							formData: {
								'folderId': -1
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								this.imagesEnd.push(JSON.parse(uploadFileRes.data).data.url)
							},
							fail: (error) => {
								uni.hideLoading()
							}
						})
					}
				}
			})
		},
		removeBackgroundEnd(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.imagesEnd.findIndex((item) => item === img)
						_this.imagesEnd.splice(index, 1)
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.community-order {
  padding-bottom: 180rpx;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

  .title-list {
    padding: 40rpx 54rpx 36rpx 16rpx;
    display: flex;
    .return {
      width: 48rpx;
      height: 48rpx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36rpx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
	.add-album-content {
		// flex: 1;
		// width: 100%;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin: 36rpx 20rpx 0 20rpx;
		padding: 32rpx 32rpx 0 32rpx;

		.item-wrapper {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			// margin-top: 46rpx;
			// width: 100%;
			// height: 74rpx;
			padding-bottom: 32rpx;

			.add-album-title {
				flex: 0 0 140rpx;
				text-align: left;
				font-size: 28rpx;
				color: #141000;

				// font-weight: bold;
				// height: 100%;
				&.add-album-title-checked {
					white-space: nowrap;
					width: auto;
				}
			}

			.common-text {
				color: #141000;
				font-size: 28rpx;
				// padding-bottom: 20rpx;
			}

			.add-album-value {
				flex: 1;
				// max-width: 340rpx;
				// margin-right: 96rpx;
				width: 100%;
				// height: 100%;
				border-bottom: 1px solid #F1F1F0;

			}
		}
	}
  .body {
    padding: 36rpx 30rpx 0rpx 30rpx;
    .item-image {
      display: flex;
      align-items: center;
      padding-top: 36rpx;
      padding-bottom: 28rpx;
      .tag {
        font-weight: 600;
        color: #fa5151;
      }
      .name {
        font-size: 32rpx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }

    .upload-pane {
      border-radius: 20rpx;
      display: flex;
      flex-wrap: wrap;

      .img1 {
        width: 160rpx;
        height: 160rpx;
        border-radius: 20rpx;
      }
      .img2 {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        right: -15rpx;
        top: -15rpx;
        background: white;
        border-radius: 50%;
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
    }
    .foot {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30rpx 30rpx 30rpx 30rpx;
      width: 100%;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #ffffff;
      border-top: 8rpx solid #f7f8fa;
      .on {
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
        width: 408rpx;
        height: 80rpx;
        border-radius: 100rpx;
        background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
}
</style>
